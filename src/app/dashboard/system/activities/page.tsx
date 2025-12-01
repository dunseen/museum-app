import { auth } from '~/server/auth';
import System from './components/system';
import { defineAbilityFor } from '~/lib/casl';
import { redirect } from 'next/navigation';
import getCachedQueryClient from '~/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getChangeRequestsConfig } from '../api';

export default async function Page() {
  const session = await auth();

  const ability = defineAbilityFor(session?.user);

  if (ability.cannot('manage', 'System')) {
    redirect('/dashboard');
  }

  const client = getCachedQueryClient();
  await client.prefetchQuery(getChangeRequestsConfig({ limit: 100 }));

  const dehydratedState = dehydrate(client);

  return (
    <HydrationBoundary state={dehydratedState}>
      <System />
    </HydrationBoundary>
  );
}
