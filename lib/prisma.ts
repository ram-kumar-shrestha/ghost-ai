import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/app/generated/prisma/client";

const SSL_MODES_WITH_VERIFY_FULL_BEHAVIOR = new Set([
  "prefer",
  "require",
  "verify-ca",
]);

const normalizeDirectPostgresUrl = (databaseUrl: string) => {
  try {
    const url = new URL(databaseUrl);
    const sslMode = url.searchParams.get("sslmode");
    const usesLibpqCompatibility =
      url.searchParams.get("uselibpqcompat") === "true";

    if (
      sslMode &&
      !usesLibpqCompatibility &&
      SSL_MODES_WITH_VERIFY_FULL_BEHAVIOR.has(sslMode)
    ) {
      url.searchParams.set("sslmode", "verify-full");
    }

    return url.toString();
  } catch {
    return databaseUrl;
  }
};

const createPrismaClient = () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to initialize Prisma.");
  }

  if (databaseUrl.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: databaseUrl });
  }

  const adapter = new PrismaPg({
    connectionString: normalizeDirectPostgresUrl(databaseUrl),
  });

  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
