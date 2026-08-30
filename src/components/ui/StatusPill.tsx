import { STATUS } from "@/lib/scoring";
import type { LeadStatus } from "@/lib/types";

export function StatusPill({ status }: { status: LeadStatus }) {
  const s = STATUS[status];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 8px",
        borderRadius: 3,
        fontSize: 12,
        whiteSpace: "nowrap",
        color: s.fg,
        background: s.bg,
      }}
    >
      {s.label}
    </span>
  );
}
