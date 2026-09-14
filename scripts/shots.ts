/**
 * Portfolio capture. Drives the app in `mock` mode with a real browser and
 * writes retina PNGs of every screen worth showing, plus a contact sheet the
 * designer picks from.
 *
 *   npm run shots                     # boots `next dev` on :3210, captures, exits
 *   npm run shots -- --port 3400      # if :3210 is taken
 *   npm run shots -- --base <url>     # capture a server that is already up
 *   npm run shots -- --only leads     # capture the shots whose slug matches
 *
 * Nothing here spends money: mock mode never calls Apify or the model.
 */
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium, type Page } from "playwright";

const OUT = join(process.cwd(), "shots");
const VIEWPORT = { width: 1440, height: 900 };
const SCALE = 2;

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? null : (args[i + 1] ?? "");
};
const only = flag("only");
const externalBase = flag("base");
/** Not 3000 — that port is usually already answering for some other project. */
const port = Number(flag("port") ?? 3210);
const base = externalBase || `http://localhost:${port}`;

interface Shot {
  slug: string;
  title: string;
  note: string;
  /** Leaves the page on the state to capture. */
  arrange: (page: Page) => Promise<void>;
  /** Transient states can't be re-entered for a second capture. */
  viewportOnly?: boolean;
}

const settle = async (page: Page, ms = 1200) => {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(ms); // let the entrance animations land
};

const goto = (path: string) => async (page: Page) => {
  await page.goto(`${base}${path}`, { waitUntil: "domcontentloaded" });
  await settle(page);
};

const DEMO = {
  fullName: "Jordan Ellis",
  email: "jordan@northlight.io",
  phone: "+1 (415) 555-0148",
  website: "northlight.io",
  linkedin: "linkedin.com/company/northlight",
};

async function fillSubmitForm(page: Page) {
  await page.goto(`${base}/submit`, { waitUntil: "domcontentloaded" });
  await settle(page, 600);
  await page.fill("#f-name", DEMO.fullName);
  await page.fill("#f-email", DEMO.email);
  await page.fill("#f-phone", DEMO.phone);
  await page.fill("#f-site", DEMO.website);
  await page.fill("#f-li", DEMO.linkedin);
  await page.locator("h1").first().click(); // blur, so no field sits focused
}

const SHOTS: Shot[] = [
  {
    slug: "01-landing",
    title: "Landing",
    note: "Marketing page. The full capture is the whole scroll — crop any band from it.",
    arrange: goto("/"),
  },
  {
    slug: "02-submit-empty",
    title: "Submit — empty form",
    note: "The five fields an SDR fills. Good for a clean, uncluttered thumbnail.",
    arrange: goto("/submit"),
  },
  {
    slug: "03-submit-filled",
    title: "Submit — filled in",
    note: "Same form carrying real-looking data, just before the run starts.",
    arrange: fillSubmitForm,
  },
  {
    slug: "04-submit-progress",
    title: "Submit — reading the sources",
    note: "Mid-run: website read, LinkedIn in flight. The three-step progress UI.",
    viewportOnly: true,
    arrange: async (page) => {
      await fillSubmitForm(page);
      await page.getByRole("button", { name: "Score this lead" }).click();
      await page.waitForTimeout(2600); // step 1 done, step 2 active
    },
  },
  {
    slug: "05-submit-result",
    title: "Submit — score returned",
    note: "The result card: score, band, and the reason behind it.",
    viewportOnly: true,
    arrange: async (page) => {
      await fillSubmitForm(page);
      await page.getByRole("button", { name: "Score this lead" }).click();
      await page.getByRole("button", { name: "View lead" }).waitFor({ timeout: 20_000 });
      await page.waitForTimeout(1200);
    },
  },
  {
    slug: "06-leads-grid",
    title: "Leads grid",
    note: "Fourteen scored leads with filters and sort. The densest screen in the product.",
    arrange: goto("/leads"),
  },
  {
    slug: "06b-leads-private",
    title: "Leads grid — contact details hidden",
    note: "One toggle blanks name, email and phone. The screen-sharing / GDPR angle.",
    arrange: async (page) => {
      await goto("/leads")(page);
      await page.getByRole("switch", { name: "Hide contact details" }).click();
      await page.waitForTimeout(400);
    },
  },
  {
    slug: "06c-leads-filters",
    title: "Leads grid — filters open",
    note: "Score threshold, niche and status chips. Filters survive navigation to a lead and back.",
    arrange: async (page) => {
      await goto("/leads")(page);
      await page.getByRole("button", { name: /^Filters/ }).click();
      await page.getByLabel("Minimum score").fill("70");
      await page.getByRole("button", { name: "Scored", exact: true }).click();
      await page.waitForTimeout(400);
    },
  },
  {
    slug: "07-lead-strong",
    title: "Lead detail — strong fit (96)",
    note: "Best-case detail page: every criterion met, five verbatim evidence snippets.",
    arrange: goto("/leads/ld_2a57"),
  },
  {
    slug: "08-lead-needs-review",
    title: "Lead detail — needs review (53)",
    note: "A source came back unreadable, so criteria stay unknown instead of guessed.",
    arrange: goto("/leads/ld_7a62"),
  },
  {
    slug: "09-lead-disqualified",
    title: "Lead detail — disqualified (20)",
    note: "A met disqualifier short-circuits the score whatever else is true.",
    arrange: goto("/leads/ld_6b23"),
  },
  {
    slug: "10-icp",
    title: "ICP editor",
    note: "Weighted criteria with the live score preview — the rules behind every number.",
    arrange: goto("/icp"),
  },
];

