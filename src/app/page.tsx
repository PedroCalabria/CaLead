import Link from "next/link";
import { HeroCard } from "@/components/landing/HeroCard";
import { LandingNav } from "@/components/landing/LandingNav";
import { Reveal } from "@/components/landing/Reveal";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ScoreMeter } from "@/components/ui/ScoreMeter";

const STEPS: { icon: IconName; index: string; title: string; body: string }[] = [
  {
    icon: "scan-line",
    index: "01",
    title: "Drop in a lead's website and LinkedIn",
    body: "Five fields: name, email, phone, company site, LinkedIn URL.",
  },
  {
    icon: "sliders-horizontal",
    index: "02",
    title: "CaLead scores the lead against your ICP",
    body: "Each criterion is checked against a specific page or section, and the snippet is kept.",
  },
  {
    icon: "message-square-quote",
    index: "03",
    title: "You get a fit score, the reasoning and an opener",
    body: "Written for that company, referencing something they actually said. Copy it and send.",
  },
];

const CRITERIA_PREVIEW = [
  { name: "Team size 10–200", meta: "Must have · LinkedIn and website", weight: "5" },
  { name: "Manual-process pain point", meta: "Must have · Website", weight: "4" },
  { name: "Hiring sales or SDR roles", meta: "Nice to have · LinkedIn", weight: "3" },
];

const LEADS_PREVIEW = [
  { name: "Kelp Analytics", meta: "B2B SaaS — supply chain analytics", score: 96 },
  { name: "Cadence Freight", meta: "Logistics — freight brokerage", score: 78 },
  { name: "Fernwood Studio", meta: "Agency — brand design", score: null },
  { name: "Pixelforge Collective", meta: "Agency — creative resourcing", score: 18 },
];

