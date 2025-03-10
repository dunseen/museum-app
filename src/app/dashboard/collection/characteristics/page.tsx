import getCachedQueryClient from "~/lib/react-query";
import Characteristics from "./components/characteristics";
import { getCharacteristicsConfig } from "./api";

export default async function Page() {
  const client = getCachedQueryClient();
  await client.prefetchInfiniteQuery(getCharacteristicsConfig({ limit: 10 }));

  return <Characteristics />;
}
