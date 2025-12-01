import { auth } from '~/server/auth';
import { Users } from './components/users';
import { defineAbilityFor } from '~/lib/casl';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  const ability = defineAbilityFor(session?.user);

  if (ability.cannot('manage', 'User')) {
    redirect('/dashboard');
  }

  return <Users />;
}
