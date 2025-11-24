"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { type PropsWithChildren } from "react";
import { Toaster } from "~/components/ui/sonner";
import { useInitServiceWorker } from "~/hooks/use-init-service-worker";
import { queryClient } from "~/lib/react-query";
import { IosInstallPrompt } from "~/components/ios-install-prompt";
import dynamic from "next/dynamic";
const FrontendObservability = dynamic(
  () => import("~/lib/observability").then((mod) => mod.FrontendObservability),
  { ssr: false },
);

export default function Providers({ children }: Readonly<PropsWithChildren>) {
  useInitServiceWorker();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <IosInstallPrompt />
      <FrontendObservability />
      <Toaster position="top-right" richColors theme="light" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
