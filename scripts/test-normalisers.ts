/**
 * Runs the harvestapi normalisers against the real captured payloads.
 *
 * These were written before any real payload existed and every one of the
 * guesses below was wrong on the first live run — `currentPosition` is an array,
 * the title field is `position`, and `location`, `employeeCountRange` and
 * `foundedOn` all arrive as objects. This test is what stops that regressing.
 *
 * Fixtures hold real personal data and are gitignored, so the suite skips
 * rather than fails when they are absent.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { normaliseCompany, normalisePerson } from "../src/lib/agent/scrape-linkedin";

const read = (name: string): Record<string, unknown>[] | null => {
  const path = `fixtures/${name}.json`;
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null;
};

const person = read("linkedin-person");
const company = read("linkedin-company");

test("person normaliser fills every field from a real payload", { skip: !person }, () => {
  const p = normalisePerson(person![0]);
  for (const field of ["fullName", "headline", "role", "location", "currentCompany"] as const) {
    assert.ok(p[field], `${field} is empty — the payload shape probably changed`);
  }
  assert.match(
    p.companyLinkedinUrl ?? "",
    /linkedin\.com\/company\//,
    "companyLinkedinUrl must resolve, or the company scrape never runs",
  );
  assert.equal(typeof p.hiring, "boolean");
});

test("company normaliser fills every field from a real payload", { skip: !company }, () => {
  const c = normaliseCompany(company![0]);
  for (const field of ["name", "description", "hq", "founded", "employeeRange"] as const) {
    assert.ok(c[field], `${field} is empty — the payload shape probably changed`);
  }
  assert.ok(typeof c.employeeCount === "number" && c.employeeCount > 0, "employeeCount must be a number");
  assert.ok(c.industries.length > 0);
  assert.ok(c.specialties.length > 0);
});

test("nested objects are flattened to display strings, not '[object Object]'", { skip: !person || !company }, () => {
  const p = normalisePerson(person![0]);
  const c = normaliseCompany(company![0]);
  for (const value of [p.location, c.employeeRange, c.founded, c.hq]) {
    assert.doesNotMatch(value, /\[object/, "an object leaked through as a string");
  }
  assert.match(c.employeeRange, /^\d+(\u2013\d+|\+)$/, "employeeRange should read like 201–500");
  assert.match(c.founded, /^\d{4}$/, "founded should be a four-digit year");
});

test("a payload missing everything degrades to empty, not a crash", () => {
  const p = normalisePerson({});
  const c = normaliseCompany({});
  assert.equal(p.role, "");
  assert.equal(p.companyLinkedinUrl, null);
  assert.equal(c.employeeCount, null);
  assert.deepEqual(c.industries, []);
});
