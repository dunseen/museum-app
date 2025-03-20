import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import Providers from "./providers";

import "~/styles/globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UFRA - Herbário Virtual",
  description:
    "Explore a coleção de plantas da Universidade Federal Rural da Amazônia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
