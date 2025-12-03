import { LoginWrapper } from './components/login-wrapper';
import { auth } from '~/server/auth';

export default async function Page() {
  const session = await auth();

  return <LoginWrapper session={session} />;
}
