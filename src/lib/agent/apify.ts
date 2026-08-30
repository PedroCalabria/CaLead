// Single entry point to Apify. Owns the token, timeouts, one retry, and the
// fixture cache. Nothing here throws: a source that cannot be read is an
// ordinary outcome the pipeline reports, not an exception it crashes on.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ApifyClient } from "apify-client";

const FIXTURE_DIR = join(process.cwd(), "fixtures");

export type ActorResult<T> =
  | { ok: true; items: T[]; runId: string | null; fromFixture: boolean }
  | { ok: false; error: string; runId: string | null; fromFixture: boolean };

export interface RunActorOptions {
  /** Basename under fixtures/. Enables replay and capture for this call. */
  fixture: string;
  timeoutSecs?: number;
  /** Read fixtures instead of calling Apify. */
  useFixtures?: boolean;
}

let client: ApifyClient | null = null;
function getClient(): ApifyClient {
  if (!client) {
    const token = process.env.APIFY_TOKEN;
    if (!token) throw new Error("APIFY_TOKEN is not set");
    client = new ApifyClient({ token });
  }
  return client;
}

function fixturePath(name: string): string {
  return join(FIXTURE_DIR, `${name}.json`);
}

function readFixture<T>(name: string): T[] | null {
  const path = fixturePath(name);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T[];
  } catch {
    return null;
  }
}

/** Best effort. A read-only filesystem (Vercel) is not an error worth failing on. */
function writeFixture(name: string, items: unknown[]): void {
  if (process.env.CAPTURE_FIXTURES !== "1") return;
  try {
    mkdirSync(FIXTURE_DIR, { recursive: true });
    writeFileSync(fixturePath(name), JSON.stringify(items, null, 2), "utf8");
  } catch {
    // fixtures are a convenience, never a requirement
  }
}

export async function runActor<T = Record<string, unknown>>(
  actorId: string,
  input: Record<string, unknown>,
  options: RunActorOptions,
): Promise<ActorResult<T>> {
  const { fixture, timeoutSecs = 180, useFixtures = false } = options;

  if (useFixtures) {
    const items = readFixture<T>(fixture);
    if (items) return { ok: true, items, runId: null, fromFixture: true };
    return {
      ok: false,
      error: `No fixture at fixtures/${fixture}.json — run once with --live to capture it.`,
      runId: null,
      fromFixture: true,
    };
  }

  let lastError = "";
  let runId: string | null = null;

  // Two attempts: Apify runs fail transiently often enough to be worth one retry,
  // and not often enough to be worth a backoff schedule.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const run = await getClient()
        .actor(actorId)
        .call(input, { waitSecs: timeoutSecs });

      runId = run.id ?? null;

      if (run.status !== "SUCCEEDED") {
        lastError = `Actor ${actorId} finished as ${run.status}`;
        continue;
      }

      const { items } = await getClient()
        .dataset(run.defaultDatasetId)
        .listItems();

      if (!items.length) {
        lastError = `Actor ${actorId} returned no items`;
        continue;
      }

      writeFixture(fixture, items);
      return { ok: true, items: items as T[], runId, fromFixture: false };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
  }

  return { ok: false, error: lastError, runId, fromFixture: false };
}
