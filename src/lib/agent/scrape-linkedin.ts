// harvestapi/linkedin-profile-scraper (the person) and harvestapi/linkedin-company
// (their employer). The company page is where headcount and hiring signals live,
// so a person-only scrape cannot verify the firmographic criteria on its own.
//
// The normalisers below read defensively: harvest payloads vary by profile, and
// the first live run writes fixtures/ so the real shape can be checked.
import { runActor } from "./apify";

export const PERSON_ACTOR = "harvestapi/linkedin-profile-scraper";
export const COMPANY_ACTOR = "harvestapi/linkedin-company";

export interface PersonScrape {
  fullName: string;
  headline: string;
  role: string;
  location: string;
  about: string;
  currentCompany: string;
  companyLinkedinUrl: string | null;
  hiring: boolean;
}

export interface CompanyScrape {
  name: string;
  employeeCount: number | null;
  employeeRange: string;
  industries: string[];
  specialties: string[];
  description: string;
  founded: string;
  hq: string;
  website: string;
  followers: number | null;
}

type Loose = Record<string, unknown>;

function str(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function num(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9]/g, ""));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}

/** Some fields arrive as objects with the display string nested inside. */
function place(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object") {
    const o = value as Loose;
    return (
      str(o.linkedinText) ||
      str((o.parsed as Loose)?.text) ||
      [str((o.parsed as Loose)?.city), str((o.parsed as Loose)?.country)]
        .filter(Boolean)
        .join(", ")
    );
  }
  return "";
}

/** employeeCountRange arrives as { start, end }, not a label. */
function range(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object") {
    const o = value as Loose;
    const start = num(o.start);
    const end = num(o.end);
    if (start && end) return `${start}–${end}`;
    if (start) return `${start}+`;
  }
  return "";
}

/** foundedOn arrives as { year, month, day } with nulls. */
function year(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  if (value && typeof value === "object") {
    const y = num((value as Loose).year);
    if (y) return String(y);
  }
  return "";
}

/** First non-empty string among several candidate field names. */
function pick(source: Loose, ...keys: string[]): string {
  for (const key of keys) {
    const value = str(source[key]);
    if (value) return value;
  }
  return "";
}

function list(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) =>
      typeof entry === "string" ? entry : str((entry as Loose)?.name),
    )
    .filter(Boolean);
}

export function normalisePerson(item: Loose): PersonScrape {
  // harvestapi returns `experience` (not `positions`), and `currentPosition`
  // is an ARRAY — reading it as an object silently yields undefined for every
  // field, which is exactly what happened on the first live run.
  const history = Array.isArray(item.experience)
    ? (item.experience as Loose[])
    : Array.isArray(item.positions)
      ? (item.positions as Loose[])
      : [];

  const currentList = Array.isArray(item.currentPosition)
    ? (item.currentPosition as Loose[])
    : item.currentPosition
      ? [item.currentPosition as Loose]
      : [];

  const current = currentList[0] ?? history[0] ?? {};
  const company = (current.company as Loose) ?? {};

  const first = pick(item, "firstName");
  const last = pick(item, "lastName");

  return {
    fullName: pick(item, "name", "fullName") || [first, last].filter(Boolean).join(" "),
    headline: pick(item, "headline", "subtitle"),
    // the field is `position`; `title` is kept as a fallback for other actors
    role: pick(current, "position", "title", "role"),
    location: place(item.location ?? item.locationName ?? item.geo),
    about: pick(item, "about", "summary", "description"),
    currentCompany:
      pick(current, "companyName", "company") ||
      pick(company, "name", "universalName"),
    companyLinkedinUrl:
      pick(current, "companyLinkedinUrl", "companyUrl") ||
      pick(company, "linkedinUrl", "url", "link") ||
      null,
    /** LinkedIn's "I'm hiring" badge — a direct signal for hiring criteria. */
    hiring: item.hiring === true,
  };
}

export function normaliseCompany(item: Loose): CompanyScrape {
  const locations = Array.isArray(item.locations) ? (item.locations as Loose[]) : [];
  const hq =
    (item.headquarter as Loose) ??
    locations.find((entry) => entry.headquarter === true || entry.isHeadquarter === true) ??
    locations[0] ??
    {};

  return {
    name: pick(item, "name", "universalName", "companyName"),
    employeeCount: num(item.employeeCount ?? item.employeesCount ?? item.staffCount),
    employeeRange: range(item.employeeCountRange ?? item.companySize ?? item.staffCountRange),
    industries: list(item.industries ?? item.industry),
    specialties: list(item.specialities ?? item.specialties),
    description: pick(item, "description", "about", "tagline"),
    founded: year(item.foundedOn ?? item.founded ?? item.foundedYear),
    hq: [pick(hq, "city"), pick(hq, "country", "countryCode")].filter(Boolean).join(", "),
    website: pick(item, "website", "websiteUrl"),
    followers: num(item.followerCount ?? item.followers),
  };
}

export function isPersonUrl(url: string): boolean {
  return /linkedin\.com\/in\//i.test(url);
}

export async function scrapePerson(
  profileUrl: string,
  options: { useFixtures?: boolean } = {},
): Promise<{ person: PersonScrape | null; raw: unknown; runId: string | null; error?: string }> {
  const result = await runActor<Loose>(
    PERSON_ACTOR,
    {
      queries: [profileUrl],
      profileScraperMode: "Profile details no email ($4 per 1k)",
    },
    { fixture: "linkedin-person", timeoutSecs: 180, useFixtures: options.useFixtures },
  );

  if (!result.ok) return { person: null, raw: null, runId: result.runId, error: result.error };
  return {
    person: normalisePerson(result.items[0]),
    raw: result.items,
    runId: result.runId,
  };
}

export async function scrapeCompany(
  target: { companyUrl?: string | null; searchName?: string | null },
  options: { useFixtures?: boolean } = {},
): Promise<{ company: CompanyScrape | null; raw: unknown; runId: string | null; error?: string }> {
  // Prefer the exact page off the person's current position; fall back to a
  // name search only when we could not derive a URL.
  const input = target.companyUrl
    ? { companies: [target.companyUrl] }
    : target.searchName
      ? { searches: [target.searchName] }
      : null;

  if (!input) {
    return { company: null, raw: null, runId: null, error: "No company URL or name to look up" };
  }

  const result = await runActor<Loose>(COMPANY_ACTOR, input, {
    fixture: "linkedin-company",
    timeoutSecs: 180,
    useFixtures: options.useFixtures,
  });

  if (!result.ok) return { company: null, raw: null, runId: result.runId, error: result.error };
  return {
    company: normaliseCompany(result.items[0]),
    raw: result.items,
    runId: result.runId,
  };
}
