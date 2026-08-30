// Database-backed wrappers around runQualification(). Everything that touches
// Postgres lives here so pipeline.ts stays runnable from a script.
import { initialSteps, type ScoringStep } from "../mock-api";
import {
  createRun,
  finishLead,
  finishRun,
  getActiveIcp,
  getScrapes,
  markLeadFailed,
  saveScrapes,
  setStages,
} from "../db/queries";
import { runQualification, type StagePatch } from "./pipeline";
import { buildContext } from "./context";
import { qualify } from "./qualify";
import { verifyQualification } from "./verify";
import { writeIcebreaker } from "./icebreaker";
import { scoreFrom } from "../scoring";
import type { Lead, LeadSubmission } from "../types";
import type { WebsiteScrape } from "./scrape-website";
import type { CompanyScrape, PersonScrape } from "./scrape-linkedin";

export type PipelineMode = "mock" | "replay" | "live";

export function pipelineMode(): PipelineMode {
  const mode = process.env.PIPELINE_MODE;
  return mode === "live" || mode === "replay" ? mode : "mock";
}

/** `replay` reads captured fixtures rather than calling Apify. */
function fixturesEnabled(): boolean {
  return pipelineMode() === "replay";
}

/**
 * Runs in the background after the POST has already responded. It must never
 * throw into the caller — a failed run is recorded, not propagated.
 */
export async function runPipelineForLead(
  leadId: string,
  submission: LeadSubmission,
): Promise<void> {
  const stages: ScoringStep[] = initialSteps(submission);
  await createRun(leadId, stages);

  const onStage = async (index: number, patch: StagePatch) => {
    const next = stages[index];
    if (!next) return;
    stages[index] = { ...next, ...patch };
    await setStages(leadId, [...stages]);
  };

  try {
    const icp = await getActiveIcp();
    const { lead, scrapes } = await runQualification(
      submission,
      icp.criteria,
      icp.guidance,
      { useFixtures: fixturesEnabled(), onStage },
    );

    await saveScrapes(leadId, scrapes);
    await finishLead(leadId, lead, icp);
    await finishRun(leadId);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    for (let i = 0; i < stages.length; i++) {
      if (stages[i].state === "active" || stages[i].state === "pending") {
        stages[i] = { ...stages[i], state: "failed", detail: message.slice(0, 140) };
      }
    }
    await setStages(leadId, [...stages]);
    await markLeadFailed(leadId);
    await finishRun(leadId, message);
  }
}

/**
 * Re-scores an existing lead against the current ICP using the scrapes already
 * on disk. No Apify credit is spent — this is what the scrapes table is for.
 */
export async function rescoreLead(leadId: string): Promise<Omit<Lead, "id"> | null> {
  const rows = await getScrapes(leadId);
  if (!rows.length) return null;

  const site = rows.find((r) => r.source === "website");
  const person = rows.find((r) => r.source === "linkedin_person");
  const company = rows.find((r) => r.source === "linkedin_company");

  const websiteScrape = (site?.normalized as WebsiteScrape | null) ?? {
    domain: "",
    pages: [],
    unreachable: true,
  };

  const context = buildContext(
    websiteScrape,
    (person?.normalized as PersonScrape | null) ?? null,
    (company?.normalized as CompanyScrape | null) ?? null,
  );

  const icp = await getActiveIcp();
  const judged = await qualify(context, icp.criteria);
  const verified = verifyQualification(judged, context, icp.criteria);
  const { score, disqualifiedBy } = scoreFrom(icp.criteria, verified.results);
  const icebreaker = await writeIcebreaker(context, verified.evidence, icp.guidance);

  const unreadableSource = websiteScrape.unreachable
    ? ("website" as const)
    : !person?.normalized && !company?.normalized
      ? ("linkedin" as const)
      : null;

  const mustHaveUnknown = verified.criteriaResults.some(
    (r) => r.type === "must_have" && r.result === "unknown",
  );

  const updated: Partial<Lead> = {
    companyName: judged.companyName,
    role: judged.role,
    niche: judged.niche,
    primaryService: judged.primaryService,
    icpFitScore: score,
    status: unreadableSource || mustHaveUnknown ? "needs_review" : "scored",
    icpFitReason: judged.icpFitReason,
    icebreaker,
    criteriaResults: verified.criteriaResults,
    evidence: verified.evidence,
    unreadableSource,
    disqualified: Boolean(disqualifiedBy),
    scoredAt: new Date().toISOString(),
  };

  await finishLead(leadId, updated as Omit<Lead, "id">, icp);
  return updated as Omit<Lead, "id">;
}
