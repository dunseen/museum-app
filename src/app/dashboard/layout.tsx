import * as React from "react";

import { DashboardSidebar } from "./components/sidebar";
import { type Metadata } from "next";
import { DashboardProvider } from "./providers/dashboard-provider";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
  title: "UFRA - SIGHERB",
  description: "Acesse o sistema de gerenciamento do herbário virtual da UFRA.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <DashboardProvider session={session}>
      <DashboardSidebar>{children}</DashboardSidebar>;
    </DashboardProvider>
  );
}
