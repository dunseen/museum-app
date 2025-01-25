"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React, { type PropsWithChildren } from "react";
import { queryClient } from "~/lib/react-query";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
