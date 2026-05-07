import { PrismaClient } from "@prisma/client";

declare global {
  var __handtohandPrisma: PrismaClient | undefined;
}

export const prisma =
  global.__handtohandPrisma ??
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.__handtohandPrisma = prisma;
}
