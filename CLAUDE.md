# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

CaLead is a lead-qualification platform for SDR teams. An SDR
pastes a lead's contact details, company website, and LinkedIn URL. The system reads both
sources, scores the lead against the team's ICP criteria, shows the evidence behind the
score, and writes the icebreaker used for first contact.

`README.md` is in Portuguese and is the user-facing document. This file is the working
contract for code changes.

**Stage 1 (shipped):** the complete front end, running on mock data.
**Stage 2 (in progress):** the real scraping + qualification agent behind the mock seam.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build
npm run lint

npm test                 # grounding-check tests; no credentials needed
npm run db:push          # create/update tables from src/lib/db/schema.ts

npm run try-agent -- --fixtures                          # offline, free, real code path
npm run try-agent -- --live --site acme.io --li <url>    # one real run; captures fixtures/
npm run seed             # dry run; add --confirm to actually scrape
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · lucide-react.

Tailwind v4 has **no `tailwind.config`** — the theme is declared inline in
`src/app/globals.css` via `@theme inline`. Path alias `@/*` → `./src/*`.

Stage 2 adds: `apify-client`, `ai` (AI SDK **v7**), `@ai-sdk/google`, `zod` v4,
`drizzle-orm` + `drizzle-kit`, `@neondatabase/serverless`, `@vercel/functions`, `tsx`.

## The five rules

**1. The LLM judges; it never does arithmetic.**
The model returns `met` / `partial` / `not_met` / `unknown` per criterion. The number comes
from `scoreFrom()` in `src/lib/scoring.ts` — the same function the `/icp` page uses for its
live preview, so the preview and the real score cannot diverge. Never ask a model for a
score, a weight, or a total.

**2. Evidence is verbatim, and verified in code.**
`evidence[].snippet` must be copied character-for-character from the scraped text. After
every model call, `src/lib/agent/verify.ts` string-matches each snippet against its source
and drops what doesn't appear. A criterion whose source was unreachable is `unknown` — never
inferred. This is what separates evidence from plausible fiction, and it matters more because
we run a cheap model.

**3. The public demo never spends money.** `PIPELINE_MODE` gates everything:

| Mode | Behaviour | Cost |
|---|---|---|
| `mock` (default) | The Stage-1 simulator in `src/lib/mock-api.simulated.ts`. No keys needed. | $0 |
| `replay` | Real LLM, but scrapes are read from `fixtures/` instead of calling Apify. | LLM only |
| `live` | Full pipeline: three Apify actors + two model calls. | ~$0.017 Apify |

`PIPELINE_MODE` is server-side; the browser reads `NEXT_PUBLIC_PIPELINE_MODE` via
`src/lib/client-mode.ts`. **Both must be set to the same value** — the client one decides
whether the UI calls the API at all.

Re-scoring is separate and always free: `POST /api/leads/[id]/rescore` re-judges from the
`scrapes` table and never calls Apify, in any mode.

Never make `live` the deployed default, and never remove the `mock` path.

**4. `src/styles/tokens.css` is generated — never hand-edit it.**
It is a literal copy of the Claude Design tokens in
`design/project/_ds/calead-design-system-*/tokens/`. Change values in Claude Design and
re-sync. `globals.css` imports it in `layer(base)` and re-exposes it to Tailwind.

**5. No emoji. Anywhere.**
The design system is explicit: "Emoji: never. Not in product, not in marketing, not in empty
states. Icons carry that load." No unicode glyphs as icons either — the only exceptions are
`·` as a text separator and `−` for negative deltas. Use lucide-react.

## Architecture

```
src/
  app/
    page.tsx              landing (server component)
    (app)/                product screens, shared topbar — all "use client"
      submit/  leads/  leads/[id]/  icp/
    api/
      leads/route.ts              POST create+start · GET list
      leads/[id]/route.ts         GET status — the polling target
      leads/[id]/rescore/route.ts POST re-score from cached scrapes
      icp/route.ts                GET · PUT (writes a new version)
  lib/
    types.ts              domain contract — the source of truth for all shapes
    scoring.ts            band(), ticks(), weightBudget(), scoreFrom()
    validation.ts         the 5 form fields
    leads.ts              grid filter + sort
    mock-api.ts           runScoring() — POSTs and polls the real API
    mock-api.simulated.ts the Stage-1 setTimeout simulator, kept for `mock` mode
    client-mode.ts        isMockMode() — the browser half of PIPELINE_MODE
    agent/
      model.ts            THE one place the LLM provider is named
      apify.ts            runActor() wrapper — token, timeouts, retry, fixture capture
      scrape-website.ts   apify/website-content-crawler
      scrape-linkedin.ts  harvestapi/linkedin-profile-scraper + harvestapi/linkedin-company
      context.ts          ScrapedContext — normalises + truncates raw payloads
      qualify.ts          generateObject #1 — criteria judgments + evidence
      icebreaker.ts       generateObject #2 — the outreach line
      verify.ts           evidence grounding check (rule 2)
      pipeline.ts         runQualification() — orchestrator, deliberately DB-free
      run.ts              DB-backed wrappers: runPipelineForLead(), rescoreLead()
      background.ts       waitUntil() with a local fallback
    db/
      schema.ts index.ts queries.ts
  state/store.tsx         single React Context across screens
  styles/tokens.css       generated — do not edit
scripts/
  try-agent.ts          one run, printed; --fixtures for offline
  seed.ts               populate the demo; --confirm to spend
  test-verify.ts        grounding-check tests (npm test)
design/                   Claude Design handoff bundle (prototype + design system)
fixtures/                 real Apify payloads captured on first live run (gitignored)
```

