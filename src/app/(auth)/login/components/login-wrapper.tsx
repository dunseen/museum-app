'use client';

import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { LoginForm } from './login-form';

type LoginWrapperProps = {
  session?: Session | null;
};

export function LoginWrapper({ session }: Readonly<LoginWrapperProps>) {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={false}
      basePath="/app/api/auth"
    >
      <LoginForm />
    </SessionProvider>
  );
}
