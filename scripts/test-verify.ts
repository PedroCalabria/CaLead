/**
 * Tests the evidence grounding check — the guard that stops a cheap model from
 * inventing quotes. Needs no credentials.
 *
 *   npx tsx --test scripts/test-verify.ts
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { verifyQualification } from "../src/lib/agent/verify";
import { buildContext } from "../src/lib/agent/context";
import type { QualifyResult } from "../src/lib/agent/qualify";
import type { Criterion } from "../src/lib/types";

const CRITERIA: Criterion[] = [
  {
    id: "c1", name: "Sells to other businesses", type: "must_have", weight: 5,
    source: "website", enabled: true, description: "B2B pricing or case studies.",
  },
  {
    id: "c2", name: "Team size 10–200", type: "must_have", weight: 5,
    source: "linkedin", enabled: true, description: "Employee count.",
  },
  {
    id: "c3", name: "Disabled criterion", type: "nice_to_have", weight: 3,
    source: "website", enabled: false, description: "Should be ignored entirely.",
  },
];

const REAL_QUOTE = "$29 per seat / month, billed annually.";

function contextWith({ site = true, linkedin = true } = {}) {
  return buildContext(
    {
      domain: "acme.io",
      pages: site
        ? [{ url: "https://acme.io/pricing", label: "Pricing", title: "Pricing", markdown: REAL_QUOTE }]
        : [],
      unreachable: !site,
    },
    linkedin
      ? { fullName: "Dana Reed", headline: "VP Sales", role: "VP Sales", location: "Austin",
          about: "", currentCompany: "Acme", companyLinkedinUrl: null, hiring: false }
      : null,
    null,
  );
}

function judged(overrides: Partial<QualifyResult> = {}): QualifyResult {
  return {
    companyName: "Acme",
    role: "VP Sales",
    niche: "B2B SaaS",
    primaryService: "Seat-based software",
    criteriaResults: [
      { criterion: "Sells to other businesses", note: "Per-seat pricing.", result: "met" },
      { criterion: "Team size 10–200", note: "61 employees.", result: "met" },
    ],
    evidence: [],
    icpFitReason: "Fits.",
    ...overrides,
  };
}

test("keeps a snippet that appears verbatim in the source", () => {
  const { evidence, dropped } = verifyQualification(
    judged({
      evidence: [{
        source: "website", location: "Pricing", snippet: REAL_QUOTE,
        supports: ["Sells to other businesses"],
      }],
    }),
    contextWith(),
    CRITERIA,
  );

  assert.equal(evidence.length, 1);
  assert.equal(evidence[0].snippet, REAL_QUOTE);
  assert.equal(dropped.length, 0);
});

test("drops a snippet the model invented", () => {
  const { evidence, dropped } = verifyQualification(
    judged({
      evidence: [{
        source: "website", location: "Homepage",
        snippet: "Trusted by over 4,000 enterprise teams worldwide.",
        supports: ["Sells to other businesses"],
      }],
    }),
    contextWith(),
    CRITERIA,
  );

  assert.equal(evidence.length, 0);
  assert.equal(dropped.length, 1);
  assert.match(dropped[0].reason, /not found/);
});

test("tolerates smart quotes and whitespace, not changed content", () => {
  const { evidence } = verifyQualification(
    judged({
      evidence: [{
        source: "website", location: "Pricing",
        snippet: "$29 per   seat / month,\n billed annually.",
        supports: [],
      }],
    }),
    contextWith(),
    CRITERIA,
  );
  assert.equal(evidence.length, 1);
});

test("strips supports naming a criterion that does not exist", () => {
  const { evidence } = verifyQualification(
    judged({
      evidence: [{
        source: "website", location: "Pricing", snippet: REAL_QUOTE,
        supports: ["Sells to other businesses", "Invented criterion"],
      }],
    }),
    contextWith(),
    CRITERIA,
  );
  assert.deepEqual(evidence[0].supports, ["Sells to other businesses"]);
});

test("forces unknown when the criterion's source was unreachable", () => {
  const { criteriaResults } = verifyQualification(
    judged(),
    contextWith({ site: false }),
    CRITERIA,
  );

  const website = criteriaResults.find((r) => r.criterion === "Sells to other businesses");
  const linkedin = criteriaResults.find((r) => r.criterion === "Team size 10–200");

  assert.equal(website?.result, "unknown", "website was unreachable, so it cannot be 'met'");
  assert.match(website?.note ?? "", /could not be read/);
  assert.equal(linkedin?.result, "met", "linkedin was readable and should be untouched");
});

test("takes type and weight from the saved criteria, never from the model", () => {
  const { criteriaResults } = verifyQualification(judged(), contextWith(), CRITERIA);
  const outcome = criteriaResults.find((r) => r.criterion === "Team size 10–200");
  assert.equal(outcome?.type, "must_have");
  assert.equal(outcome?.weight, 5);
});

test("ignores disabled criteria and fills in ones the model skipped", () => {
  const { criteriaResults } = verifyQualification(
    judged({ criteriaResults: [] }),
    contextWith(),
    CRITERIA,
  );
  assert.equal(criteriaResults.length, 2, "the disabled criterion is not scored");
  assert.ok(criteriaResults.every((r) => r.result === "unknown"));
});
