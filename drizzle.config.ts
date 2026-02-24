import { defineConfig } from "drizzle-kit";

// Allow builds without DATABASE_URL (for Vercel and similar CI/CD environments)
// DATABASE_URL is only required when running drizzle-kit commands directly
const databaseUrl = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/db";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
