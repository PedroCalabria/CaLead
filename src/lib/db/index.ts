// Lazy on purpose: `mock` mode runs with no DATABASE_URL at all, so importing
// this module must never be what fails.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let cached: Db | null = null;

export function getDb(): Db {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Set PIPELINE_MODE=mock to run without a database, or see SETUP.md.",
    );
  }
  cached = drizzle(neon(url), { schema });
  return cached;
}

export { schema };
