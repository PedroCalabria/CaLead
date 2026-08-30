// Assembles what the model sees. Raw actor payloads run to hundreds of KB;
// this layer keeps the signal-bearing fields, budgets the markdown, and gives
// every page a stable label the model can cite back as `evidence.location`.
import type { CompanyScrape, PersonScrape } from "./scrape-linkedin";
import type { WebsiteScrape } from "./scrape-website";

const PER_PAGE_CHARS = 2500;
const TOTAL_CHARS = 24000;

export interface ScrapedContext {
  website: WebsiteScrape;
  person: PersonScrape | null;
  company: CompanyScrape | null;
}

/** Collapse crawler whitespace and image/link noise so the budget buys prose. */
function tidy(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function buildContext(
  website: WebsiteScrape,
  person: PersonScrape | null,
  company: CompanyScrape | null,
): ScrapedContext {
  let budget = TOTAL_CHARS;
  const pages = [];

  for (const page of website.pages) {
    if (budget <= 0) break;
    const text = tidy(page.markdown).slice(0, Math.min(PER_PAGE_CHARS, budget));
    if (!text) continue;
    budget -= text.length;
    pages.push({ ...page, markdown: text });
  }

  return { website: { ...website, pages }, person, company };
}

/**
 * The exact text the model is shown. verify.ts matches snippets against this
 * same string, so the two must be built from one place.
 */
export function renderContext(context: ScrapedContext): string {
  const parts: string[] = [];

  parts.push(`## Company website (${context.website.domain})`);
  if (context.website.unreachable || !context.website.pages.length) {
    parts.push("UNREACHABLE — the site could not be read. Treat website-sourced criteria as unknown.");
  } else {
    for (const page of context.website.pages) {
      parts.push(`### ${page.label}\n(${page.url})\n${page.markdown}`);
    }
  }

  parts.push("\n## LinkedIn — person");
  if (!context.person) {
    parts.push("UNREACHABLE — the profile could not be read. Treat person-sourced criteria as unknown.");
  } else {
    const p = context.person;
    parts.push(
      [
        `Name: ${p.fullName || "—"}`,
        `Headline: ${p.headline || "—"}`,
        `Current role: ${p.role || "—"}`,
        `Current company: ${p.currentCompany || "—"}`,
        `Location: ${p.location || "—"}`,
        p.hiring ? "Profile carries LinkedIn's \"hiring\" badge." : "",
        p.about ? `About: ${p.about.slice(0, 1200)}` : "",
      ].filter(Boolean).join("\n"),
    );
  }

  parts.push("\n## LinkedIn — company");
  if (!context.company) {
    parts.push("UNREACHABLE — the company page could not be read. Treat company-sourced criteria as unknown.");
  } else {
    const c = context.company;
    parts.push(
      [
        `Name: ${c.name || "—"}`,
        `Employee count: ${c.employeeCount ?? "unknown"}`,
        `Employee range: ${c.employeeRange || "unknown"}`,
        `Industries: ${c.industries.join(", ") || "—"}`,
        `Specialties: ${c.specialties.join(", ") || "—"}`,
        `Founded: ${c.founded || "—"}`,
        `Headquarters: ${c.hq || "—"}`,
        `Followers: ${c.followers ?? "—"}`,
        c.description ? `Description: ${c.description.slice(0, 1200)}` : "",
      ].filter(Boolean).join("\n"),
    );
  }

  return parts.join("\n\n");
}

/** Which sources actually produced text, for status derivation. */
export function readableSources(context: ScrapedContext): {
  website: boolean;
  linkedin: boolean;
} {
  return {
    website: !context.website.unreachable && context.website.pages.length > 0,
    linkedin: Boolean(context.person || context.company),
  };
}
