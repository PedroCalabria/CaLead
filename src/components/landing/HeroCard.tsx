"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ScoreMeter } from "@/components/ui/ScoreMeter";
import { band } from "@/lib/scoring";

interface SampleLead {
  company: string;
  contact: string;
  score: number;
  scoredAt: string;
  reason: string;
  icebreaker: string;
  sources: [string, string];
}

/**
 * Three leads across the score range rather than three good ones — the product
 * is as much about ruling leads out as ruling them in, and a rep recognises
 * that shape immediately.
 */
const LEADS: SampleLead[] = [
  {
    company: "Northlight",
    contact: "Jordan Ellis · Head of Growth · HR tech",
    score: 90,
    scoredAt: "14:02",
    reason:
      "Mid-market SaaS with 40–60 employees, hiring 3 SDRs right now, and their site leads with a manual-process pain point the product removes.",
    icebreaker:
      "Saw you’re hiring three SDRs at once off the back of the Series A — that’s a lot of ramp happening in parallel. How are you handling lead research for the new reps before they hit quota?",
    sources: ["LinkedIn · Jobs — 3 open roles", "Website · Homepage hero"],
  },
  {
    company: "Vantia Logistics",
    contact: "Priya Raman · Operations Director · Freight",
    score: 62,
    scoredAt: "14:07",
    reason:
      "Clearly B2B and the ops team is 80 people, but nothing on the site or their LinkedIn suggests an outbound motion yet. Worth a call, not a sequence.",
    icebreaker:
      "Your tracking page mentions customers still chase status updates by email, which is a strange gap next to the rest of the platform. Is that something ops owns, or does it land on support?",
    sources: ["Website · Pricing", "LinkedIn · 80 employees"],
  },
  {
    company: "Brightpath Staffing",
    contact: "Marcus Webb · Managing Partner · Recruiting",
    score: 18,
    scoredAt: "14:11",
    reason:
      "Disqualified. Brightpath is a staffing agency, which your criteria rule out — they resell this category and churn inside two quarters.",
    icebreaker:
      "No opener written. This lead was disqualified before the icebreaker step, so nothing was generated and no time was spent on it.",
    sources: ["Website · About", "Disqualifier · Staffing agency"],
  },
];

const CYCLE_MS = 6000;
const FADE_OUT_MS = 200;
const FADE_IN_MS = 380;
/** How long the current lead is fully readable before it starts leaving. */
const HOLD_MS = CYCLE_MS - FADE_OUT_MS;

/**
 * "leaving" drifts the old lead up and out; "entering" drops the new one below
 * the line with no transition, so that "settled" can carry it back up. Without
 * that untransitioned step the content would slide in from above, against the
 * direction it just left in.
 */
type Phase = "settled" | "leaving" | "entering";

function labelFor(score: number): string {
  if (score >= 80) return "Hot";
  if (score >= 50) return "Warm";
  return "Cold";
}

/** The sample lead panel beside the hero copy. Cycles through a few leads. */
export function HeroCard() {
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState<number | null>(null);
  const [entering, setEntering] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const lead = LEADS[index];
  const phase: Phase = target !== null ? "leaving" : entering ? "entering" : "settled";

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    // deferred so the state update never runs synchronously inside the effect
    const initial = setTimeout(apply, 0);
    query.addEventListener("change", apply);
    return () => {
      clearTimeout(initial);
      query.removeEventListener("change", apply);
    };
  }, []);

  // Hold the current lead, then start it leaving.
  useEffect(() => {
    if (paused || reduced || target !== null) return;
    const hold = setTimeout(
      () => setTarget((index + 1) % LEADS.length),
      HOLD_MS,
    );
    return () => clearTimeout(hold);
  }, [index, paused, reduced, target]);

  // Once it has faded out, swap the content while nothing is visible.
  useEffect(() => {
    if (target === null) return;
    const swap = setTimeout(() => {
      setIndex(target);
      setTarget(null);
      setScore(0);
      setEntering(true);
    }, FADE_OUT_MS);
    return () => clearTimeout(swap);
  }, [target]);

  // One frame at the starting offset, then release it — this is what makes the
  // new lead rise rather than appear.
  useEffect(() => {
    if (!entering) return;
    const frame = requestAnimationFrame(() => setEntering(false));
    return () => cancelAnimationFrame(frame);
  }, [entering]);

  // Fill the meter as the card arrives, so the number counts up with it.
  useEffect(() => {
    const fill = setTimeout(() => setScore(LEADS[index].score), FADE_OUT_MS);
    return () => clearTimeout(fill);
  }, [index]);

  const show = (position: number) => {
    if (position !== index && target === null) setTarget(position);
  };

  const motion: CSSProperties =
    phase === "leaving"
      ? {
          opacity: 0,
          transform: "translateY(-6px)",
          transition: `opacity ${FADE_OUT_MS}ms var(--ease-in), transform ${FADE_OUT_MS}ms var(--ease-in)`,
        }
      : phase === "entering"
        ? { opacity: 0, transform: "translateY(10px)", transition: "none" }
        : {
            opacity: 1,
            transform: "none",
            transition: `opacity ${FADE_IN_MS}ms var(--ease-out), transform ${FADE_IN_MS}ms var(--ease-out)`,
          };

  return (
    <div
      className="overflow-hidden rounded-panel bg-surface-card shadow-dialog"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center gap-2.5 border-b border-hairline bg-surface-sunken px-4 py-3">
        <Icon name="target" size={15} color="var(--text-muted)" />
        <span className="type-label flex-1">Lead output</span>
        <span className="type-data text-faint">SCORED {lead.scoredAt}</span>
      </div>

      {/* aria-live so the cycling is announced rather than silently swapping */}
      <div
        className="flex flex-col gap-4 p-5"
        style={motion}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="type-h4 text-ink">{lead.company}</div>
            <div className="type-body-small text-muted">{lead.contact}</div>
          </div>
          <Badge
            tone="neutral"
            style={{
              background: band(lead.score).bg,
              color: band(lead.score).color,
              border: "1px solid transparent",
            }}
          >
            {labelFor(lead.score)} {lead.score}
          </Badge>
        </div>

        <ScoreMeter label="ICP fit" value={score} />

        {/* fixed minimums so a shorter lead does not shrink the card mid-cycle */}
        <p className="type-body-small text-body min-h-14">{lead.reason}</p>

        <div className="flex flex-col gap-2">
          <span className="type-label">Generated ice breaker</span>
          <p className="type-body min-h-22 rounded-card border border-blue-200 bg-surface-accent-soft p-3.5 text-ink">
            {lead.icebreaker}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {lead.sources.map((source) => (
            <Badge key={source} tone="cold" uppercase={false}>
              {source}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pb-4">
        {LEADS.map((entry, position) => (
          <button
            key={entry.company}
            type="button"
            onClick={() => show(position)}
            aria-label={`Show ${entry.company}`}
            aria-current={position === index}
            className="h-2 w-2 rounded-full border-0 p-0"
            style={{
              cursor: "pointer",
              background:
                position === index ? "var(--text-muted)" : "var(--border-default)",
              transition: "background-color var(--dur-base) var(--ease-standard)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
