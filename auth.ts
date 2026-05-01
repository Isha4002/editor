import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { getUserById } from "@/modules/auth/actions"; // path adjust if needed

export const { handlers, signIn, signOut, auth } = NextAuth({
  
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account) return false;

      // 🔍 existing user
      const existingUser = await db.user.findUnique({
        where: { email: user.email! },
      });

      // ❌ create user + account
      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
 
           accounts: {
           create: [{
             type: account.type as any,
             provider: account.provider as any,
             providerAccountId: account.providerAccountId as any,

             refresh_token: account.refresh_token ?? null,
             access_token: account.access_token ?? null,
             expires_at: account.expires_at ?? null,
             token_type: account.token_type ?? null,
             scope: account.scope ?? null,
             id_token: account.id_token ?? null,
             session_state: (account as any).session_state ?? null,
            } ],
},
          },
        });

        return true;
      }

      // 🔍 existing account
      const existingAccount = await db.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: account.provider!,
            providerAccountId: account.providerAccountId!,
          },
        },
      });

      // ❌ link account if not exists
      if (!existingAccount) {
        await db.account.create({
          data: {
            userId: existingUser.id,

            type: account.type!,
            provider: account.provider!,
            providerAccountId: account.providerAccountId!,

            refresh_token: account.refresh_token ?? null,
            access_token: account.access_token ?? null,
            expires_at: account.expires_at ?? null,
            token_type: account.token_type ?? null,
            scope: account.scope ?? null,
            id_token: account.id_token ?? null,
            session_state: (account as any).session_state ?? null,
          },
        });
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      // @ts-ignore (if role not in default type)
      token.role = existingUser.role;

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        // @ts-ignore
        session.user.id = token.sub;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
  },

  ...authConfig,
});