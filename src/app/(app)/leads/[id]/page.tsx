"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ScoreTicks } from "@/components/ui/ScoreTicks";
import { StatusPill } from "@/components/ui/StatusPill";
import { useIsMobile } from "@/hooks/useIsMobile";
import { copyToClipboard, domainOf, formatDate, formatTime } from "@/lib/format";
import { RESULT_LABEL, TYPE_LABEL, band } from "@/lib/scoring";
import { useStore } from "@/state/store";

export default function LeadDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isMobile = useIsMobile();
  const {
    leads,
    hidden,
    filtersActive,
    guidance,
    copied,
    markCopied,
    showToast,
  } = useStore();

  const [activeCriterion, setActiveCriterion] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const busyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (busyTimer.current) clearTimeout(busyTimer.current); }, []);

  const lead = leads.find((l) => l.id === params.id);

  if (!lead) {
    return (
      <main className="mx-auto max-w-[1280px] px-5 pt-5 pb-[90px] md:px-6">
        <button
          type="button"
          onClick={() => router.push("/leads")}
          className="cursor-pointer border-0 bg-transparent p-0 text-[13px] text-[var(--app-teal)]"
        >
          ← Back to leads
        </button>
        <div className="mt-4 rounded-lg border border-[var(--app-line)] bg-white p-7">
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>
            That lead is no longer in the list
          </div>
          <p className="mt-2.5 max-w-[52ch] text-[var(--app-dim)]">
            It may have been submitted in another session. Open the leads list to pick a
            different one.
          </p>
        </div>
      </main>
    );
  }

  const b = band(lead.icpFitScore);
  const processing = lead.status === "processing";
  const evidence = lead.evidence ?? [];
  const totalWeight =
    (lead.criteriaResults ?? [])
      .filter((c) => c.type !== "disqualifier")
      .reduce((sum, c) => sum + (c.weight ?? 0), 0) || 1;

  const isCopied = copied === `detail-${lead.id}`;

  const rescore = () => {
    setBusy(true);
    busyTimer.current = setTimeout(() => {
      setBusy(false);
      showToast("Lead re-scored — no change to the fit score");
    }, 2600);
  };

  const gridStyle = isMobile
    ? { display: "grid", gap: 16, gridTemplateColumns: "1fr", gridTemplateAreas: '"score" "ice" "crit" "ev" "meta"' }
    : {
        display: "grid",
        gap: 16,
        gridTemplateColumns: "minmax(320px, 0.85fr) 1.15fr",
        gridTemplateAreas: '"score ice" "crit ev" "crit meta"',
      };

  const partialNotice = lead.unreadableSource
    ? lead.unreadableSource === "linkedin"
      ? `We couldn’t reach the LinkedIn page for ${lead.companyName}. Check the URL or re-score — everything the website supports was scored normally.`
      : `We couldn’t reach ${domainOf(lead.companyWebsite)}. Check the URL or re-score — the LinkedIn evidence was scored normally.`
    : null;

  return (
    <main className="mx-auto max-w-[1280px] px-5 pt-5 pb-[90px] md:px-6">
      <button
        type="button"
        onClick={() => router.push("/leads")}
        className="cursor-pointer border-0 bg-transparent p-0 text-[13px] text-[var(--app-teal)]"
      >
        ← {filtersActive ? "Back to leads (filters kept)" : "Back to leads"}
      </button>

      <div className="mt-3.5 flex flex-col items-start justify-between gap-4 md:flex-row">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            {!hidden.fullName ? (
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 32,
                  letterSpacing: "-0.01em",
                }}
              >
                {lead.fullName}
              </h1>
            ) : null}
            <StatusPill status={lead.status} />
          </div>
          <div className="mt-1.5 text-[var(--app-dim)]">
            {lead.companyName} · {lead.role} · {lead.niche}
          </div>
          <div className="mt-3 flex flex-wrap gap-3.5 font-mono text-xs">
            <a href={lead.companyWebsite} target="_blank" rel="noreferrer">
              {domainOf(lead.companyWebsite)} ↗
            </a>
            <a href={lead.linkedinUrl} target="_blank" rel="noreferrer">
              {domainOf(lead.linkedinUrl)} ↗
            </a>
            {!hidden.email ? <span className="text-[var(--app-dim)]">{lead.email}</span> : null}
            {!hidden.phone ? <span className="text-[var(--app-dim)]">{lead.phone}</span> : null}
          </div>
        </div>

        <button
          type="button"
          onClick={rescore}
          disabled={busy}
          className="h-[38px] flex-none cursor-pointer rounded border border-[#cfd4d4] bg-white px-3.5 font-medium"
        >
          {busy ? "Re-scoring…" : "Re-score lead"}
        </button>
      </div>

      {partialNotice ? (
        <div
          role="alert"
          className="mt-4 rounded border border-[#ecdfc4] border-l-[3px] border-l-[#9a6410] bg-[#fdf7ec] px-3.5 py-3 text-[13px] text-[#7a5210]"
        >
          {partialNotice}
        </div>
      ) : null}

      {processing ? (
        <ProcessingPanel />
      ) : (
        <div style={gridStyle} className="mt-4">
          {/* ---------- Score ---------- */}
          <section
            style={{ gridArea: "score" }}
            className="rounded-lg border border-[var(--app-line)] bg-white p-[22px]"
          >
            <div className="type-label !text-[var(--app-faint)]">ICP fit score</div>
            <div className="mt-4 flex items-end gap-[18px]">
              <div
                className="tabular"
                style={{
                  font: "500 72px/0.85 var(--font-mono)",
                  letterSpacing: "-0.03em",
                  color: b.color,
                }}
              >
                {lead.icpFitScore}
                <span className="text-[20px] text-[var(--app-faint)]">/10</span>
              </div>
              <ScoreTicks score={lead.icpFitScore} width={6} height={56} gap={3} />
            </div>
            <div className="mt-3 font-medium" style={{ color: b.color }}>
              {b.label}
            </div>
            <p className="mt-2.5 text-[#3c464a]">{lead.icpFitReason}</p>
          </section>

          {/* ---------- Icebreaker ---------- */}
          <section
            style={{ gridArea: "ice" }}
            className="rounded-lg border border-[var(--app-line)] bg-white p-[22px]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="type-label !text-[var(--app-faint)]">Personalised icebreaker</div>
              <div style={{ font: "400 11px/1 var(--font-mono)", color: "var(--app-faint)" }}>
                {(lead.icebreaker ?? "").length} characters
              </div>
            </div>
            <div className="mt-3.5 rounded-[8px_8px_8px_2px] border border-[#e8eaea] bg-[#f7f8f8] px-5 py-[18px] text-base leading-[1.55]">
              {lead.icebreaker}
            </div>
            <div className="mt-4 flex flex-col items-start gap-3 md:flex-row md:items-center">
              <button
                type="button"
                onClick={async () => {
                  await copyToClipboard(lead.icebreaker ?? "");
                  markCopied(`detail-${lead.id}`);
                  showToast("Icebreaker copied");
                }}
                style={{
                  height: 44,
                  padding: "0 20px",
                  background: isCopied ? "#2c6a4c" : "var(--app-teal)",
                  color: "#fff",
                  border: 0,
                  borderRadius: 4,
                  fontWeight: 500,
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                {isCopied ? "Icebreaker copied" : "Copy icebreaker"}
              </button>
              <span className="text-xs text-[var(--app-faint)]">
                Tone: {guidance.tone} · max {guidance.maxLength} characters
              </span>
            </div>
          </section>

          {/* ---------- Criteria ---------- */}
          <section
            style={{ gridArea: "crit" }}
            className="overflow-hidden rounded-lg border border-[var(--app-line)] bg-white"
          >
            <div className="border-b border-[#eceeee] px-[18px] py-4">
              <div className="type-label !text-[var(--app-faint)]">Criteria used</div>
              <div className="mt-1.5 text-xs text-[var(--app-faint)]">
                {activeCriterion
                  ? `Showing evidence for “${activeCriterion}”`
                  : "Select a criterion to see the snippets behind it"}
              </div>
            </div>

            {(lead.criteriaResults ?? []).map((c) => {
              const isDq = c.type === "disqualifier";
              const factor = c.result === "met" ? 1 : c.result === "partial" ? 0.5 : 0;
              const max = isDq ? 0 : ((c.weight ?? 0) / totalWeight) * 9;
              const got = max * factor;
              const on = activeCriterion === c.criterion;
              const snippets = evidence.filter((e) => e.supports.includes(c.criterion)).length;
              const resultColor =
                c.result === "met"
                  ? isDq
                    ? "#9e3327"
                    : "#2c6a4c"
                  : c.result === "partial"
                    ? "#9a6410"
                    : c.result === "unknown"
                      ? "var(--app-faint)"
                      : "var(--app-dim)";

              return (
                <div
                  key={c.criterion}
                  tabIndex={0}
                  onClick={() => setActiveCriterion(on ? null : c.criterion)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveCriterion(on ? null : c.criterion);
                    }
                  }}
                  className="grid cursor-pointer grid-cols-[1fr_auto] gap-2 border-b border-[#f2f3f3] py-3.5 pr-[18px] pl-[15px] hover:bg-[#f8fafa]"
                  style={{
                    borderLeft: `3px solid ${on ? "var(--app-teal)" : "transparent"}`,
                    background: on ? "#f2f8f8" : "#fff",
                  }}
                >
                  <div className="min-w-0">
                    <div className="font-medium">{c.criterion}</div>
                    <div className="mt-[3px] text-xs text-[var(--app-faint)]">
                      {TYPE_LABEL[c.type]} · {c.weight ? `w${c.weight}` : "—"} ·{" "}
                      {snippets === 1 ? "1 snippet" : `${snippets} snippets`}
                    </div>
                    <div className="mt-1.5 text-[13px] text-[var(--app-dim)]">{c.note}</div>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <span
                      className="inline-block rounded-[3px] px-2 py-[3px] text-xs"
                      style={{
                        color: resultColor,
                        background:
                          c.result === "met"
                            ? isDq
                              ? "#f8ece9"
                              : "#e9f2ec"
                            : c.result === "partial"
                              ? "#fdf7ec"
                              : "#f4f5f5",
                      }}
                    >
                      {isDq && c.result === "met" ? "Triggered" : RESULT_LABEL[c.result]}
                    </span>
                    <div
                      className="tabular mt-1.5 text-[var(--app-dim)]"
                      style={{ font: "400 12px/1 var(--font-mono)" }}
                    >
                      {isDq
                        ? c.result === "met"
                          ? "Forces score 2"
                          : "No effect"
                        : `+${got.toFixed(1)} of ${max.toFixed(1)}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* ---------- Evidence ---------- */}
          <section
            style={{ gridArea: "ev" }}
            className="overflow-hidden rounded-lg border border-[var(--app-line)] bg-white"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#eceeee] px-[18px] py-4">
              <div>
                <div className="type-label !text-[var(--app-faint)]">Evidence used</div>
                <div className="mt-1.5 text-xs text-[var(--app-faint)]">
                  {evidence.length} snippets kept · click a snippet to jump to its criterion
                </div>
              </div>
              {activeCriterion ? (
                <button
                  type="button"
                  onClick={() => setActiveCriterion(null)}
                  className="h-[30px] cursor-pointer rounded border border-[#dde0e0] bg-white px-2.5 text-xs"
                >
                  Clear link
                </button>
              ) : null}
            </div>

            <div className="grid gap-2.5 px-[18px] py-3.5">
              {evidence.map((e, i) => {
                const on = !!activeCriterion && e.supports.includes(activeCriterion);
                const website = e.source === "website";
                return (
                  <div
                    key={i}
                    tabIndex={0}
                    onClick={() => {
                      const first = e.supports[0] ?? null;
                      setActiveCriterion((cur) => (cur === first ? null : first));
                    }}
                    onKeyDown={(ev) => {
                      if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        const first = e.supports[0] ?? null;
                        setActiveCriterion((cur) => (cur === first ? null : first));
                      }
                    }}
                    className="flex cursor-pointer gap-3 rounded-md px-3.5 py-3 hover:border-[#c9d3d3]"
                    style={{
                      border: `1px solid ${on ? "var(--app-teal)" : "#e8eaea"}`,
                      background: on ? "#f2f8f8" : "#fff",
                    }}
                  >
                    <div className="flex-none">
                      <span
                        className="inline-block rounded-[3px] px-[7px] py-[3px]"
                        style={{
                          font: "500 11px/1.3 var(--font-mono)",
                          color: website ? "var(--app-teal)" : "#3c5a8a",
                          background: website ? "#eaf2f2" : "#eef1f7",
                        }}
                      >
                        {website ? "Website" : "LinkedIn"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div
                        style={{ font: "400 12px/1.4 var(--font-mono)", color: "var(--app-faint)" }}
                      >
                        {e.location}
                      </div>
                      <div className="mt-1.5 text-sm">&ldquo;{e.snippet}&rdquo;</div>
                      <div className="mt-[7px] text-xs text-[var(--app-dim)]">
                        Supports: {e.supports.join(", ")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ---------- Metadata ---------- */}
          <section
            style={{ gridArea: "meta" }}
            className="rounded-lg border border-[var(--app-line)] bg-white p-[18px]"
          >
            <div className="type-label !text-[var(--app-faint)]">Metadata</div>
            <div className="mt-3.5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 text-[13px]">
              <div>
                <div className="text-[var(--app-faint)]">Scored</div>
                <div className="mt-[3px] font-mono">
                  {formatDate(lead.scoredAt ?? lead.submittedAt)} at{" "}
                  {formatTime(lead.scoredAt ?? lead.submittedAt)}
                </div>
              </div>
              <div>
                <div className="text-[var(--app-faint)]">Criteria version</div>
                <div className="mt-[3px] font-mono">ICP criteria {lead.criteriaVersion}</div>
              </div>
              <div>
                <div className="text-[var(--app-faint)]">Time to score</div>
                <div className="mt-[3px] font-mono">
                  {lead.durationMs ? `${(lead.durationMs / 1000).toFixed(1)}s` : "—"}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function ProcessingPanel() {
  return (
    <div className="mt-4 rounded-lg border border-[var(--app-line)] bg-white p-7">
      <div
        className="flex items-center gap-2.5 text-[var(--app-teal)]"
        style={{ font: "400 13px/1 var(--font-mono)" }}
      >
        <span className="ib-pulse h-[7px] w-[7px] rounded-full bg-[var(--app-teal)]" />
        Reading the website and the LinkedIn page
      </div>
      <div className="mt-[18px] grid max-w-[520px] gap-3">
        <div className="ib-shimmer h-3.5 rounded-[3px]" />
        <div className="ib-shimmer h-3.5 w-[72%] rounded-[3px]" />
        <div className="ib-shimmer h-3.5 w-[54%] rounded-[3px]" />
      </div>
      <p className="mt-5 max-w-[52ch] text-[var(--app-dim)]">
        The score, the criteria breakdown and the icebreaker appear here as soon as both
        sources have been read. Nothing is lost if you navigate away.
      </p>
    </div>
  );
}
