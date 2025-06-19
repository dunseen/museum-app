"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { type PropsWithChildren } from "react";
import { Toaster } from "~/components/ui/sonner";
import { queryClient } from "~/lib/react-query";

export default function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors theme="light" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
