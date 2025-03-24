import getCachedQueryClient from "~/lib/react-query";
import Species from "./components/species";
import { getSpeciesConfig } from "./api";

export default async function Page() {
  const client = getCachedQueryClient();
  await client.prefetchQuery(getSpeciesConfig({ limit: 10 }));

  return <Species />;
}
