import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import Providers from "./providers";

import "~/styles/globals.css";
import { type PropsWithChildren } from "react";
import { env } from "~/env";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: "Herbário Virtual FC | UFRA",
    template: "%s | Herbário Virtual FC",
  },
  description:
    "Explore o acervo científico do Herbário Virtual FC da Universidade Federal Rural da Amazônia.",
  keywords: [
    "herbário virtual",
    "UFRA",
    "coleção botânica",
    "pesquisa científica",
    "educação ambiental",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Herbário Virtual FC",
    title: "Herbário Virtual FC | UFRA",
    description:
      "Explore o acervo científico do Herbário Virtual FC da Universidade Federal Rural da Amazônia.",
    url: new URL("/museu/herbario", env.NEXT_PUBLIC_APP_URL),
  },
  twitter: {
    card: "summary_large_image",
    title: "Herbário Virtual FC | UFRA",
    description:
      "Explore o acervo científico do Herbário Virtual FC da Universidade Federal Rural da Amazônia.",
  },
  alternates: {
    canonical: "/museu/herbario",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${openSans.className} h-full`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
