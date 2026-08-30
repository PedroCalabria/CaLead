/**
 * Verifies the three credentials with the cheapest call each, before you spend
 * anything on a real run.
 *
 *   npm run check
 */
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

const ok = (m: string) => console.log(`  ok    ${m}`);
const bad = (m: string) => console.log(`  FAIL  ${m}`);
let failures = 0;

async function checkApify() {
  const token = process.env.APIFY_TOKEN;
  if (!token) return bad("APIFY_TOKEN is not set"), failures++;
  try {
    const response = await fetch("https://api.apify.com/v2/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      bad(`Apify rejected the token (HTTP ${response.status})`);
      return failures++;
    }
    const { data } = await response.json();
    ok(`Apify — user "${data.username}", plan "${data.plan?.id ?? "free"}"`);
    const limit = data.plan?.monthlyUsageCreditsUsd;
    if (limit) console.log(`        monthly credit: $${limit}`);
  } catch (error) {
    bad(`Apify unreachable: ${error instanceof Error ? error.message : error}`);
    failures++;
  }
}

async function checkGemini() {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) return bad("GOOGLE_GENERATIVE_AI_API_KEY is not set"), failures++;
  const modelId = process.env.LLM_MODEL ?? "gemini-3.6-flash";
  try {
    const { generateText } = await import("ai");
    const { google } = await import("@ai-sdk/google");
    const { text } = await generateText({
      model: google(modelId),
      prompt: "Reply with exactly: ready",
    });
    ok(`Gemini — ${modelId} responded ("${text.trim().slice(0, 20)}")`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    bad(`Gemini call failed: ${message.slice(0, 200)}`);
    failures++;
  }
}

async function checkDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) return bad("DATABASE_URL is not set"), failures++;
  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(url);
    await sql`select 1`;
    const tables = (await sql`
      select table_name from information_schema.tables
      where table_schema = 'public'
      order by table_name
    `) as { table_name: string }[];

    const names = tables.map((t) => t.table_name);
    const expected = ["icp_versions", "lead_runs", "leads", "scrapes"];
    const missing = expected.filter((t) => !names.includes(t));

    if (missing.length) {
      bad(`Neon connected, but tables are missing: ${missing.join(", ")}`);
      console.log(`        run: npm run db:push`);
      failures++;
    } else {
      ok(`Neon — connected, all ${expected.length} tables present`);
    }
  } catch (error) {
    bad(`Neon failed: ${error instanceof Error ? error.message : error}`);
    failures++;
  }
}

function checkModes() {
  const server = process.env.PIPELINE_MODE ?? "mock";
  const client = process.env.NEXT_PUBLIC_PIPELINE_MODE ?? "mock";
  if (server !== client) {
    bad(`PIPELINE_MODE="${server}" but NEXT_PUBLIC_PIPELINE_MODE="${client}" — these must match`);
    return failures++;
  }
  if (server === "mock") {
    console.log(`  note  PIPELINE_MODE=mock — the app runs the simulator and ignores all keys above.`);
    console.log(`        set both to "live" to use the real pipeline.`);
  } else {
    ok(`PIPELINE_MODE=${server} on both server and client`);
  }
}

async function main() {
  console.log("\nChecking setup...\n");
  checkModes();
  await checkApify();
  await checkGemini();
  await checkDatabase();
  console.log(failures ? `\n${failures} problem(s) above.\n` : "\nAll good.\n");
  process.exit(failures ? 1 : 0);
}

main();
