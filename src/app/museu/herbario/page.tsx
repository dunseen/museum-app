import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

import HerbariumHero from "./components/herbarium-hero";
import getCachedQueryClient from "~/lib/react-query";
import { getCharacteristicFilters, getPostQueryConfig } from "./api";
import { PostProvider } from "./context/post-context";
import { getHierarchiesConfig } from "~/app/dashboard/collection/taxonomy/api";
import { env } from "~/env";
import PlantSearch from "./components/plant-search";
import PlantGrid from "./components/plant-grid";
import { LdJsonScript } from "~/components/scripts/ld-json.script";
import { plantGridLdJson } from "./metadata/plat-grid.metadata";
import { BotanicalLayout } from "~/components/layouts";

export const metadata: Metadata = {
  title: "Herbário Virtual FC",
  description:
    "Descubra espécies botânicas catalogadas pelo Herbário Virtual FC da UFRA e mergulhe em informações científicas para pesquisa e educação.",
  alternates: {
    canonical: "/museu/herbario",
  },
  openGraph: {
    type: "website",
    url: new URL("/museu/herbario", env.NEXT_PUBLIC_APP_URL),
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

export const dynamic = "force-dynamic";

export default async function Page() {
  const client = getCachedQueryClient();
  await Promise.all([
    client.prefetchInfiniteQuery(getPostQueryConfig()),
    client.prefetchQuery(getHierarchiesConfig()),
    client.prefetchQuery(getCharacteristicFilters()),
  ]);

  const dehydratedState = dehydrate(client);

  return (
    <BotanicalLayout>
      <main>
        <LdJsonScript data={plantGridLdJson} />
        <HerbariumHero />
        <div className="px-2 py-8 md:px-4">
          <HydrationBoundary state={dehydratedState}>
            <PostProvider>
              <PlantSearch />
              <PlantGrid />
            </PostProvider>
          </HydrationBoundary>
        </div>
      </main>
    </BotanicalLayout>
  );
}