async function waitForServer(url: string, timeoutMs: number) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.status < 500) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function startDevServer(): Promise<ChildProcess> {
  if (await waitForServer(base, 1000)) {
    throw new Error(
      `port ${port} is already answering — that server is probably another project. ` +
        `Pass --port <free port>, or --base <url> to capture a server you started yourself.`,
    );
  }
  console.log(`starting next dev on :${port} …`);
  const proc = spawn("npm", ["run", "dev", "--", "-p", String(port)], {
    stdio: "ignore",
    shell: true,
    env: { ...process.env, PIPELINE_MODE: "mock", NEXT_PUBLIC_PIPELINE_MODE: "mock" },
  });
  if (!(await waitForServer(base, 90_000))) {
    proc.kill();
    throw new Error(`dev server never answered on ${base}`);
  }
  return proc;
}

/** `npm run dev` sits under a shell wrapper, so killing the pid leaves next running. */
function stopDevServer(proc: ChildProcess | null) {
  if (!proc?.pid) return;
  if (process.platform === "win32") {
    // Synchronous: an async kill would not outlive the process.exit() below.
    spawnSync("taskkill", ["/pid", String(proc.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    proc.kill();
  }
}

function contactSheet(shots: Shot[]) {
  const cards = shots
    .map(
      (s, i) => `
      <figure>
        <a href="${s.slug}-${s.viewportOnly ? "viewport" : "full"}.png"><img src="${s.slug}-viewport.png" alt="${s.title}"></a>
        <figcaption>
          <span class="n">${String(i + 1).padStart(2, "0")}</span>
          <strong>${s.title}</strong>
          <p>${s.note}</p>
          <code>${s.slug}-viewport.png${s.viewportOnly ? "" : ` · ${s.slug}-full.png`}</code>
        </figcaption>
      </figure>`,
    )
    .join("");

  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CaLead — telas para portfólio</title>
<style>
  :root { color-scheme: light; --ink:#12201c; --dim:#5b6b66; --line:#e3e7e6; --teal:#1f6b5c; }
  * { box-sizing: border-box; }
  body { margin:0; padding:48px 40px 80px; background:#f7f8f8; color:var(--ink);
         font:15px/1.55 ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif; }
  header { max-width:760px; margin-bottom:40px; }
  h1 { font-size:30px; letter-spacing:-.01em; margin:0 0 10px; }
  header p { color:var(--dim); margin:0 0 6px; }
  .grid { display:grid; gap:28px; grid-template-columns:repeat(auto-fill,minmax(420px,1fr)); }
  figure { margin:0; background:#fff; border:1px solid var(--line); border-radius:10px; overflow:hidden; }
  figure img { display:block; width:100%; border-bottom:1px solid var(--line); }
  figcaption { padding:16px 18px 18px; }
  .n { font:500 12px/1 ui-monospace,SFMono-Regular,monospace; color:var(--teal); margin-right:8px; }
  figcaption strong { font-weight:600; }
  figcaption p { color:var(--dim); font-size:13.5px; margin:8px 0 10px; }
  figcaption code { font:11.5px/1.4 ui-monospace,SFMono-Regular,monospace; color:#8a9793; word-break:break-all; }
</style></head>
<body>
  <header>
    <h1>CaLead — telas para portfólio</h1>
    <p>Capturas em 2x (retina) de ${VIEWPORT.width}×${VIEWPORT.height}. Cada miniatura mostra a
      tela como ela aparece na primeira dobra; clique nela para abrir a captura da página inteira,
      de onde dá para recortar qualquer seção sem perder resolução.</p>
    <p>Dados fictícios — nenhuma empresa ou pessoa real aparece aqui.</p>
  </header>
  <div class="grid">${cards}</div>
</body></html>`;
}

async function main() {
  const shots = only ? SHOTS.filter((s) => s.slug.includes(only)) : SHOTS;
  if (!shots.length) throw new Error(`no shot matches --only ${only}`);

  const dev = externalBase ? null : await startDevServer();

  // A partial run tops up an existing capture set; a full run replaces it.
  if (!only) await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
    // The landing reveals each section on scroll, so a full-page capture would
    // photograph everything below the fold at opacity 0. globals.css already
    // shows every [data-reveal] outright under reduced motion — the same switch
    // also lands entrance animations on their final frame, in every screen.
    reducedMotion: "reduce",
  });

  try {
    for (const shot of shots) {
      const page = await context.newPage();
      await shot.arrange(page);
      // The dev-mode badge is Next's, not the product's. It has no place in a portfolio shot.
      await page.addStyleTag({ content: "nextjs-portal { display: none !important }" });
      await page.screenshot({ path: join(OUT, `${shot.slug}-viewport.png`) });
      if (!shot.viewportOnly) {
        await page.screenshot({ path: join(OUT, `${shot.slug}-full.png`), fullPage: true });
      }
      await page.close();
      console.log(`  ${shot.slug}`);
    }
    await writeFile(join(OUT, "index.html"), contactSheet(SHOTS), "utf8");
  } finally {
    await browser.close();
    stopDevServer(dev);
  }

  console.log(`\n${shots.length} shots in shots/ — open shots/index.html to pick.`);
  process.exit(0); // the dev server's child processes can outlive kill() on Windows
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
