import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Make prisma optional to prevent build errors when DATABASE_URL is not set
export const getPrisma = () => {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set. Prisma client will not be initialized.');
    return null;
  }
  return prisma;
};
