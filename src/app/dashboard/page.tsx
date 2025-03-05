import { SummaryChart } from "./components/";
import { ActivitiesContainer } from "./home/components/activities-container";
import { getHomeSummary } from "./home/api";
import getCachedQueryClient from "~/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SummaryCountList } from "./home/components/summary-count-list";
import { getPostQueryConfig } from "../museu/herbario/api";
import { GET_LAST_POSTS_QUERY_KEY } from "./home/api/useGetLastPosts";

export default async function Page() {
  const client = getCachedQueryClient();

  await Promise.all([
    client.prefetchQuery(getHomeSummary()),
    client.prefetchInfiniteQuery(
      getPostQueryConfig({ limit: 10 }, GET_LAST_POSTS_QUERY_KEY),
    ),
  ]);

  const dehydratedState = dehydrate(client);

  return (
    <HydrationBoundary state={dehydratedState}>
      <>
        <SummaryCountList />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <SummaryChart />

          <ActivitiesContainer />
        </div>
      </>
    </HydrationBoundary>
  );
}
