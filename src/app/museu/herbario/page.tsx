import getCachedQueryClient from "~/lib/react-query";
import HerbariumHero from "./components/herbarium-hero";
import PlantGrid from "./components/plant-grid";
import PlantSearch from "./components/plant-search";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getCharacteristicFilters, getPostQueryConfig } from "./api";
import { PostProvider } from "./context/post-context";
import { getHierarchiesConfig } from "~/app/dashboard/collection/taxonomy/api";

export default async function Page() {
  const client = getCachedQueryClient();
  await Promise.all([
    client.prefetchInfiniteQuery(getPostQueryConfig()),
    client.prefetchQuery(getHierarchiesConfig()),
    client.prefetchQuery(getCharacteristicFilters()),
  ]);

  const dehydratedState = dehydrate(client);

  return (
    <main className="min-h-screen bg-gray-50">
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
