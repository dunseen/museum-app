import getCachedQueryClient from "~/lib/react-query";
import HerbariumHero from "./components/herbarium-hero";
import PlantGrid from "./components/plant-grid";
import PlantSearch from "./components/plant-search";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPostQueryConfig } from "./api";

export default async function Page() {
  const client = getCachedQueryClient();
  await client.prefetchInfiniteQuery(getPostQueryConfig());

  const dehydratedState = dehydrate(client);

  return (
    <main className="min-h-screen bg-gray-50">
      <HerbariumHero />
      <div className="container mx-auto px-4 py-8">
        <PlantSearch />
        <HydrationBoundary state={dehydratedState}>
          <PlantGrid />
        </HydrationBoundary>
      </div>
    </main>
  );
}
