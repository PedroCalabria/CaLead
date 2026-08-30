"use client";

import { useRouter } from "next/navigation";
import type { KeyboardEvent, MouseEvent } from "react";
import { ScoreTicks } from "@/components/ui/ScoreTicks";
import { StatusPill } from "@/components/ui/StatusPill";
import { domainOf } from "@/lib/format";
import { band } from "@/lib/scoring";
import type { Lead } from "@/lib/types";
import { useStore, type SortKey } from "@/state/store";

const TH_BASE = {
  position: "sticky",
  top: 0,
  zIndex: 2,
  background: "#fbfbfb",
  padding: "10px 12px",
  borderBottom: "1px solid var(--app-line)",
  textAlign: "left",
  font: "500 11px/1 var(--font-mono)",
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "var(--app-dim)",
} as const;

interface LeadsTableProps {
  rows: Lead[];
  onCopy: (lead: Lead) => void;
  density: "Comfortable" | "Compact";
}

export function LeadsTable({ rows, onCopy, density }: LeadsTableProps) {
  const router = useRouter();
  const { hidden, filters, setFilters, selected, setSelected, copied } = useStore();

  const cellPad = density === "Compact" ? "7px 12px" : "12px 12px";
  const allSelected = rows.length > 0 && rows.every((l) => selected[l.id]);

  const sortBy = (key: SortKey) =>
    setFilters({
      sortKey: key,
      sortDir:
        filters.sortKey === key
          ? filters.sortDir === "desc"
            ? "asc"
            : "desc"
          : key === "name"
            ? "asc"
            : "desc",
      page: 0,
    });

  const arrow = (key: SortKey) =>
    filters.sortKey === key ? (filters.sortDir === "desc" ? "↓" : "↑") : "";

  const toggleAll = () => {
    const next = { ...selected };
    if (allSelected) rows.forEach((l) => delete next[l.id]);
    else rows.forEach((l) => (next[l.id] = true));
    setSelected(next);
  };

  const toggleOne = (id: string) => {
    const next = { ...selected };
    if (next[id]) delete next[id];
    else next[id] = true;
    setSelected(next);
  };

  const open = (id: string) => router.push(`/leads/${id}`);
  const onRowKey = (e: KeyboardEvent<HTMLTableRowElement>, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open(id);
    }
  };
  const stop = (e: MouseEvent) => e.stopPropagation();

  const cell = { padding: cellPad, verticalAlign: "middle" } as const;

  return (
    <div className="mt-3.5 max-h-[calc(100vh-250px)] overflow-auto rounded-md border border-[var(--app-line)] bg-white">
      <table className="w-full min-w-[1180px] border-collapse text-[13px]">
        <thead>
          <tr style={{ background: "#fbfbfb" }}>
            <th style={{ ...TH_BASE, width: 36 }}>
              <input
                type="checkbox"
                aria-label="Select all on this page"
                checked={allSelected}
                onChange={toggleAll}
                className="h-[15px] w-[15px] accent-[var(--app-teal)]"
              />
            </th>
            <th
              style={{ ...TH_BASE, cursor: "pointer", whiteSpace: "nowrap" }}
              onClick={() => sortBy("score")}
              aria-sort={filters.sortKey === "score" ? (filters.sortDir === "asc" ? "ascending" : "descending") : "none"}
            >
              ICP fit {arrow("score")}
            </th>
            {!hidden.fullName ? (
              <th
                style={{ ...TH_BASE, cursor: "pointer", whiteSpace: "nowrap" }}
                onClick={() => sortBy("name")}
                aria-sort={filters.sortKey === "name" ? (filters.sortDir === "asc" ? "ascending" : "descending") : "none"}
              >
                Full name {arrow("name")}
              </th>
            ) : null}
            <th style={TH_BASE}>Company</th>
            {!hidden.email ? <th style={TH_BASE}>Email</th> : null}
            {!hidden.phone ? <th style={{ ...TH_BASE, whiteSpace: "nowrap" }}>Phone</th> : null}
            <th style={TH_BASE}>Niche</th>
            <th style={TH_BASE}>Primary service</th>
            <th style={TH_BASE}>Status</th>
            <th style={TH_BASE}>Fit reason</th>
            <th style={TH_BASE}>Icebreaker</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((lead) => {
            const processing = lead.status === "processing";
            const b = band(lead.icpFitScore);
            const isCopied = copied === `row-${lead.id}`;

            return (
              <tr
                key={lead.id}
                tabIndex={0}
                onClick={() => open(lead.id)}
                onKeyDown={(e) => onRowKey(e, lead.id)}
                className="cursor-pointer border-b border-[#f2f3f3] hover:bg-[#f9fafa]"
              >
                <td style={cell}>
                  <input
                    type="checkbox"
                    aria-label={`Select ${lead.companyName}`}
                    checked={!!selected[lead.id]}
                    onChange={() => toggleOne(lead.id)}
                    onClick={stop}
                    className="h-[15px] w-[15px] accent-[var(--app-teal)]"
                  />
                </td>

                <td style={{ ...cell, whiteSpace: "nowrap" }}>
                  {processing ? (
                    <div
                      className="flex items-center gap-[7px] text-[var(--app-faint)]"
                      style={{ font: "400 12px/1 var(--font-mono)" }}
                    >
                      <span className="ib-pulse h-1.5 w-1.5 rounded-full bg-[var(--app-teal)]" />
                      —
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <span
                        className="tabular inline-block min-w-[24px]"
                        style={{ font: "500 19px/1 var(--font-mono)", color: b.color }}
                      >
                        {lead.icpFitScore}
                      </span>
                      <ScoreTicks score={lead.icpFitScore} width={3} height={15} />
                    </div>
                  )}
                </td>

                {!hidden.fullName ? (
                  <td style={{ ...cell, fontWeight: 500, whiteSpace: "nowrap" }}>
                    {lead.fullName}
                  </td>
                ) : null}

                <td style={{ ...cell, whiteSpace: "nowrap" }}>
                  <a
                    href={lead.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                    onClick={stop}
                    className="inline-flex items-center gap-[7px] font-mono text-xs"
                  >
                    <span className="h-3.5 w-3.5 rounded-[3px] border border-[#dde5e5] bg-[#eef2f2]" />
                    {domainOf(lead.companyWebsite)}
                  </a>
                  <a
                    href={lead.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={stop}
                    title="LinkedIn"
                    className="ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border border-[#dde5e5] align-middle text-[#3c5a8a]"
                    style={{ font: "500 10px/1 var(--font-mono)" }}
                  >
                    in
                  </a>
                </td>

                {!hidden.email ? (
                  <td
                    style={{ ...cell, whiteSpace: "nowrap" }}
                    className="font-mono text-xs text-[var(--app-dim)]"
                  >
                    {lead.email}
                  </td>
                ) : null}
                {!hidden.phone ? (
                  <td
                    style={{ ...cell, whiteSpace: "nowrap" }}
                    className="font-mono text-xs text-[var(--app-dim)]"
                  >
                    {lead.phone}
                  </td>
                ) : null}

                <td style={cell}>
                  <span className="inline-block rounded-[3px] bg-[#f2f4f4] px-2 py-[3px] text-xs whitespace-nowrap text-[var(--app-dim)]">
                    {lead.niche}
                  </span>
                </td>

                <td
                  style={{ ...cell, maxWidth: 180 }}
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-[var(--app-dim)]"
                  title={lead.primaryService}
                >
                  {lead.primaryService}
                </td>

                <td style={cell}>
                  <StatusPill status={lead.status} />
                </td>

                <td
                  style={{ ...cell, maxWidth: 240 }}
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-[var(--app-dim)]"
                  title={lead.icpFitReason ?? undefined}
                >
                  {processing ? "Waiting on both sources" : lead.icpFitReason}
                </td>

                <td style={cell}>
                  <div className="flex max-w-[300px] items-center gap-2.5">
                    <span
                      className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[var(--app-dim)]"
                      title={lead.icebreaker ?? undefined}
                    >
                      {processing ? "Written once the lead is scored" : lead.icebreaker}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopy(lead);
                      }}
                      style={{
                        flex: "none",
                        height: 26,
                        padding: "0 9px",
                        background: "#fff",
                        border: "1px solid #dde0e0",
                        borderRadius: 3,
                        fontSize: 12,
                        color: isCopied ? "#2c6a4c" : "var(--app-dim)",
                        cursor: "pointer",
                      }}
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
