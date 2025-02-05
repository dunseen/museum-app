import { PostDetails } from "./components/post-details";
import getCachedQueryClient from "~/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPostDetailsQueryConfig } from "../../api";

export default async function PlantPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const name = (await params).name;
  const client = getCachedQueryClient();
  await client.prefetchQuery(getPostDetailsQueryConfig(name));

  const dehydratedState = dehydrate(client);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostDetails name={name} />
    </HydrationBoundary>
  );
}
