import Header from "./components/header";
import Footer from "./components/footer";
import { type PropsWithChildren } from "react";

export const revalidate = 3600;

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex min-h-full flex-col">
      <Header showNavMenu />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
