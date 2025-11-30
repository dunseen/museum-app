"use client";

import {
  faro,
  getWebInstrumentations,
  initializeFaro,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
import { env } from "~/config/env.client";

export function FrontendObservability() {
  if (faro.api || env.NEXT_PUBLIC_ENV !== "production") {
    return null;
  }

  if (!env.NEXT_PUBLIC_FARO_COLLECTOR_URL) {
    console.warn(
      "Faro collector URL not configured, skipping observability initialization",
    );
    return null;
  }

  try {
    initializeFaro({
      url: env.NEXT_PUBLIC_FARO_COLLECTOR_URL,
      app: {
        name: "museum-app",
        version: "1.0.0",
        environment: "production",
      },
      instrumentations: [
        // Mandatory, omits default instrumentations otherwise.
        ...getWebInstrumentations(),

        // Tracing package to get end-to-end visibility for HTTP requests.
        new TracingInstrumentation(),
      ],
    });
  } catch (error) {
    console.warn("Error initializing Faro:", error);
    return null;
  }

  return null;
}