### Data flow

`POST /api/leads` validates, inserts `leads` + `lead_runs`, fires `waitUntil(runPipeline)`,
and returns a `leadId` immediately. The client polls `GET /api/leads/[id]`, which returns the
`stages` array driving the three-step progress UI. Website crawl and LinkedIn person scrape
run in parallel; the company scrape depends on the person result.

The UI has **three** steps (`site`, `li`, `score`) but the pipeline has four stages — both
LinkedIn scrapes report into `li`. Don't add a fourth step.

## Domain gotchas

- **Scores are 0–100 everywhere** — app, landing, and design system now agree. `scoreFrom`
  returns `Math.round(100 * earned / total)`, `band()` cuts at ≥80 Strong / ≥50 Possible,
  and `ticks()` renders ten segments worth ten points each. A met disqualifier forces
  `DISQUALIFIED_SCORE` (20). `null` means "not scored" and is distinct from `0`.
  Migrated from 1–10 in Aug 2026; `scripts/migrate-scores.ts` recomputes stored leads from
  their saved `criteriaResults` and is idempotent.
- **`scoreFrom` keys results by `criterion.name`, not `id`.** The model returns criterion
  names, and they must match the saved criteria exactly. `verify.ts` drops mismatches; if
  scores look wrong, check name drift first.
- **A met disqualifier short-circuits to score 2**, whatever else is true.
- **`weightBudget` excludes disqualifiers** — they have `weight: null`.
- **LinkedIn URLs may be `/in/` or `/company/`.** `validation.ts` accepts both. The pipeline
  branches: a company URL skips the person scrape and leaves person-dependent criteria
  `unknown`. Do not tighten validation to `/in/` only — it would regress a shipped form.
- **`unreadableSource` drives the `needs_review` status**, together with any enabled
  `must_have` left `unknown`.
- Filters survive navigation to the detail page and back — that is why the back button reads
  "filters kept". Don't reset them.

## The harvestapi payload shapes

Confirmed against real captured payloads (`npm test` guards these):

| What you want | Where it actually is |
|---|---|
| Job title | `currentPosition[0].position` — `currentPosition` is an **array**, and the field is `position`, not `title` |
| Employer's LinkedIn page | `currentPosition[0].companyLinkedinUrl` — without it the company scrape never runs |
| Work history | `experience[]`, not `positions[]` |
| Person's location | `location.linkedinText` — an object, not a string |
| Headcount band | `employeeCountRange: { start, end }` — an object |
| Founding year | `foundedOn: { year, month, day }` — an object |
| HQ | the entry in `locations[]` with `headquarter: true` |

Every one of these was guessed wrong before the first live run. Re-check them against
`fixtures/` whenever an actor is upgraded.

## Working with the model

`src/lib/agent/model.ts` is the only file naming a provider. Currently Google Gemini Flash on
the free tier; switching to Claude via Vercel AI Gateway is a one-line change there.

Because the model is cheap, the schemas compensate:

- Put `note` **before** `result` in `criteriaResults` so the model states its reasoning before
  committing to a verdict. Field order in the schema is not cosmetic.
- Keep Zod schemas flat — enums, strings, arrays of flat objects. Gemini's `responseSchema`
  handles unions and `$ref` poorly.
- Inline each criterion's full `description` in the prompt; the name alone is not enough
  context.
- Qualification and icebreaker are **two separate calls**, so tone and length constraints
  don't compete with the analytical task.

## Environment

```
APIFY_TOKEN                     Apify free plan — $5/mo credit
GOOGLE_GENERATIVE_AI_API_KEY    Google AI Studio, free tier, no credit card
DATABASE_URL                    Neon Postgres (free tier)
PIPELINE_MODE                   mock | replay | live   (default: mock)
NEXT_PUBLIC_PIPELINE_MODE       must match PIPELINE_MODE
LLM_MODEL                       optional override, default gemini-3.6-flash
CAPTURE_FIXTURES                set to 1 to write fixtures/ on a live run
```

`mock` mode needs none of these. See `SETUP.md` for how to obtain each one.

Watch the model key's name: Google's own SDKs read `GEMINI_API_KEY`, but `@ai-sdk/google`
reads `GOOGLE_GENERATIVE_AI_API_KEY`. Same key, different variable.

## Known constraints

- Gemini's free tier may use submitted data to improve Google's products, and the pipeline
  sends scraped personal LinkedIn profiles. Acceptable for a portfolio project on public data;
  revisit before real prospect data goes through it.
- Scraping LinkedIn is against its terms regardless of method, cookies or not.
- Apify's synchronous endpoint caps at 300s and returns 408 past it. We use async start plus
  polling inside our own `waitUntil` task so a slow crawl degrades instead of failing.
- `src/components/landing/Reveal.tsx` has a pre-existing `react-hooks/set-state-in-effect`
  lint error from Stage 1. It is unrelated to the agent; `npm run lint` is otherwise clean.
- **"Hiring sales or SDR roles" cannot currently be verified.** `harvestapi/linkedin-company`
  returns a `jobSearchUrl` but no actual job listings, so that criterion always lands
  `unknown`. Verifying it needs a fourth actor (`harvestapi/linkedin-job-search`). Until then
  it costs weight and returns nothing — consider disabling it in the ICP editor.
- Free-tier Gemini Flash is non-deterministic on a rerun: identical input can produce a
  different `niche` wording or a dropped `role`. Anything we scraped directly is a fact and
  must beat the model's version of it — see `firstReal()` in `pipeline.ts`. The model also
  returns "—" as a sentinel for "unknown", which is truthy; never use `||` against it.
