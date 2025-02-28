"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

type DashboardProviderProps = {
  children: React.ReactNode;
  session?: Session | null;
};
export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
};
