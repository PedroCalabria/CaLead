import type {
  Criterion,
  CriterionResult,
  CriterionType,
  SourceHint,
} from "./types";

export const RESULT_LABEL: Record<CriterionResult, string> = {
  met: "Met",
  partial: "Partially met",
  not_met: "Not met",
  unknown: "Not verified",
};

export const TYPE_LABEL: Record<CriterionType, string> = {
  must_have: "Must have",
  nice_to_have: "Nice to have",
  disqualifier: "Disqualifier",
};

export const SOURCE_LABEL: Record<SourceHint, string> = {
  website: "Website",
  linkedin: "LinkedIn",
  both: "Website and LinkedIn",
};

export const STATUS = {
  scored: { label: "Scored", fg: "#2c6a4c", bg: "#e9f2ec" },
  processing: { label: "Processing", fg: "#0a6a72", bg: "#e6f0f1" },
  needs_review: { label: "Needs review", fg: "#9a6410", bg: "#fdf7ec" },
} as const;

export interface Band {
  color: string;
  bg: string;
  label: string;
}

/** 1–10 fit score to its colour band. */
export function band(score: number | null | undefined): Band {
  if (score === null || score === undefined) {
    return { color: "#8b959a", bg: "#f2f3f3", label: "Not scored" };
  }
  if (score >= 8) return { color: "#2c6a4c", bg: "#e9f2ec", label: "Strong fit" };
  if (score >= 5) return { color: "#0a6a72", bg: "#e6f0f1", label: "Possible fit" };
  return { color: "#9e3327", bg: "#f8ece9", label: "Poor fit" };
}

/** Ten segments, filled up to the score, in the band colour. */
export function ticks(score: number | null | undefined): string[] {
  const b = band(score);
  return Array.from({ length: 10 }, (_, i) =>
    i < (score ?? 0) ? b.color : "#dfe3e3",
  );
}

/** Total weight available across enabled, non-disqualifying criteria. */
export function weightBudget(criteria: Criterion[]): number {
  return criteria
    .filter((c) => c.enabled && c.type !== "disqualifier")
    .reduce((sum, c) => sum + (c.weight ?? 0), 0);
}

export interface ScoreOutcome {
  score: number;
  disqualifiedBy: string | null;
}

/**
 * Weighted 1–10 score. A met disqualifier short-circuits to 2 whatever
 * the rest of the criteria say.
 */
export function scoreFrom(
  criteria: Criterion[],
  results: Record<string, CriterionResult>,
): ScoreOutcome {
  const enabled = criteria.filter((c) => c.enabled);
  const triggered = enabled
    .filter((c) => c.type === "disqualifier")
    .find((c) => results[c.name] === "met");
  if (triggered) return { score: 2, disqualifiedBy: triggered.name };

  const weighted = enabled.filter((c) => c.type !== "disqualifier");
  const total = weighted.reduce((sum, c) => sum + (c.weight ?? 0), 0) || 1;
  const earned = weighted.reduce((sum, c) => {
    const r = results[c.name];
    const factor = r === "met" ? 1 : r === "partial" ? 0.5 : 0;
    return sum + (c.weight ?? 0) * factor;
  }, 0);

  return {
    score: Math.max(1, Math.min(10, Math.round(1 + 9 * (earned / total)))),
    disqualifiedBy: null,
  };
}
