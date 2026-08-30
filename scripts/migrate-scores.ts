/**
 * Re-scores stored leads onto the 0–100 scale.
 *
 *   npx tsx scripts/migrate-scores.ts            # dry run
 *   npx tsx scripts/migrate-scores.ts --confirm  # write
 *
 * It recomputes from each lead's stored criteriaResults rather than rescaling
 * the old number, so the result is exactly what scoreFrom() would produce today.
 * No model call, no scraping — the judgments are already on disk.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { eq } from "drizzle-orm";
import { getDb } from "../src/lib/db";
import { leads } from "../src/lib/db/schema";
import { band, scoreFrom } from "../src/lib/scoring";
import type { Criterion, CriterionResult } from "../src/lib/types";

const confirmed = process.argv.includes("--confirm");

async function main() {
  const db = getDb();
  const rows = await db.select().from(leads);

  if (!rows.length) {
    console.log("No leads stored — nothing to migrate.");
    return;
  }

  console.log(`\n${rows.length} lead(s)${confirmed ? "" : " — dry run"}\n`);
  let changed = 0;

  for (const row of rows) {
    if (!row.criteriaResults?.length) {
      console.log(`  skip  ${row.id}  ${row.companyName} — no stored criteria results`);
      continue;
    }

    // Rebuild criteria from the outcomes themselves: they carry the type and
    // weight that were in force when this lead was scored.
    const criteria: Criterion[] = row.criteriaResults.map((outcome) => ({
      id: outcome.criterion,
      name: outcome.criterion,
      description: "",
      type: outcome.type,
      weight: outcome.weight,
      source: "both",
      enabled: true,
    }));

    const results: Record<string, CriterionResult> = Object.fromEntries(
      row.criteriaResults.map((outcome) => [outcome.criterion, outcome.result]),
    );

    const { score, disqualifiedBy } = scoreFrom(criteria, results);
    const before = row.icpFitScore;

    if (before === score) {
      console.log(`  same  ${row.id}  ${row.companyName}  ${score}`);
      continue;
    }

    console.log(
      `  ${confirmed ? "wrote" : "would"} ${row.id}  ${row.companyName.padEnd(20)}` +
        `  ${before} -> ${score}  (${band(score).label})${disqualifiedBy ? "  disqualified" : ""}`,
    );

    if (confirmed) {
      await db
        .update(leads)
        .set({ icpFitScore: score, disqualified: Boolean(disqualifiedBy) })
        .where(eq(leads.id, row.id));
    }
    changed++;
  }

  console.log(
    confirmed
      ? `\n${changed} lead(s) updated.\n`
      : `\n${changed} lead(s) would change. Re-run with --confirm to write.\n`,
  );
}

main().catch((error) => {
  console.error("FAILED:", error instanceof Error ? error.message : error);
  process.exit(1);
});
