import dynamic from "next/dynamic";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

import HerbariumHero from "./components/herbarium-hero";
import getCachedQueryClient from "~/lib/react-query";
import { getCharacteristicFilters, getPostQueryConfig } from "./api";
import { PostProvider } from "./context/post-context";
import { getHierarchiesConfig } from "~/app/dashboard/collection/taxonomy/api";
import { env } from "~/env";

export const revalidate = 60 * 60; // Revalidate every hour to keep the catalogue fresh.

export const metadata: Metadata = {
  title: "Herbário Virtual FC",
  description:
    "Descubra espécies botânicas catalogadas pelo Herbário Virtual FC da UFRA e mergulhe em informações científicas para pesquisa e educação.",
  alternates: {
    canonical: "/museu/herbario",
  },
  openGraph: {
    type: "website",
    url: new URL("/museu/herbario", env.NEXT_PUBLIC_APP_URL).toString(),
    title: "Herbário Virtual FC",
    description:
      "Descubra espécies botânicas catalogadas pelo Herbário Virtual FC da UFRA e mergulhe em informações científicas para pesquisa e educação.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Herbário Virtual FC",
    description:
      "Explore o acervo botânico da UFRA e encontre espécies catalogadas pelo Herbário Virtual FC.",
  },
};

const PlantSearch = dynamic(() => import("./components/plant-search"), {
  loading: () => <div />,
});

const PlantGrid = dynamic(() => import("./components/plant-grid"), {
  loading: () => <div />,
});

export default async function Page() {
  const client = getCachedQueryClient();
  await Promise.all([
    client.prefetchInfiniteQuery(getPostQueryConfig()),
    client.prefetchQuery(getHierarchiesConfig()),
    client.prefetchQuery(getCharacteristicFilters()),
  ]);

  const dehydratedState = dehydrate(client);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Herbário Virtual FC",
    url: new URL("/museu/herbario", env.NEXT_PUBLIC_APP_URL).toString(),
    description:
      "Portal científico do Herbário Virtual FC com foco em pesquisa, educação e divulgação botânica.",
    potentialAction: {
      "@type": "SearchAction",
      target: (() => {
        const url = new URL("/museu/herbario", env.NEXT_PUBLIC_APP_URL);
        url.searchParams.set("termo", "{search_term_string}");
        return url.toString();
      })(),
      "query-input": "required name=search_term_string",
    },
  } as const;

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HerbariumHero />
      <div className="container mx-auto px-4 py-8">
        <HydrationBoundary state={dehydratedState}>
          <PostProvider>
            <PlantSearch />
            <PlantGrid />
          </PostProvider>
        </HydrationBoundary>
      </div>
    </main>
  );
}
