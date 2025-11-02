import React from "react";
import { env } from "~/env";

export function useInitServiceWorker() {
  React.useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(
          `/service-worker.js?API_URL=${env.NEXT_PUBLIC_API_URL}&APP_URL=${env.NEXT_PUBLIC_APP_URL}`,
        )
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope,
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
}
