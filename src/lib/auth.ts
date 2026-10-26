import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"

// Lazy load Prisma to prevent build errors
let prisma: any = null;

async function getPrisma() {
  if (!prisma) {
    const { prisma: prismaClient } = await import("@/lib/prisma");
    prisma = prismaClient;
  }
  return prisma;
}

export const authOptions: NextAuthOptions = {
  // Only use adapter if DATABASE_URL is set
  ...(process.env.DATABASE_URL ? {
    adapter: (await import("@next-auth/prisma-adapter")).PrismaAdapter(await getPrisma()),
  } : {}),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const prismaClient = await getPrisma();
        if (!prismaClient) {
          throw new Error("Database not configured")
        }

        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/account",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
