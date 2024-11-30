import * as React from "react";

import { DashboardSidebar } from "./components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardSidebar>{children}</DashboardSidebar>;
}
