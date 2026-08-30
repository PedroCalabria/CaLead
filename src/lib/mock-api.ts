// The prototype's simulated scoring run. Stage 2 swaps this module for
// the real scraping + scoring endpoint; nothing outside it knows the
// difference, as long as the same shapes come back.
import { domainOf } from "./format";
import type { Lead, LeadSubmission } from "./types";

export type StepState = "pending" | "active" | "done" | "failed";

export interface ScoringStep {
  id: string;
  label: string;
  detail: string;
  state: StepState;
}

/** Which failure mode the demo controls on the form ask for. */
export type Simulation = "scored" | "partial";

export function initialSteps(submission: LeadSubmission): ScoringStep[] {
  return [
    {
      id: "site",
      label: `Reading ${domainOf(submission.website)}`,
      detail: "Homepage, pricing, about",
      state: "active",
    },
    {
      id: "li",
      label: "Reading LinkedIn page",
      detail: "About, people, jobs",
      state: "pending",
    },
    {
      id: "score",
      label: "Scoring against your ICP",
      detail: "7 criteria, 19 points of weight",
      state: "pending",
    },
  ];
}

type Patch = Partial<Pick<ScoringStep, "state" | "detail">>;

/**
 * Drives the three-step progress display, then resolves with the lead.
 * Returns a cancel function so a leaving component can stop the timers.
 */
export function runScoring(
  submission: LeadSubmission,
  simulation: Simulation,
  onStep: (index: number, patch: Patch) => void,
  onDone: (lead: Lead) => void,
): () => void {
  const partial = simulation === "partial";
  const timers: ReturnType<typeof setTimeout>[] = [];
  const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

  at(1700, () => {
    onStep(0, { state: "done", detail: "6 pages read, 4 snippets kept" });
    onStep(1, { state: "active" });
  });
  at(3500, () => {
    if (partial) onStep(1, { state: "failed", detail: "No response after 8 seconds" });
    else onStep(1, { state: "done", detail: "Employee count, 2 open roles" });
    onStep(2, { state: "active" });
  });
  at(4800, () => {
    onStep(2, {
      state: "done",
      detail: partial ? "5 of 7 criteria verified" : "7 of 7 criteria verified",
    });
  });
  at(5300, () => onDone(buildLead(submission, partial)));

  return () => timers.forEach(clearTimeout);
}

function buildLead(f: LeadSubmission, partial: boolean): Lead {
  const dom = domainOf(f.website);
  const company = dom.split(".")[0].replace(/^./, (c) => c.toUpperCase());

  return {
    id: `ld_${Math.random().toString(16).slice(2, 6)}`,
    fullName: f.fullName,
    email: f.email,
    phone: f.phone,
    companyWebsite: f.website,
    linkedinUrl: f.linkedin,
    companyName: company,
    role: "—",
    niche: "B2B SaaS — unclassified",
    primaryService: `Read from ${dom} — homepage and pricing`,
    icpFitScore: partial ? 6 : 8,
    status: partial ? "needs_review" : "scored",
    unreadableSource: partial ? "linkedin" : null,
    scoredAt: new Date().toISOString(),
    durationMs: partial ? 9400 : 5200,
    criteriaVersion: "v4",
    icpFitReason: partial
      ? "Scored on website evidence only — the LinkedIn page did not respond, so team size and hiring signals are unverified. The site alone clears two of three must-haves."
      : "Site copy names a manual workflow on the homepage and the pricing page is per-seat and business-facing. Team size sits mid-band and there is an open revenue role.",
    icebreaker: partial
      ? "Your site is direct about the manual side of the work, which is rarer than it should be. Curious who owns that process on your side today."
      : "Your pricing page prices per seat but your homepage sells a process fix — that gap is usually where the interesting conversations are. Who owns that on your team?",
    criteriaResults: [
      {
        criterion: "Team size 10–200",
        type: "must_have",
        weight: 5,
        result: partial ? "unknown" : "met",
        note: partial
          ? "LinkedIn unreachable — no employee count available."
          : "LinkedIn lists 61 employees.",
      },
      {
        criterion: "Sells to other businesses",
        type: "must_have",
        weight: 5,
        result: "met",
        note: "Per-seat pricing, business case studies.",
      },
      {
        criterion: "Manual-process pain point",
        type: "must_have",
        weight: 4,
        result: "met",
        note: "Homepage hero names a manual workflow.",
      },
      {
        criterion: "Hiring sales or SDR roles",
        type: "nice_to_have",
        weight: 3,
        result: partial ? "unknown" : "met",
        note: partial
          ? "LinkedIn unreachable — job posts not checked."
          : "One revenue role posted this month.",
      },
      {
        criterion: "Runs outbound already",
        type: "nice_to_have",
        weight: 2,
        result: "partial",
        note: "Demo form present, no SDR titles found.",
      },
      {
        criterion: "Staffing or recruiting agency",
        type: "disqualifier",
        weight: null,
        result: "not_met",
        note: "Software company.",
      },
    ],
    evidence: [
      {
        source: "website",
        location: "Homepage — hero",
        snippet: "Stop running the same handover twice.",
        supports: ["Manual-process pain point"],
      },
      {
        source: "website",
        location: "Pricing",
        snippet: "$29 per seat / month, billed annually. Team plans from 10 seats.",
        supports: ["Sells to other businesses"],
      },
      ...(partial
        ? []
        : [
            {
              source: "linkedin" as const,
              location: "Company page — About",
              snippet: "61 employees · Software Development",
              supports: ["Team size 10–200"],
            },
          ]),
    ],
  };
}
