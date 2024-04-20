import NextAuth, { getServerSession } from "next-auth/next";
import type { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/db";
import bcrypt from "bcrypt";
import isEmail from "@/libs/isEmail";
import type { DefaultSession } from "next-auth";
import { useSession } from "next-auth/react";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & {
      id: string;
      username?: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    username?: string;
    name?: string;
    email?: string;
    image?: string;
  }
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("invalid credentials");
        }
        let user;
        const email = isEmail(credentials.username);
        if (email) {
          user = await prisma.user.findUnique({
            where: { email: credentials.username },
          });
        } else {
          user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });
        }
        if (!user || !user?.hashedPassword)
          throw new Error("invalid credentials");
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) throw new Error("invalid credentials");
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          image: user.image,
        } as User;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: any }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }: { session: Session; token: any }) => {
      session.user = token.user;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
