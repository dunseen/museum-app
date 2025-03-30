import getCachedQueryClient from "~/lib/react-query";
import Taxons from "./components/taxons";
import { getTaxonsConfig } from "./api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const client = getCachedQueryClient();
  await client.prefetchQuery(getTaxonsConfig({ limit: 10 }));

  const dehydratedState = dehydrate(client);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Taxons />
    </HydrationBoundary>
  );
}
