import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { axiosExternal } from '@/libs/configs/axios';
import type { UserModel } from '@/libs/types/auth/user';

function modifyAuthResponse(input: any): UserModel {
  const transformedInput: UserModel = {
    ...input,
    type: input?.type?.value ?? 'admin',
  };
  return transformedInput;
}

export const nextAuthOptions: Omit<NextAuthOptions, 'providers'> = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/',
    newUser: '/',
    error: '/',
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        token = { ...token, ...user };
      }
      if (trigger === 'update') {
        token = { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user = { ...session.user, ...token };
      }
      return session;
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        type: 'credentials',
        credentials: {
          email: { type: 'email' },
          password: { type: 'password' },
          userType: { type: 'text' },
        },
        async authorize(credentials) {
          try {
            const response = await axiosExternal({ req, res }).post('signin', {
              email: credentials?.email,
              password: credentials?.password,
            });

            const { token } = response.data.user;
            res.setHeader('set-cookie', [
              `access_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
            ]);

            const user = modifyAuthResponse(response.data.user);
            return user;
          } catch (error: any) {
            const message = error?.response?.data?.message;
            if (message) {
              throw new Error(message);
            }
            return null;
          }
        },
      }),
    ],
    ...nextAuthOptions,
  });
}
