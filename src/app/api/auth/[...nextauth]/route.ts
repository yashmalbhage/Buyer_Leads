import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Demo Login",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        // if no email entered
        if (!credentials?.email) return null;

        // find or create user
        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          user = await prisma.user.create({
            data: { email: credentials.email,
                 password: "demo"
             },
          });
        }
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // our custom page
  },
});

export { handler as GET, handler as POST };
