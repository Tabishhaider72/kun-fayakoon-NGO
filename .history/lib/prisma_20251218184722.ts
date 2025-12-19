import { PrismaClient } from "@prisma/client";

// Prefer passing datasource overrides to PrismaClient so runtime picks up
// connection info from environment or `prisma.config.ts` used by the CLI.
const datasourceUrl = process.env.DATABASE_URL || process.env.PRISMA_DATABASE_URL || "";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: datasourceUrl || undefined,
    },
  },
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
