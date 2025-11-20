import React from "react";
import { env } from "~/env";

export function useInitServiceWorker() {
  React.useEffect(() => {
    const canUseServiceWorker =
      typeof window !== "undefined" && "serviceWorker" in navigator;

    if (!canUseServiceWorker) return;
    if (process.env.NODE_ENV !== "production") return;

    const apiUrl = env.NEXT_PUBLIC_API_URL;
    const appUrl = env.NEXT_PUBLIC_APP_URL;

    if (!apiUrl || !appUrl) return;

    const params = new URLSearchParams({
      API_URL: apiUrl,
      APP_URL: appUrl,
    });

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          `/service-worker.js?${params.toString()}`,
        );

        registration.onupdatefound = () => {
          const installing = registration.installing;
          if (!installing) return;

          installing.addEventListener("statechange", () => {
            if (installing.state === "installed" && navigator.serviceWorker.controller) {
              installing.postMessage({ type: "SKIP_WAITING" });
            }
          });
        };

        console.log("Service Worker registered with scope:", registration.scope);
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    };

    void registerServiceWorker();
  }, []);
}
