import type React from "react";
import Header from "../museu/herbario/components/header";
import Footer from "../museu/herbario/components/footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
