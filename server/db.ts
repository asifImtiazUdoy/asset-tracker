
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

const isDevelopment = process.env.NODE_ENV === "development";

let pool: pg.Pool | null = null;
let db: any = null;
let dbInitialized = false;

if (!process.env.DATABASE_URL) {
  if (isDevelopment) {
    console.warn(
      "⚠️  DATABASE_URL not set. Creating stub database for development.",
    );
  } else {
    console.warn(
      "⚠️  DATABASE_URL not set. Running in production with limited database functionality.",
    );
  }
  // Create a stub object that prevents crashes
  // This allows the app to run without a database
  db = {
    query: () => Promise.resolve({ rows: [] }),
    insert: () => ({ values: () => Promise.resolve({ rows: [] }) }),
    select: () => ({ from: () => Promise.resolve([]) }),
  };
  dbInitialized = true;
} else {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 20,
    });

    // Set error handler to prevent crashes
    pool.on("error", (err) => {
      console.error("Unexpected database pool error:", err.message);
    });

    db = drizzle(pool, { schema });
    dbInitialized = true;

    // Test the connection asynchronously in development
    if (isDevelopment) {
      pool
        .query("SELECT 1")
        .then(() => {
          console.log("✓ Database connection successful");
        })
        .catch((err) => {
          console.warn(
            "⚠️  Could not connect to database:",
            err.message,
          );
          console.warn("The app will run, but database features may not work.");
        });
    }
  } catch (error: any) {
    console.error("Failed to initialize database:", error?.message);
    if (!isDevelopment) {
      throw error;
    }
    console.warn("Running in development mode with degraded database support.");
    db = {
      query: () => Promise.resolve({ rows: [] }),
      insert: () => ({ values: () => Promise.resolve({ rows: [] }) }),
      select: () => ({ from: () => Promise.resolve([]) }),
    };
    dbInitialized = true;
  }
}

export { pool, db };
