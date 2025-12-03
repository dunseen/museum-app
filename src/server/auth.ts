import {
  type User as DefaultUser,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth';
import { type DefaultJWT } from 'next-auth/jwt';
import { type Status } from '~/interfaces/auth-user.interface';

import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { AuthService } from '~/services/auth.service';
import { RoleEnum } from '~/types';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: User;
  }

  interface User {
    id: string;
    email?: string | null;
    firstName: string;
    lastName: string;
    phone: string | null;
    role: RoleEnum;
    status: Status;
    token: string;
    refreshToken: string;
    tokenExpires: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, DefaultUser {
    token: string;
    id?: string;
    emailVerified?: Date;
    refreshToken: string;
    tokenExpires: number;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/app/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string(), password: z.string() })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        try {
          const { user, token, refreshToken, tokenExpires } =
            await AuthService.login(parsedCredentials.data);

          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: RoleEnum[user.role.name as keyof typeof RoleEnum],
            status: user.status,
            token: token,
            refreshToken: refreshToken,
            tokenExpires: tokenExpires,
          };
        } catch (error) {
          console.error('Error logging in:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.role = user.role;
        token.status = user.status;
        token.token = user.token;
        token.refreshToken = user.refreshToken;
        token.tokenExpires = user.tokenExpires;
      }

      if (trigger === 'update') {
        token.token = session?.token;
        token.refreshToken = session?.refreshToken;
        token.tokenExpires = session?.tokenExpires;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.id = String(token.id);
      session.user.email = String(token.email);
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.phone = token.phone;
      session.user.role = token.role;
      session.user.status = token.status;
      session.user.token = token.token;
      session.user.refreshToken = token.refreshToken;
      session.user.tokenExpires = token.tokenExpires;

      return session;
    },
  },
};

export async function auth() {
  return getServerSession(authOptions);
}
