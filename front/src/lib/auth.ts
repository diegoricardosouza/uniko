/* eslint-disable @typescript-eslint/no-explicit-any */
import { localStoragekeys } from "@/config/localStorageKeys";
import type { AuthToken, AuthUser } from "@/types/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            return null;
          }

          const data = await res.json();
          
          // Salva o token no localStorage para compatibilidade
          if (typeof window !== 'undefined') {
            localStorage.setItem(localStoragekeys.TOKEN, data.accessToken);
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            active: data.user.active,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedToken = token as AuthToken;
        const typedUser = user as AuthUser;

        typedToken.accessToken = typedUser.accessToken;
        typedToken.role = typedUser.role;
        typedToken.active = typedUser.active;
      }
      return token;
    },
    async session({ session, token }) {
      const typedToken = token as AuthToken;
      const typedSession = session as any;
      
      if (typedToken.accessToken) {
        typedSession.accessToken = typedToken.accessToken;
      }
      if (typedToken.sub) {
        typedSession.user.id = typedToken.sub;
      }
      if (typedToken.role) {
        typedSession.user.role = typedToken.role;
      }
      if (typeof typedToken.active === 'boolean') {
        typedSession.user.active = typedToken.active;
      }

      return typedSession;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});