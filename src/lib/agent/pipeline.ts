// Orchestrates one qualification run.
//
// runQualification() is deliberately database-free so it can run from a script
// against fixtures. The DB-backed wrapper lives in run.ts.
import { scrapeWebsite } from "./scrape-website";
import { isPersonUrl, scrapeCompany, scrapePerson } from "./scrape-linkedin";
import { buildContext, readableSources } from "./context";
import { qualify } from "./qualify";
import { verifyQualification } from "./verify";
import { writeIcebreaker } from "./icebreaker";
import { scoreFrom } from "../scoring";
import { domainOf } from "../format";
import type {
  Criterion,
  EvidenceSource,
  Guidance,
  Lead,
  LeadSubmission,
} from "../types";
import type { StepState } from "../mock-api";

export interface StagePatch {
  state?: StepState;
  detail?: string;
}

export interface ScrapeRecord {
  source: "website" | "linkedin_person" | "linkedin_company";
  actorId: string;
  apifyRunId: string | null;
  raw: unknown;
  normalized: unknown;
  ok: boolean;
}

export interface QualificationOutput {
  lead: Omit<Lead, "id">;
  scrapes: ScrapeRecord[];
  dropped: { snippet: string; reason: string }[];
}

/**
 * The model is asked to return an em dash when it cannot tell, so "—" is a
 * sentinel meaning "unknown" — not a value worth keeping over a scraped fact.
 */
function firstReal(...values: (string | null | undefined)[]): string {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed && trimmed !== "—" && trimmed !== "-") return trimmed;
  }
  return "—";
}

export interface QualificationOptions {
  useFixtures?: boolean;
  onStage?: (index: number, patch: StagePatch) => void | Promise<void>;
}

/** The UI shows three steps; the two LinkedIn scrapes both report into step 1. */
const STEP_SITE = 0;
const STEP_LINKEDIN = 1;
const STEP_SCORE = 2;

export async function runQualification(
  submission: LeadSubmission,
  criteria: Criterion[],
  guidance: Guidance,
  options: QualificationOptions = {},
): Promise<QualificationOutput> {
  const { useFixtures = false, onStage } = options;
  const started = Date.now();
  const step = async (i: number, patch: StagePatch) => {
    await onStage?.(i, patch);
  };

  const scrapes: ScrapeRecord[] = [];

  // --- 1. website and person, in parallel -------------------------------
  await step(STEP_SITE, { state: "active" });
  await step(STEP_LINKEDIN, { state: "active" });

  const wantsPerson = isPersonUrl(submission.linkedin);

  const [siteOutcome, personOutcome] = await Promise.all([
    scrapeWebsite(submission.website, { useFixtures }),
    wantsPerson
      ? scrapePerson(submission.linkedin, { useFixtures })
      : Promise.resolve({ person: null, raw: null, runId: null, error: undefined }),
  ]);

  scrapes.push({
    source: "website",
    actorId: "apify/website-content-crawler",
    apifyRunId: siteOutcome.runId,
    raw: siteOutcome.raw,
    normalized: siteOutcome.scrape,
    ok: !siteOutcome.scrape.unreachable,
  });

  await step(STEP_SITE, {
    state: siteOutcome.scrape.unreachable ? "failed" : "done",
    detail: siteOutcome.scrape.unreachable
      ? (siteOutcome.scrape.error ?? "Site could not be read")
      : `${siteOutcome.scrape.pages.length} pages read`,
  });

  if (wantsPerson) {
    scrapes.push({
      source: "linkedin_person",
      actorId: "harvestapi/linkedin-profile-scraper",
      apifyRunId: personOutcome.runId,
      raw: personOutcome.raw,
      normalized: personOutcome.person,
      ok: Boolean(personOutcome.person),
    });
  }

  // --- 2. company page, derived from the person -------------------------
  const companyUrl =
    personOutcome.person?.companyLinkedinUrl ||
    (isPersonUrl(submission.linkedin) ? null : submission.linkedin);

  const searchName =
    personOutcome.person?.currentCompany ||
    siteOutcome.scrape.pages[0]?.title?.split(/[|\u2013\u2014-]/)[0]?.trim() ||
    null;

  const companyOutcome =
    companyUrl || searchName
      ? await scrapeCompany({ companyUrl, searchName }, { useFixtures })
      : { company: null, raw: null, runId: null, error: "No company to look up" };

  if (companyUrl || searchName) {
    scrapes.push({
      source: "linkedin_company",
      actorId: "harvestapi/linkedin-company",
      apifyRunId: companyOutcome.runId,
      raw: companyOutcome.raw,
      normalized: companyOutcome.company,
      ok: Boolean(companyOutcome.company),
    });
  }

  const context = buildContext(
    siteOutcome.scrape,
    personOutcome.person,
    companyOutcome.company,
  );
  const readable = readableSources(context);

  await step(STEP_LINKEDIN, {
    state: readable.linkedin ? "done" : "failed",
    detail: readable.linkedin
      ? [
          personOutcome.person ? "profile" : null,
          companyOutcome.company
            ? `company${companyOutcome.company.employeeCount ? ` · ${companyOutcome.company.employeeCount} employees` : ""}`
            : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : (personOutcome.error ?? companyOutcome.error ?? "LinkedIn could not be read"),
  });

  // --- 3. qualify, verify, score, write ---------------------------------
  await step(STEP_SCORE, { state: "active" });

  const judged = await qualify(context, criteria);
  const verified = verifyQualification(judged, context, criteria);
  const { score, disqualifiedBy } = scoreFrom(criteria, verified.results);

  const icebreaker = await writeIcebreaker(context, verified.evidence, guidance);

  const enabled = criteria.filter((c) => c.enabled);
  const verifiedCount = verified.criteriaResults.filter(
    (r) => r.result !== "unknown",
  ).length;

  await step(STEP_SCORE, {
    state: "done",
    detail: `${verifiedCount} of ${enabled.length} criteria verified`,
  });

  // A run that could not read a source, or left a must-have unproven, is not
  // a finished score — it is something a human should look at.
  const unreadableSource: EvidenceSource | null = !readable.website
    ? "website"
    : !readable.linkedin
      ? "linkedin"
      : null;

  const mustHaveUnknown = verified.criteriaResults.some(
    (r) => r.type === "must_have" && r.result === "unknown",
  );

  const lead: Omit<Lead, "id"> = {
    fullName: submission.fullName,
    email: submission.email,
    phone: submission.phone,
    companyWebsite: submission.website,
    linkedinUrl: submission.linkedin,

    companyName: firstReal(
      companyOutcome.company?.name,
      judged.companyName,
      domainOf(submission.website),
    ),
    role: firstReal(personOutcome.person?.role, judged.role),
    niche: firstReal(judged.niche),
    primaryService: firstReal(judged.primaryService),

    icpFitScore: score,
    status: unreadableSource || mustHaveUnknown ? "needs_review" : "scored",
    icpFitReason: judged.icpFitReason || null,
    icebreaker: icebreaker || null,

    criteriaResults: verified.criteriaResults,
    evidence: verified.evidence,

    unreadableSource,
    disqualified: Boolean(disqualifiedBy),

    criteriaVersion: "v1",
    submittedAt: new Date(started).toISOString(),
    scoredAt: new Date().toISOString(),
    durationMs: Date.now() - started,
  };

  return { lead, scrapes, dropped: verified.dropped };
}
