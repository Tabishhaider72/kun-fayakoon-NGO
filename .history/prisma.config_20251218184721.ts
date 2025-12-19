/**
 * Prisma configuration file for Migrate/CLI.
 *
 * Move connection URLs here instead of in `schema.prisma` (Prisma 7+).
 * Keep secrets out of source control — put real values in `.env.local`.
 */

const databaseUrl = process.env.DATABASE_URL || "";

export default {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
};
