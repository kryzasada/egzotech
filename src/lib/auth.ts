import { createUserSession, getUserByEmail } from "@/db/queries";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await getUserByEmail(credentials.email);

        if (!user) {
          return null;
        }

        const isValid = await compare(
          credentials.password,
          user.credentials.password,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.user.id,
          email: user.credentials.email,
          name: `${user.user.firstName} ${user.user.lastName}`,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === "signIn" && user) {
        const refreshToken = crypto.randomUUID();
        await createUserSession(user.id, refreshToken);
      }
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
};
