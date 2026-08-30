# fixtures/

Raw Apify payloads, captured on the first live run and committed so the pipeline
can be developed and tested offline.

- `website.json` — apify/website-content-crawler
- `linkedin-person.json` — harvestapi/linkedin-profile-scraper
- `linkedin-company.json` — harvestapi/linkedin-company

Capture them by running once against a real lead:

```bash
npx tsx scripts/try-agent.ts --live --site acme.io --li https://linkedin.com/in/someone
```

Then everything after that is free:

```bash
npx tsx scripts/try-agent.ts --fixtures
```

These are real scrapes of real public pages. Check what a payload contains before
committing it — the LinkedIn ones hold a real person's profile data.

Nothing is fabricated here. An absent fixture makes the run fail with a clear
message rather than silently substituting invented data.
