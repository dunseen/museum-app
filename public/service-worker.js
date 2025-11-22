/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-argument */

const CACHE_VERSION = "v2";
const STATIC_CACHE_NAME = `museum-static-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `museum-runtime-${CACHE_VERSION}`;
const API_CACHE_NAME = `museum-api-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline.html";
const FALLBACK_IMAGE = "/default-fallback-image.png";

const registrationUrl = new URL(self.location.href);
const apiUrl = registrationUrl.searchParams.get("API_URL");
const appUrl = registrationUrl.searchParams.get("APP_URL");

const apiOrigin = apiUrl ? new URL(apiUrl).origin : null;
const appOrigin = appUrl ? new URL(appUrl).origin : self.location.origin;

const PRECACHE_ASSETS = [
  "/",
  "/museu/herbario",
  OFFLINE_URL,
  "/favicon.ico",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/museu_herbario.png",
  FALLBACK_IMAGE,
];

function isHtmlNavigation(request) {
  return (
    request.mode === "navigate" ||
    (request.headers.get("accept") ?? "").includes("text/html")
  );
}

function isStaticAsset(url) {
  const STATIC_EXTENSIONS = [".js", ".css", ".woff2", ".woff", ".ttf", ".otf"];
  return STATIC_EXTENSIONS.some((extension) =>
    url.pathname.endsWith(extension),
  );
}

function isImageAsset(url) {
  const IMAGE_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".webp",
    ".avif",
  ];
  return IMAGE_EXTENSIONS.some((extension) => url.pathname.endsWith(extension));
}

async function cacheCoreAssets() {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(PRECACHE_ASSETS);
}

async function clearOldCaches() {
  const validCaches = [STATIC_CACHE_NAME, RUNTIME_CACHE_NAME, API_CACHE_NAME];
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames
      .filter((name) => !validCaches.includes(name))
      .map((name) => caches.delete(name)),
  );
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("museum-app-db", 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("offline-requests", { keyPath: "url" });
    };
  });
}

async function addDataToIDB(url, jsonData) {
  const db = await openDatabase();
  const transaction = db.transaction("offline-requests", "readwrite");
  const store = transaction.objectStore("offline-requests");

  const data = {
    url,
    response: JSON.stringify(jsonData),
  };

  const request = store.put(data);

  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function getDataFromIDB(url) {
  try {
    const db = await openDatabase();
    const transaction = db.transaction("offline-requests", "readonly");
    const store = transaction.objectStore("offline-requests");

    const request = store.get(url);

    const result = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (result?.response) {
      return JSON.parse(result.response);
    }

    return null;
  } catch (error) {
    console.error("Error retrieving from IndexDB", error);
    return null;
  }
}

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(RUNTIME_CACHE_NAME);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.error("Navigation network-first failed", error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    const offlineFallback = await caches.match(OFFLINE_URL);
    return offlineFallback ?? new Response("Offline", { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE_NAME);
  const cachedResponse = await cache.match(request);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse?.ok) {
      await cache.put(request, networkResponse.clone());
      return cachedResponse ?? networkResponse;
    }
  } catch (error) {
    console.error("SWR fetch failed", error);
    return undefined;
  }

  return cachedResponse ?? networkPromise ?? caches.match(OFFLINE_URL);
}

async function cacheFirstImage(request) {
  const cache = await caches.open(RUNTIME_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const response = await fetch(request);
    if (response?.ok) {
      await cache.put(request, response.clone());
      return response;
    }
  } catch (error) {
    console.error("Image cache-first failed", error);
  }

  const fallback = await caches.match(FALLBACK_IMAGE);
  return fallback ?? new Response(null, { status: 404 });
}

async function networkFirstApi(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse?.ok) {
      const clonedResponse = networkResponse.clone();
      const responseData = await clonedResponse.json();
      await addDataToIDB(request.url, responseData);
      const cache = await caches.open(API_CACHE_NAME);
      await cache.put(request, networkResponse.clone());
      return networkResponse;
    }

    throw new Error("API network response was not ok");
  } catch (error) {
    console.error("Network first API strategy failed:", error);

    const cachedDbResponse = await getDataFromIDB(request.url);
    if (cachedDbResponse) {
      return new Response(JSON.stringify(cachedDbResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    return new Response("[]", { status: 200 });
  }
}

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (apiOrigin && requestUrl.origin === apiOrigin) {
    event.respondWith(networkFirstApi(request));
    return;
  }

  if (isHtmlNavigation(request)) {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (isStaticAsset(requestUrl)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (isImageAsset(requestUrl)) {
    event.respondWith(cacheFirstImage(request));
    return;
  }

  if (requestUrl.origin === appOrigin) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
});
