import Header from "./components/header";
import Footer from "./components/footer";
import { type PropsWithChildren } from "react";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
