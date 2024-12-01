import * as React from "react";

import { DashboardSidebar } from "./components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DashboardSidebar>{children}</DashboardSidebar>
      </body>
    </html>
  );
}
