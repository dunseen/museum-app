import * as React from "react";

import { DashboardSidebar } from "./components/sidebar";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "UFRA - SIGHERB",
  description: "Acesse o sistema de gerenciamento do herbário virtual da UFRA.",
};

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
