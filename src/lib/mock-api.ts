// The seam between the interface and the qualification agent.
//
// runScoring keeps the shape the /submit screen was built around — it drives
// the three-step display and resolves with a Lead — but it now starts a real
// run and polls it. PIPELINE_MODE=mock falls back to the Stage-1 simulator so
// the demo works with no keys and no spend.
import { domainOf } from "./format";
import { runSimulatedScoring } from "./mock-api.simulated";
import type { Lead, LeadSubmission } from "./types";

export type StepState = "pending" | "active" | "done" | "failed";

export interface ScoringStep {
  id: string;
  label: string;
  detail: string;
  state: StepState;
}

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
      detail: "Profile, company, hiring",
      state: "pending",
    },
    {
      id: "score",
      label: "Scoring against your ICP",
      detail: "Reading criteria",
      state: "pending",
    },
  ];
}

type Patch = Partial<Pick<ScoringStep, "state" | "detail">>;

const POLL_MS = 1500;

/** Both halves must agree; see SETUP.md. */
function isMockMode(): boolean {
  return (process.env.NEXT_PUBLIC_PIPELINE_MODE ?? "mock") === "mock";
}

/**
 * Starts a run and drives the progress display until it finishes.
 * Returns a cancel function so a leaving component stops polling.
 */
export function runScoring(
  submission: LeadSubmission,
  onStep: (index: number, patch: Patch) => void,
  onDone: (lead: Lead) => void,
  onError?: (message: string) => void,
): () => void {
  if (isMockMode()) {
    return runSimulatedScoring(submission, "scored", onStep, onDone);
  }

  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const fail = (message: string) => {
    if (cancelled) return;
    onError?.(message);
  };

  const poll = async (leadId: string) => {
    if (cancelled) return;

    try {
      const response = await fetch(`/api/leads/${leadId}`, { cache: "no-store" });
      const body = await response.json();

      if (!response.ok) {
        fail(body.error ?? "Could not read the run.");
        return;
      }

      // Repaint every step each tick: the server holds the truth, and a dropped
      // poll must not leave the display stuck a step behind.
      for (const [index, stage] of (body.stages as ScoringStep[]).entries()) {
        onStep(index, { state: stage.state, detail: stage.detail });
      }

      if (body.done) {
        if (body.error) fail(body.error);
        else onDone(body.lead as Lead);
        return;
      }

      timer = setTimeout(() => void poll(leadId), POLL_MS);
    } catch (error) {
      fail(error instanceof Error ? error.message : "Lost contact with the server.");
    }
  };

  void (async () => {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      const body = await response.json();

      if (!response.ok) {
        fail(body.error ?? "The lead could not be submitted.");
        return;
      }
      void poll(body.leadId as string);
    } catch (error) {
      fail(error instanceof Error ? error.message : "Could not reach the server.");
    }
  })();

  return () => {
    cancelled = true;
    if (timer) clearTimeout(timer);
  };
}
