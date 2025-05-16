import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

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
          throw new Error("InvalidUsername");
        }

        const response = await sql`
        SELECT * FROM users WHERE username=${credentials?.username}`;
        const user = response.rows[0];

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
          } else {
            throw new Error("IncorrectPassword");
          }
        }

        throw new Error("UserNotFound");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }

      if (trigger === "update" && session) {
        token.user = session.user;
      }

      return token;
    },
  },
});

export { handler as GET, handler as POST };
