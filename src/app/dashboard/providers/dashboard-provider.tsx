/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
'use client';

import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { AbilityProvider } from '../context/ability-context';
import { defineAbilityFor } from '~/lib/casl';

type DashboardProviderProps = {
  children: React.ReactNode;
  session?: Session | null;
};
export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <AbilityProvider ability={defineAbilityFor(session?.user)}>
        {children}
      </AbilityProvider>
    </SessionProvider>
  );
};
