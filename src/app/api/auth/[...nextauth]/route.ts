import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import { JWT } from "next-auth/jwt";

const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;

const handler = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!usernameRegex.test(credentials?.username || "")) {
          return null; // Return null if the username format is invalid
        }

        const response = await sql`
        SELECT * FROM users WHERE username=${credentials?.username}`;
        const user = response.rows[0];

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        if (user) {
          const passwordCorrect = await compare(
            credentials?.password || "",
            user.password
          );

          if (passwordCorrect) {
            return {
              id: user.id,
              username: user.username,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
