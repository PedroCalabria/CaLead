/**
 * Runs one qualification end to end and prints what came back.
 *
 *   npx tsx scripts/try-agent.ts --fixtures
 *   npx tsx scripts/try-agent.ts --live --site acme.io --li https://linkedin.com/in/someone
 *
 * Deliberately database-free: it uses the seed ICP from lib/mock-data, so it
 * needs no DATABASE_URL and exercises exactly the code the API route runs.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { runQualification } from "../src/lib/agent/pipeline";
import { criteria, guidance } from "../src/lib/mock-data";
import { scoreFrom } from "../src/lib/scoring";
import { RESULT_LABEL } from "../src/lib/scoring";
import { normaliseUrl } from "../src/lib/validation";
import type { LeadSubmission } from "../src/lib/types";

function arg(name: string, fallback = ""): string {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : (process.argv[index + 1] ?? fallback);
}
const flag = (name: string) => process.argv.includes(`--${name}`);

const useFixtures = flag("fixtures") || !flag("live");

const submission: LeadSubmission = {
  fullName: arg("name", "Test Lead"),
  email: arg("email", "lead@example.com"),
  phone: arg("phone", "+1 415 555 0148"),
  website: normaliseUrl("website", arg("site", "example.com")),
  linkedin: normaliseUrl("linkedin", arg("li", "linkedin.com/in/example")),
};

async function main() {
  console.log(`\nMode: ${useFixtures ? "fixtures (offline, free)" : "LIVE (spends Apify credit)"}`);
  console.log(`Site: ${submission.website}`);
  console.log(`LinkedIn: ${submission.linkedin}\n`);

  if (!useFixtures) process.env.CAPTURE_FIXTURES = "1";

  const started = Date.now();
  const { lead, scrapes, dropped } = await runQualification(
    submission,
    criteria,
    guidance,
    {
      useFixtures,
      onStage: (index, patch) =>
        console.log(`  step ${index + 1}: ${patch.state ?? ""} ${patch.detail ?? ""}`),
    },
  );

  console.log("\n─── scrapes ───");
  for (const s of scrapes) {
    console.log(`  ${s.ok ? "ok  " : "FAIL"} ${s.source.padEnd(17)} ${s.actorId}`);
  }

  console.log("\n─── lead ───");
  console.log(`  Company:   ${lead.companyName}`);
  console.log(`  Role:      ${lead.role}`);
  console.log(`  Niche:     ${lead.niche}`);
  console.log(`  Service:   ${lead.primaryService}`);
  console.log(`  Score:     ${lead.icpFitScore}/100  status: ${lead.status}${lead.disqualified ? "  DISQUALIFIED" : ""}`);
  console.log(`  Reason:    ${lead.icpFitReason}`);

  console.log("\n─── criteria ───");
  for (const r of lead.criteriaResults) {
    console.log(`  ${RESULT_LABEL[r.result].padEnd(13)} ${r.criterion}`);
    console.log(`                ${r.note}`);
  }

  console.log("\n─── evidence (verified verbatim) ───");
  for (const e of lead.evidence) {
    console.log(`  [${e.source}] ${e.location}`);
    console.log(`    "${e.snippet}"`);
    console.log(`    supports: ${e.supports.join(", ") || "—"}`);
  }

  if (dropped.length) {
    console.log("\n─── evidence DROPPED (did not survive grounding) ───");
    for (const d of dropped) console.log(`  ${d.reason}: "${d.snippet.slice(0, 90)}"`);
  }

  console.log(`\n─── icebreaker (${lead.icebreaker?.length ?? 0}/${guidance.maxLength}) ───`);
  console.log(`  ${lead.icebreaker}`);

  // The one invariant worth asserting: the score is the deterministic function
  // of the verified results, not something the model chose.
  const results = Object.fromEntries(
    lead.criteriaResults.map((r) => [r.criterion, r.result]),
  );
  const recomputed = scoreFrom(criteria, results);
  const agrees = recomputed.score === lead.icpFitScore;
  console.log(`\nscoreFrom() recomputed: ${recomputed.score} — ${agrees ? "MATCHES" : "MISMATCH"}`);
  if (lead.icebreaker && lead.icebreaker.length > guidance.maxLength) {
    console.log(`WARNING: icebreaker exceeds maxLength`);
  }
  console.log(`took ${((Date.now() - started) / 1000).toFixed(1)}s\n`);

  if (!agrees) process.exit(1);
}

main().catch((error) => {
  console.error("\nFAILED:", error instanceof Error ? error.message : error);
  process.exit(1);
});
