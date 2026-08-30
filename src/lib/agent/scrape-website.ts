// apify/website-content-crawler — the company's own site.
import { runActor } from "./apify";
import { domainOf } from "../format";

export const WEBSITE_ACTOR = "apify/website-content-crawler";

export interface WebsitePage {
  url: string;
  /** Human label the model cites as `evidence.location`, e.g. "Pricing". */
  label: string;
  title: string;
  markdown: string;
}

export interface WebsiteScrape {
  domain: string;
  pages: WebsitePage[];
  unreachable: boolean;
  error?: string;
}

interface CrawlerItem {
  url?: string;
  markdown?: string;
  text?: string;
  metadata?: { title?: string; description?: string };
}

/** The pages that actually carry ICP signal, in the order we prefer to keep them. */
const PRIORITY = [
  "",
  "pricing",
  "about",
  "customers",
  "solutions",
  "product",
  "platform",
  "careers",
  "jobs",
];

function labelFor(url: string, title: string): string {
  let path = "";
  try {
    path = new URL(url).pathname.replace(/^\/|\/$/g, "");
  } catch {
    path = "";
  }
  if (!path) return "Homepage";
  const segment = path.split("/")[0];
  const pretty = segment.replace(/[-_]/g, " ").replace(/^./, (c) => c.toUpperCase());
  // Prefer the crawler's own title when it says more than the slug does.
  return title && title.length > pretty.length + 4 ? `${pretty} — ${title}` : pretty;
}

function rank(url: string): number {
  let path = "";
  try {
    path = new URL(url).pathname.replace(/^\/|\/$/g, "").split("/")[0].toLowerCase();
  } catch {
    return PRIORITY.length;
  }
  const index = PRIORITY.indexOf(path);
  return index === -1 ? PRIORITY.length : index;
}

export async function scrapeWebsite(
  website: string,
  options: { useFixtures?: boolean; maxPages?: number } = {},
): Promise<{ scrape: WebsiteScrape; raw: unknown; runId: string | null }> {
  const { useFixtures = false, maxPages = 12 } = options;
  const domain = domainOf(website);

  const result = await runActor<CrawlerItem>(
    WEBSITE_ACTOR,
    {
      startUrls: [{ url: website }],
      crawlerType: "playwright:adaptive",
      maxCrawlPages: maxPages,
      maxCrawlDepth: 2,
      saveMarkdown: true,
      saveHtml: false,
      htmlTransformer: "readableText",
      removeElementsCssSelector:
        "nav, footer, script, style, noscript, svg, header nav, [role=navigation], .cookie, #cookie",
      excludeUrlGlobs: [
        { glob: "**/blog/**" },
        { glob: "**/*.pdf" },
        { glob: "**/legal/**" },
        { glob: "**/privacy*" },
        { glob: "**/terms*" },
      ],
    },
    { fixture: "website", timeoutSecs: 240, useFixtures },
  );

  if (!result.ok) {
    return {
      scrape: { domain, pages: [], unreachable: true, error: result.error },
      raw: null,
      runId: result.runId,
    };
  }

  const pages = result.items
    .filter((item) => item.url && (item.markdown || item.text))
    .map((item) => {
      const url = item.url as string;
      const title = item.metadata?.title ?? "";
      return {
        url,
        label: labelFor(url, title),
        title,
        markdown: (item.markdown ?? item.text ?? "").trim(),
      };
    })
    .sort((a, b) => rank(a.url) - rank(b.url));

  return {
    scrape: { domain, pages, unreachable: pages.length === 0 },
    raw: result.items,
    runId: result.runId,
  };
}
