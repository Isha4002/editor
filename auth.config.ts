import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  pages: {
    signIn: "/auth/sign-in", // ⭐ IMPORTANT
  },
  providers: [
    GitHub({
      clientId: process.env.Auth_GitHub_ID!,
      clientSecret: process.env.Auth_GitHub_SECRET!,
    }),
    Google({
      clientId: process.env.Auth_Google_ID!,
      clientSecret: process.env.Auth_Google_SECRET!,
    }),
  ],
} satisfies NextAuthConfig;