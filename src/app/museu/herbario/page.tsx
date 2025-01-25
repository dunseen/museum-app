import getCachedQueryClient from "~/lib/react-query";
import HerbariumHero from "./components/herbarium-hero";
import PlantGrid from "./components/plant-grid";
import PlantSearch from "./components/plant-search";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  // const response = await getPosts();
  const client = getCachedQueryClient();
  // await client.prefetchInfiniteQuery({
  //   queryKey: [GET_POST_QUERY_KEY],
  //   queryFn: getPosts,
  // })

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
