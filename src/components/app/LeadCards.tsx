"use client";

import { useRouter } from "next/navigation";
import { ScoreTicks } from "@/components/ui/ScoreTicks";
import { StatusPill } from "@/components/ui/StatusPill";
import { band } from "@/lib/scoring";
import type { Lead } from "@/lib/types";
import { useStore } from "@/state/store";

/** Mobile presentation of the leads list. */
export function LeadCards({
  rows,
  onCopy,
}: {
  rows: Lead[];
  onCopy: (lead: Lead) => void;
}) {
  const router = useRouter();
  const { hidden, copied } = useStore();

  return (
    <div className="mt-3.5 grid gap-2.5">
      {rows.map((lead) => {
        const processing = lead.status === "processing";
        const b = band(lead.icpFitScore);
        const isCopied = copied === `row-${lead.id}`;

        return (
          <div
            key={lead.id}
            tabIndex={0}
            onClick={() => router.push(`/leads/${lead.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/leads/${lead.id}`);
              }
            }}
            className="cursor-pointer rounded-lg border border-[var(--app-line)] bg-white p-3.5"
          >
            <div className="flex items-start gap-3.5">
              <div className="min-w-0 flex-1">
                {!hidden.fullName ? (
                  <div className="text-[15px] font-medium">{lead.fullName}</div>
                ) : null}
                <div className="text-[13px] text-[var(--app-dim)]">{lead.companyName}</div>
                <div className="mt-2">
                  <span className="inline-block rounded-[3px] bg-[#f2f4f4] px-2 py-[3px] text-xs text-[var(--app-dim)]">
                    {lead.niche}
                  </span>
                </div>
              </div>

              <div className="flex-none text-right">
                {processing ? (
                  <div
                    className="flex items-center gap-1.5 text-[var(--app-faint)]"
                    style={{ font: "400 12px/1 var(--font-mono)" }}
                  >
                    <span className="ib-pulse h-1.5 w-1.5 rounded-full bg-[var(--app-teal)]" />
                    Scoring
                  </div>
                ) : (
                  <>
                    <div
                      className="tabular"
                      style={{ font: "500 28px/1 var(--font-mono)", color: b.color }}
                    >
                      {lead.icpFitScore}
                    </div>
                    <div className="mt-1.5">
                      <ScoreTicks score={lead.icpFitScore} width={3} height={12} align="right" />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-3 line-clamp-2 rounded-[6px_6px_6px_2px] border border-[#eceeee] bg-[#f8f9f9] px-3 py-[11px] text-[13px] text-[#3c464a]">
              {processing ? "Written once the lead is scored" : lead.icebreaker}
            </div>

            <div className="mt-3 flex items-center justify-between gap-2.5">
              <StatusPill status={lead.status} />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(lead);
                }}
                style={{
                  height: 40,
                  padding: "0 14px",
                  background: "#fff",
                  border: "1px solid #cfd4d4",
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  color: isCopied ? "#2c6a4c" : "var(--app-dim)",
                  cursor: "pointer",
                }}
              >
                {isCopied ? "Copied" : "Copy"} icebreaker
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
