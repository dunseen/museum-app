import getCachedQueryClient from "~/lib/react-query";
import Characteristics from "./components/characteristics";
import { getCharacteristicsConfig } from "./api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
export const dynamic = "force-dynamic";
export default async function Page() {
  const client = getCachedQueryClient();
  await client.prefetchQuery(getCharacteristicsConfig({ limit: 100 }));

  const dehydratedState = dehydrate(client);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Characteristics />
    </HydrationBoundary>
  );
}
