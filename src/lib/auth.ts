import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUserSession, getUserByEmail } from "@/db/queries/auth";
import { compare } from "bcryptjs";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 1 day

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE_SECONDS,
  },
  jwt: {
    maxAge: SESSION_MAX_AGE_SECONDS,
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
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
};