export default function LandingPage() {
  return (
    <div className="bg-surface-page">
      <LandingNav />

      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-surface-inverse px-5 pt-[120px] pb-7 md:px-8">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(var(--border-inverse) 1px, transparent 1px), linear-gradient(90deg, var(--border-inverse) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(120% 90% at 28% 0%, #000 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(120% 90% at 28% 0%, #000 20%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto flex w-full max-w-[var(--page-max)] flex-1 flex-col justify-center">
          <div className="grid items-center gap-4 md:grid-cols-[1.05fr_0.95fr] md:gap-[72px]">
            <Reveal className="flex flex-col gap-[26px]">
              <div className="flex">
                <Badge tone="inverse">For outbound teams</Badge>
              </div>
              <h1
                className="max-w-[17ch] text-stone-050"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--weight-medium)",
                  fontSize: "clamp(40px, 4.6vw, 56px)",
                  lineHeight: "var(--leading-display)",
                  letterSpacing: "var(--tracking-display)",
                }}
              >
                Know if a lead is worth your time, and what to say to them
              </h1>
              <p className="type-body-lead max-w-[52ch] text-stone-400">
                CaLead reads the company website and the contact&rsquo;s LinkedIn, scores
                the lead against the criteria your team defined, shows the evidence behind
                the score, and writes the opener your rep uses on the first touch.
              </p>
              <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
                <LinkButton href="/submit" variant="accent" size="lg" iconRight="arrow-up-right">
                  Qualify a lead
                </LinkButton>
                <LinkButton href="/leads" variant="outlineInverse" size="lg">
                  See a scored list
                </LinkButton>
              </div>
            </Reveal>

            <Reveal>
              <HeroCard />
            </Reveal>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[var(--page-max)] items-end justify-between gap-6 pt-10">
          <span className="type-body-small max-w-[44ch] text-stone-500">
            No card, no CRM connection. Scoring takes about five seconds per lead.
          </span>
          <a
            href="#problem"
            className="type-label hidden items-center gap-2 text-stone-400 no-underline md:flex"
          >
            Scroll
            <Icon name="arrow-down" size={16} />
          </a>
        </div>
      </section>

      {/* ---------- Problem ---------- */}
      <section
        id="problem"
        className="mx-auto max-w-[var(--page-max)] px-5 py-14 md:px-8 md:py-24"
      >
        <Reveal className="grid items-start gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
          <h2
            className="text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-medium)",
              fontSize: "var(--size-display-m)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Two hours of research, then a message that could have gone to anyone.
          </h2>
          <div className="grid max-w-[var(--prose-max)] gap-5">
            <p className="type-body-lead text-body">
              A rep opens a lead, reads the site, checks LinkedIn, guesses at fit, and moves
              on. Half the leads were never going to buy, and the ones that were got a first
              message that opened with &ldquo;I came across your company.&rdquo;
            </p>
            <p className="type-body-lead text-body">
              Both problems have the same cause: the research and the writing happen at the
              end of the day, by hand, one lead at a time.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how" className="bg-surface-inverse">
        <div className="mx-auto max-w-[var(--page-max)] px-5 py-14 md:px-8 md:py-24">
          <Reveal className="flex max-w-[52ch] flex-col gap-3">
            <span className="type-label !text-stone-500">How it works</span>
            <h2
              className="text-stone-050"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-medium)",
                fontSize: "var(--size-display-m)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Three steps, about five seconds
            </h2>
          </Reveal>

          <Reveal>
            <ol className="mt-6 grid list-none gap-4 md:mt-10 md:grid-cols-3">
              {STEPS.map((step) => (
                <li
                  key={step.index}
                  className="flex flex-col gap-3.5 rounded-[var(--radius-card)] border border-[var(--border-inverse)] bg-surface-inverse-raised p-6"
                >
                  <div className="flex items-center justify-between">
                    <Icon name={step.icon} size={22} color="var(--blue-400)" />
                    <span className="type-data text-stone-500">{step.index}</span>
                  </div>
                  <div className="type-h4 text-stone-050">{step.title}</div>
                  <p className="type-body-small text-stone-400">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------- ICP criteria ---------- */}
      <section
        id="criteria"
        className="mx-auto max-w-[var(--page-max)] px-5 py-14 md:px-8 md:py-24"
      >
        <Reveal className="grid items-start gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-14">
          <div className="flex flex-col gap-5">
            <span className="type-label">The difference</span>
            <h2
              className="text-ink"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-medium)",
                fontSize: "var(--size-display-m)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Your ICP, your rules
            </h2>
            <p className="type-body-lead max-w-[var(--prose-max)] text-body">
              A score is only useful if you set the terms. You write the criteria in your own
              words, mark each one as a must-have, a nice-to-have or a disqualifier, weight
              it, and say where to look for it.
            </p>
            <p className="type-body-lead max-w-[var(--prose-max)] text-body">
              Change a criterion and you see what it does to a real lead before you save. When
              a rep asks why a lead scored 42, the answer is a list they helped write.
            </p>
            <LinkButton
              href="/icp"
              variant="secondary"
              icon="sliders-horizontal"
              style={{ alignSelf: "flex-start" }}
            >
              Open ICP criteria
            </LinkButton>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface-card">
            <div className="flex items-center justify-between border-b border-hairline bg-surface-sunken px-5 py-3.5">
              <span className="type-label">Criteria</span>
              <span className="type-label">Weight</span>
            </div>
            {CRITERIA_PREVIEW.map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4"
              >
                <div>
                  <div className="type-ui text-ink">{row.name}</div>
                  <div className="type-body-small text-muted">{row.meta}</div>
                </div>
                <span className="type-data text-ink">{row.weight}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <div className="type-ui text-ink">Staffing or recruiting agency</div>
                <div className="type-body-small text-muted">
                  Forces a low score whatever else is met
                </div>
              </div>
              <Badge tone="critical">Disqualifier</Badge>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- What you get ---------- */}
      <section className="mx-auto max-w-[var(--page-max)] px-5 pb-14 md:px-8 md:pb-24">
        <Reveal className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-baseline">
          <h2
            className="text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-medium)",
              fontSize: "var(--size-heading-l)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            What you get
          </h2>
          <p className="type-body max-w-[46ch] text-muted">
            A list you can scan by score, and a detail view that shows where every conclusion
            came from.
          </p>
        </Reveal>

        <Reveal className="mt-6 grid gap-4 md:mt-8 md:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface-card">
            <div className="type-label border-b border-hairline bg-surface-sunken px-5 py-3.5">
              Leads
            </div>
            {LEADS_PREVIEW.map((lead, i) => (
              <div
                key={lead.name}
                className={`grid grid-cols-[1fr_132px] items-center gap-4 px-5 py-3.5 ${
                  i < LEADS_PREVIEW.length - 1 ? "border-b border-hairline" : ""
                }`}
              >
                <div>
                  <div className="type-ui text-ink">{lead.name}</div>
                  <div className="type-body-small text-muted">{lead.meta}</div>
                </div>
                {lead.score === null ? (
                  <span className="type-data text-faint">READING SOURCES</span>
                ) : (
                  <ScoreMeter value={lead.score} size="sm" />
                )}
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface-card">
            <div className="type-label border-b border-hairline bg-surface-sunken px-5 py-3.5">
              Evidence
            </div>
            <div className="grid gap-4 p-5">
              <div className="flex gap-3">
                <div className="mt-[3px]">
                  <Icon name="linkedin" size={16} color="var(--text-muted)" />
                </div>
                <div>
                  <div className="type-data text-muted">Company page — About</div>
                  <div className="type-body mt-1.5 text-ink">
                    52 employees · Software Development · San Francisco, CA
                  </div>
                  <div className="type-body-small mt-1.5 text-muted">
                    Supports: Team size 10–200
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-[3px]">
                  <Icon name="globe" size={16} color="var(--text-muted)" />
                </div>
                <div>
                  <div className="type-data text-muted">Homepage — hero</div>
                  <div className="type-body mt-1.5 text-ink">
                    Stop copy-pasting candidates between five tools.
                  </div>
                  <div className="type-body-small mt-1.5 text-muted">
                    Supports: Manual-process pain point
                  </div>
                </div>
              </div>
              <p className="type-body-small border-t border-hairline pt-4 text-muted">
                Every criterion links to the snippet that decided it, in both directions.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-surface-accent">
        <Reveal className="mx-auto flex max-w-[var(--page-max)] flex-col items-start justify-between gap-8 px-5 py-14 md:flex-row md:items-center md:px-8 md:py-[72px]">
          <div className="flex flex-col gap-2.5">
            <h2
              className="text-on-accent"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-medium)",
                fontSize: "var(--size-heading-l)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Score your first lead in about five seconds
            </h2>
            <p className="type-body-lead text-stone-800">
              Paste a website and a LinkedIn URL. Nothing to install.
            </p>
          </div>
          <LinkButton href="/submit" variant="primary" size="lg" iconRight="arrow-up-right">
            Qualify a lead
          </LinkButton>
        </Reveal>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="bg-surface-inverse">
        <div className="mx-auto flex max-w-[var(--page-max)] flex-wrap justify-between gap-10 px-5 py-14 md:px-8">
          <div className="flex max-w-[30ch] flex-col gap-2.5">
            <span
              className="text-stone-050"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-medium)",
                fontSize: 20,
                letterSpacing: "-0.035em",
              }}
            >
              CaLead
            </span>
            <span className="type-body-small text-stone-400">
              Lead qualification and ice breakers for outbound teams.
            </span>
          </div>

          <div className="grid gap-2.5">
            <span className="type-label !text-stone-500">Product</span>
            <Link href="/leads" className="type-body-small text-stone-400 no-underline">
              Leads
            </Link>
            <Link href="/submit" className="type-body-small text-stone-400 no-underline">
              Submit a lead
            </Link>
            <Link href="/icp" className="type-body-small text-stone-400 no-underline">
              ICP criteria
            </Link>
          </div>

          <div className="grid max-w-[36ch] gap-2.5">
            <span className="type-label !text-stone-500">Lead data</span>
            <span className="type-body-small text-stone-400">
              Only the five fields you submit are stored, plus the public pages read to score
              the lead. Contact details can be hidden from the interface at any time, and
              deleted on request.
            </span>
          </div>

          <div className="grid gap-2.5">
            <span className="type-label !text-stone-500">Contact</span>
            <span className="type-body-small text-stone-400">hello@calead.example</span>
            <span className="type-body-small text-stone-400">+1 (415) 555-0100</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
