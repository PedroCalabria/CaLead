// Rule 2 enforced in code: every snippet the model calls evidence must actually
// appear in the text it was shown. Anything that does not is discarded rather
// than shown to a user as though it were real.
import { renderContext, readableSources, type ScrapedContext } from "./context";
import type { QualifyResult } from "./qualify";
import type {
  Criterion,
  CriterionOutcome,
  CriterionResult,
  Evidence,
} from "../types";

/** Smart quotes, dashes, case and whitespace vary harmlessly. Content does not. */
function canonical(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u2018\u2019\u2032]/g, "'")
    .replace(/[\u201c\u201d\u2033]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

/** Below this, a "snippet" matches by accident rather than by provenance. */
const MIN_SNIPPET = 12;

export interface VerifiedQualification {
  criteriaResults: CriterionOutcome[];
  evidence: Evidence[];
  results: Record<string, CriterionResult>;
  dropped: { snippet: string; reason: string }[];
}

export function verifyQualification(
  raw: QualifyResult,
  context: ScrapedContext,
  criteria: Criterion[],
): VerifiedQualification {
  const enabled = criteria.filter((c) => c.enabled);
  const names = new Set(enabled.map((c) => c.name));
  const haystack = canonical(renderContext(context));
  const readable = readableSources(context);
  const dropped: { snippet: string; reason: string }[] = [];

  // --- evidence ---------------------------------------------------------
  const evidence: Evidence[] = [];
  for (const item of raw.evidence ?? []) {
    const snippet = (item.snippet ?? "").trim();

    if (snippet.length < MIN_SNIPPET) {
      dropped.push({ snippet, reason: "too short to attribute" });
      continue;
    }
    if (!haystack.includes(canonical(snippet))) {
      dropped.push({ snippet, reason: "not found in the scraped text" });
      continue;
    }

    // Keep only the criterion names that actually exist.
    const supports = (item.supports ?? []).filter((name) => names.has(name));

    evidence.push({
      source: item.source,
      location: item.location || "—",
      snippet,
      supports,
    });
  }

  // --- criteria ---------------------------------------------------------
  const byName = new Map(
    (raw.criteriaResults ?? []).map((r) => [r.criterion, r]),
  );

  const criteriaResults: CriterionOutcome[] = enabled.map((criterion) => {
    const judged = byName.get(criterion.name);

    let result: CriterionResult = judged?.result ?? "unknown";
    let note = judged?.note?.trim() || "Not returned by the model.";

    // A criterion cannot be decided from a source that was never read.
    const needsWebsite = criterion.source === "website";
    const needsLinkedin = criterion.source === "linkedin";
    const blocked =
      (needsWebsite && !readable.website) || (needsLinkedin && !readable.linkedin);

    if (blocked && result !== "unknown") {
      result = "unknown";
      note = `${needsWebsite ? "Website" : "LinkedIn"} could not be read — not verified.`;
    }

    return {
      criterion: criterion.name,
      // type and weight come from the saved criteria, never from the model
      type: criterion.type,
      weight: criterion.weight,
      result,
      note,
    };
  });

  const results: Record<string, CriterionResult> = {};
  for (const outcome of criteriaResults) results[outcome.criterion] = outcome.result;

  return { criteriaResults, evidence, results, dropped };
}
