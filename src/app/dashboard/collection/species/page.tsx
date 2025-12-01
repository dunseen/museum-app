import getCachedQueryClient from '~/lib/react-query';
import Species from './components/species';
import { getSpeciesConfig } from './api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const client = getCachedQueryClient();
  await client.prefetchQuery(getSpeciesConfig({ limit: 100 }));
  const dehydratedState = dehydrate(client);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Species />
    </HydrationBoundary>
  );
}
