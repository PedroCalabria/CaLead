/**
 * One real pass to populate the demo. Run once; `replay` mode serves the result
 * forever afterwards, and re-scoring reads the cached scrapes rather than Apify.
 *
 *   npx tsx scripts/seed.ts            # dry run — prints what it would do
 *   npx tsx scripts/seed.ts --confirm  # actually runs, spends Apify credit
 *
 * Edit TARGETS below to leads you actually want in the demo.
 */
import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { runQualification } from "../src/lib/agent/pipeline";
import { RATE_LIMIT_PAUSE_MS } from "../src/lib/agent/model";
import {
  createLead,
  finishLead,
  getActiveIcp,
  saveScrapes,
} from "../src/lib/db/queries";
import { normaliseUrl } from "../src/lib/validation";
import type { LeadSubmission } from "../src/lib/types";

const TARGETS: Array<Pick<LeadSubmission, "fullName" | "email" | "website" | "linkedin">> = [
  // { fullName: "Dana Reed", email: "dana@acme.io", website: "acme.io",
  //   linkedin: "https://linkedin.com/in/danareed" },
];

const confirmed = process.argv.includes("--confirm");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  if (!TARGETS.length) {
    console.log("No targets. Add entries to TARGETS in scripts/seed.ts first.");
    return;
  }

  console.log(`${TARGETS.length} leads · about $${(TARGETS.length * 0.017).toFixed(2)} of Apify credit`);

  if (!confirmed) {
    console.log("\nDry run. Re-run with --confirm to actually scrape:\n");
    for (const t of TARGETS) console.log(`  ${t.fullName} — ${t.website}`);
    return;
  }

  process.env.CAPTURE_FIXTURES = "1";
  const icp = await getActiveIcp();
  console.log(`Scoring against ICP ${icp.label} (${icp.criteria.filter((c) => c.enabled).length} active criteria)\n`);

  let done = 0;
  for (const target of TARGETS) {
    const submission: LeadSubmission = {
      ...target,
      phone: "+1 415 555 0100",
      website: normaliseUrl("website", target.website),
      linkedin: normaliseUrl("linkedin", target.linkedin),
    };

    try {
      const leadId = await createLead(submission, icp);
      const { lead, scrapes } = await runQualification(
        submission,
        icp.criteria,
        icp.guidance,
        { useFixtures: false },
      );
      await saveScrapes(leadId, scrapes);
      await finishLead(leadId, lead, icp);
      done++;
      console.log(`  ok   ${target.website.padEnd(28)} score ${lead.icpFitScore}/100 ${lead.status}`);
    } catch (error) {
      console.log(`  FAIL ${target.website.padEnd(28)} ${error instanceof Error ? error.message : error}`);
    }

    // Free-tier Flash is rate limited per minute; two model calls per lead adds up.
    if (done < TARGETS.length) await sleep(RATE_LIMIT_PAUSE_MS);
  }

  console.log(`\n${done}/${TARGETS.length} seeded. Set PIPELINE_MODE=replay to demo without spending.`);
}

main().catch((error) => {
  console.error("FAILED:", error instanceof Error ? error.message : error);
  process.exit(1);
});
