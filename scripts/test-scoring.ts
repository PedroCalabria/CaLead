/**
 * The scoring formula, on the 0–100 scale.
 *
 * scoreFrom() is the only thing allowed to produce a number — the model never
 * does — so its behaviour at the boundaries is worth pinning down.
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { DISQUALIFIED_SCORE, band, scoreFrom, ticks, weightBudget } from "../src/lib/scoring";
import type { Criterion, CriterionResult } from "../src/lib/types";

const criterion = (over: Partial<Criterion> & { name: string }): Criterion => ({
  id: over.name, description: "", type: "must_have", weight: 5,
  source: "both", enabled: true, ...over,
});

const CRITERIA: Criterion[] = [
  criterion({ name: "A", weight: 5 }),
  criterion({ name: "B", weight: 5 }),
  criterion({ name: "C", weight: 10, type: "nice_to_have" }),
  criterion({ name: "Agency", type: "disqualifier", weight: null }),
  criterion({ name: "Off", weight: 80, enabled: false }),
];

const results = (map: Record<string, CriterionResult>) => map;

test("everything met scores 100", () => {
  const { score } = scoreFrom(CRITERIA, results({ A: "met", B: "met", C: "met" }));
  assert.equal(score, 100);
});

test("nothing met scores 0", () => {
  const { score } = scoreFrom(CRITERIA, results({ A: "not_met", B: "not_met", C: "not_met" }));
  assert.equal(score, 0);
});

test("unknown counts the same as not met", () => {
  const a = scoreFrom(CRITERIA, results({ A: "met", B: "unknown", C: "unknown" }));
  const b = scoreFrom(CRITERIA, results({ A: "met", B: "not_met", C: "not_met" }));
  assert.equal(a.score, b.score);
});

test("partial is worth half the weight", () => {
  // A=5 met, B=5 partial, C=10 not met, out of 20 → (5 + 2.5) / 20 = 37.5 → 38
  const { score } = scoreFrom(CRITERIA, results({ A: "met", B: "partial", C: "not_met" }));
  assert.equal(score, 38);
});

test("a met disqualifier short-circuits, whatever else is true", () => {
  const { score, disqualifiedBy } = scoreFrom(
    CRITERIA,
    results({ A: "met", B: "met", C: "met", Agency: "met" }),
  );
  assert.equal(score, DISQUALIFIED_SCORE);
  assert.equal(score, 20);
  assert.equal(disqualifiedBy, "Agency");
});

test("a disqualifier that is not met has no effect", () => {
  const { score, disqualifiedBy } = scoreFrom(
    CRITERIA,
    results({ A: "met", B: "met", C: "met", Agency: "not_met" }),
  );
  assert.equal(score, 100);
  assert.equal(disqualifiedBy, null);
});

test("disabled criteria are excluded from the budget", () => {
  // "Off" carries weight 80 but is disabled, so it must not dilute the score
  const { score } = scoreFrom(CRITERIA, results({ A: "met", B: "met", C: "met", Off: "not_met" }));
  assert.equal(score, 100);
  assert.equal(weightBudget(CRITERIA), 20);
});

test("bands cut at 80 and 50", () => {
  assert.equal(band(100).label, "Strong fit");
  assert.equal(band(80).label, "Strong fit");
  assert.equal(band(79).label, "Possible fit");
  assert.equal(band(50).label, "Possible fit");
  assert.equal(band(49).label, "Poor fit");
  assert.equal(band(0).label, "Poor fit");
  assert.equal(band(null).label, "Not scored", "null is 'not scored', not a zero");
});

test("a disqualified lead lands in the poor band", () => {
  assert.equal(band(DISQUALIFIED_SCORE).label, "Poor fit");
});

test("ten ticks, each worth ten points", () => {
  const filled = (score: number | null) =>
    ticks(score).filter((colour) => colour !== "#dfe3e3").length;

  assert.equal(ticks(50).length, 10, "always ten segments");
  assert.equal(filled(100), 10);
  assert.equal(filled(50), 5);
  assert.equal(filled(0), 0);
  assert.equal(filled(null), 0);
  assert.equal(filled(53), 5, "rounds to the nearest segment");
  assert.equal(filled(56), 6);
});

test("the score never leaves 0–100", () => {
  for (const outcome of ["met", "partial", "not_met", "unknown"] as CriterionResult[]) {
    const { score } = scoreFrom(CRITERIA, results({ A: outcome, B: outcome, C: outcome }));
    assert.ok(score >= 0 && score <= 100, `${outcome} produced ${score}`);
    assert.equal(score, Math.round(score), "scores are integers");
  }
});
