# Setup — Phase 0 credentials

Three accounts, three keys. All free, none need a credit card. Budget about 15 minutes.

You only need these to run the pipeline **live**. The app runs in `mock` mode with no keys at
all, so you can skip this entirely until the first real scrape.

At the end you will have a `.env.local` that looks like this:

```
APIFY_TOKEN=apify_api_xxxxxxxxxxxxxxxxxxxx
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXX
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require
PIPELINE_MODE=live
```

`.env.local` is already covered by `.gitignore`. Never commit it.

---

## 1. Apify — the scraping token

Apify runs the three scrapers: the company website crawler and the two LinkedIn actors.

1. Sign up at **https://console.apify.com/sign-up**. No credit card.
2. Go to **https://console.apify.com/settings/integrations** (Settings → API & Integrations).
3. Copy your **Personal API token**, or create a new one. If you create one, give it a
   description like `calead-local` — Apify's own guidance is to never reuse one token across
   services, the same way you would not reuse a password.
4. Put it in `.env.local` as `APIFY_TOKEN`.

**What it costs.** The free plan includes **$5 of platform credit per month**, which resets
monthly. This project spends about **$0.017 per lead**:

| Actor | Price |
|---|---|
| `harvestapi/linkedin-profile-scraper` | $4 per 1,000 profiles |
| `harvestapi/linkedin-company` | $3 per 1,000 companies |
| `apify/website-content-crawler` | ~$0.2–5 per 1,000 pages (compute-based) |

That is roughly **290 leads a month** inside the free credit. The project needs about 40 in
total, once — after that the `scrapes` table caches every payload and re-scoring costs
nothing.

**Confirmed on a real free account:** all three actors run on the Free plan and draw from
the $5 credit. The "rented Actors: trial only" limit in Apify's pricing table applies to
*rental* actors — the ones with a monthly fee — not to the pay-per-event actors used here.

---

## 2. Google AI Studio — the model key

The qualification and icebreaker calls run on Gemini Flash.

1. Go to **https://aistudio.google.com/apikey**.
2. Sign in with a Google account and accept the Terms of Service. A default project is
   created for you.
3. Click **Create API key** and copy it.
4. Put it in `.env.local` as `GOOGLE_GENERATIVE_AI_API_KEY`.

> **Watch the variable name.** Google's own SDKs read `GEMINI_API_KEY` or `GOOGLE_API_KEY`.
> The Vercel AI SDK provider we use (`@ai-sdk/google`) reads **`GOOGLE_GENERATIVE_AI_API_KEY`**.
> Same key, different name. Using Google's name means the provider silently fails to
> authenticate.

**What it costs.** Nothing, on the free tier — no credit card. Flash-tier limits run roughly
10–15 requests per minute and 250–1,500 per day depending on the exact model. This project
makes **two calls per lead**, so a 40-lead seeding run is about 80 requests: comfortably
inside a single day's free allowance.

**Worth knowing:** Google may use free-tier prompts and responses to improve its products,
and this pipeline sends scraped LinkedIn profiles. That is fine for a portfolio project on
public data. It would need revisiting before real prospects go through it — at which point
switching to a paid provider is one line in `src/lib/agent/model.ts`.

---

## 3. Neon — the database

Postgres stores leads, ICP criteria versions, run state, and the scrape cache. Without it
nothing survives a page reload.

**Option A — through Vercel** (preferred if you plan to deploy):

1. Install the CLI: `npm i -g vercel`, then `vercel login` and `vercel link`.
2. In the Vercel dashboard, open your project → **Storage** → **Create Database** → **Neon**.
3. Run `vercel env pull .env.local`. `DATABASE_URL` is written for you, and it stays in sync
   with deployments.

**Option B — direct** (fastest if you only want it running locally):

1. Sign up at **https://console.neon.tech**. No credit card.
2. Create a project. Copy the **connection string** from the dashboard.
3. Put it in `.env.local` as `DATABASE_URL`.

**What it costs.** Nothing. The free plan is permanent, not a trial: 0.5 GB storage and 100
compute-hours per project per month, up to 100 projects. This project's data is a few
megabytes at most.

**Expect a cold start.** Free-tier compute scales to zero after 5 minutes idle, so the first
query after a pause takes a second or two to wake. That is normal, not a bug — and it is why
suspended time costs $0.

---

## Finishing up

Once the three values are in `.env.local`:

```bash
npm install
npx drizzle-kit push                       # create the tables
npx tsx scripts/try-agent.ts --live --site <domain> --li <linkedin-profile-url>
```

That first live run captures its raw Apify payloads into `fixtures/`, so every run after it
can go offline and free:

```bash
npx tsx scripts/try-agent.ts --fixtures    # no keys, no spend, real data
```

### If something fails

| Symptom | Cause |
|---|---|
| Model call rejected as unauthenticated | Key is set as `GEMINI_API_KEY` instead of `GOOGLE_GENERATIVE_AI_API_KEY` |
| Actor start refused | Free plan may block that actor — check the Start button in Apify Console |
| `429` from Gemini | Free-tier per-minute limit; wait a minute, or lower the seeding batch size |
| First DB query hangs a second | Neon waking from scale-to-zero. Expected |
| Apify run returns no items | Site blocked the crawler. The pipeline treats this as `unreadableSource`, not a crash |

### Cost ceiling

Worst case, if you ran every lead live and never used the cache, the free tiers cap you at
about 290 leads a month with no way to accidentally spend money — none of the three services
has a card on file. There is nothing to bill.
