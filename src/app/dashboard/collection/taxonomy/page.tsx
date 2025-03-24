import getCachedQueryClient from "~/lib/react-query";
import Taxons from "./components/taxons";
import { getTaxonsConfig } from "./api";

export default async function Page() {
  const client = getCachedQueryClient();
  await client.prefetchQuery(getTaxonsConfig({ limit: 10 }));
  return <Taxons />;
}
