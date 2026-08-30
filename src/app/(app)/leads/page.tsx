"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LeadCards } from "@/components/app/LeadCards";
import { LeadsSkeleton } from "@/components/app/LeadsSkeleton";
import { LeadsTable } from "@/components/app/LeadsTable";
import { LeadsToolbar } from "@/components/app/LeadsToolbar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMounted } from "@/hooks/useMounted";
import { copyToClipboard } from "@/lib/format";
import { filterLeads, nicheGroups } from "@/lib/leads";
import type { Lead } from "@/lib/types";
import { useStore } from "@/state/store";

const PER_PAGE = 8;
const DENSITY = "Comfortable" as const;

export default function LeadsPage() {
  const {
    leads,
    filters,
    setFilters,
    clearFilters,
    selected,
    setSelected,
    markCopied,
    showToast,
  } = useStore();

  const isMobile = useIsMobile();
  const mounted = useMounted();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [columnsOpen, setColumnsOpen] = useState(false);

  const matched = useMemo(() => filterLeads(leads, filters), [leads, filters]);
  const niches = useMemo(() => nicheGroups(leads), [leads]);

  const pages = Math.max(1, Math.ceil(matched.length / PER_PAGE));
  const page = Math.min(filters.page, pages - 1);
  const rows = matched.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const selectedIds = Object.keys(selected);

  const copyOne = async (lead: Lead) => {
    if (!lead.icebreaker) {
      showToast("No icebreaker yet — this lead is still processing");
      return;
    }
    await copyToClipboard(lead.icebreaker);
    markCopied(`row-${lead.id}`);
    showToast("Icebreaker copied");
  };

  const copySelected = async () => {
    const text = leads
      .filter((l) => selectedIds.includes(l.id) && l.icebreaker)
      .map((l) => `${l.companyName}\n${l.icebreaker}`)
      .join("\n\n");
    if (!text) {
      showToast("Nothing to copy — the selected leads are still processing");
      return;
    }
    await copyToClipboard(text);
    markCopied("bulk");
    showToast(`${selectedIds.length} icebreakers copied`);
  };

  const countLabel =
    matched.length === leads.length
      ? `${leads.length} leads`
      : `${matched.length} of ${leads.length} leads`;

  return (
    <main className="mx-auto max-w-[1440px] px-5 pt-6 pb-[90px] md:px-6">
      <div className="flex flex-col items-stretch justify-between gap-3.5 md:flex-row md:items-end">
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 30,
              letterSpacing: "-0.01em",
            }}
          >
            Leads
          </h1>
          <div
            className="mt-1 text-[var(--app-faint)]"
            style={{ font: "400 13px/1.4 var(--font-mono)" }}
          >
            {countLabel}
          </div>
        </div>
        <Link
          href="/submit"
          className="inline-flex h-[38px] items-center justify-center rounded border border-[var(--app-teal)] bg-[var(--app-teal)] px-4 font-medium text-white no-underline"
        >
          Submit a lead
        </Link>
      </div>

      <LeadsToolbar
        niches={niches}
        total={leads.length}
        filtersOpen={filtersOpen}
        columnsOpen={columnsOpen}
        onToggleFilters={() => {
          setFiltersOpen((v) => !v);
          setColumnsOpen(false);
        }}
        onToggleColumns={() => {
          setColumnsOpen((v) => !v);
          setFiltersOpen(false);
        }}
      />

      {selectedIds.length > 0 ? (
        <div className="mt-3 flex items-center gap-3 rounded-[5px] bg-[var(--app-ink)] px-3.5 py-2.5 text-white">
          <span style={{ font: "500 13px/1 var(--font-mono)" }}>
            {selectedIds.length} selected
          </span>
          <button
            type="button"
            onClick={copySelected}
            className="h-8 cursor-pointer rounded border-0 bg-white px-3 text-[13px] font-medium text-[var(--app-ink)]"
          >
            Copy icebreakers
          </button>
          <button
            type="button"
            onClick={() => setSelected({})}
            className="h-8 cursor-pointer border-0 bg-transparent px-2.5 text-[13px] text-[#b9c0c2]"
          >
            Clear
          </button>
        </div>
      ) : null}

      {!mounted ? <LeadsSkeleton /> : null}

      {mounted && leads.length === 0 ? (
        <div className="mt-3.5 rounded-md border border-[var(--app-line)] bg-white px-6 py-16 text-center">
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>
            No leads scored yet
          </div>
          <p className="mx-auto mt-2.5 max-w-[44ch] text-[var(--app-dim)]">
            Submit a website and a LinkedIn URL and the first score lands in about five
            seconds.
          </p>
          <Link
            href="/submit"
            className="mt-5 inline-flex h-[42px] items-center rounded border-0 bg-[var(--app-teal)] px-5 font-medium text-white no-underline"
          >
            Qualify a lead
          </Link>
        </div>
      ) : null}

      {mounted && leads.length > 0 && matched.length === 0 ? (
        <div className="mt-3.5 rounded-md border border-[var(--app-line)] bg-white px-6 py-14 text-center">
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>
            No leads match these filters
          </div>
          <p className="mx-auto mt-2.5 max-w-[46ch] text-[var(--app-dim)]">
            {leads.length} leads are in the list. Widen the score range or clear the filters to
            see them.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 h-10 cursor-pointer rounded border border-[#cfd4d4] bg-white px-[18px] font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : null}

      {mounted && rows.length > 0 ? (
        isMobile ? (
          <LeadCards rows={rows} onCopy={copyOne} />
        ) : (
          <LeadsTable rows={rows} onCopy={copyOne} density={DENSITY} />
        )
      ) : null}

      {mounted && matched.length > 0 ? (
        <div className="mt-3.5 flex flex-col items-center justify-between gap-3 md:flex-row">
          <div style={{ font: "400 12px/1 var(--font-mono)", color: "var(--app-faint)" }}>
            {page * PER_PAGE + 1}–{Math.min(matched.length, page * PER_PAGE + PER_PAGE)} of{" "}
            {matched.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilters({ page: Math.max(0, page - 1) })}
              disabled={page === 0}
              className="h-[34px] cursor-pointer rounded border border-[#dde0e0] bg-white px-3 disabled:cursor-default disabled:opacity-40"
            >
              Previous
            </button>
            <span style={{ font: "400 12px/1 var(--font-mono)", color: "var(--app-dim)" }}>
              Page {page + 1} of {pages}
            </span>
            <button
              type="button"
              onClick={() => setFilters({ page: Math.min(pages - 1, page + 1) })}
              disabled={page >= pages - 1}
              className="h-[34px] cursor-pointer rounded border border-[#dde0e0] bg-white px-3 disabled:cursor-default disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
