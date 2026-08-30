import type { CSSProperties, ReactNode } from "react";

export type BadgeTone =
  | "neutral"
  | "hot"
  | "warm"
  | "cold"
  | "info"
  | "positive"
  | "warn"
  | "critical"
  | "inverse";

const TONES: Record<BadgeTone, CSSProperties> = {
  neutral: { background: "var(--surface-sunken)", color: "var(--text-body)", border: "1px solid transparent" },
  hot: { background: "var(--blue-400)", color: "var(--text-on-accent)", border: "1px solid var(--blue-400)" },
  warm: { background: "var(--stone-200)", color: "var(--text-body)", border: "1px solid transparent" },
  cold: { background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border-default)" },
  info: { background: "var(--info-100)", color: "var(--info-500)", border: "1px solid transparent" },
  positive: { background: "var(--positive-100)", color: "var(--positive-500)", border: "1px solid transparent" },
  warn: { background: "var(--warn-100)", color: "var(--warn-500)", border: "1px solid transparent" },
  critical: { background: "var(--critical-100)", color: "var(--critical-500)", border: "1px solid transparent" },
  inverse: { background: "rgba(255,255,255,0.1)", color: "var(--stone-050)", border: "1px solid var(--border-inverse)" },
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  uppercase?: boolean;
  style?: CSSProperties;
}

export function Badge({
  children,
  tone = "neutral",
  uppercase = true,
  style,
}: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 8px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--size-label)",
        fontWeight: "var(--weight-medium)" as CSSProperties["fontWeight"],
        letterSpacing: uppercase ? "var(--tracking-label)" : "var(--tracking-mono)",
        textTransform: uppercase ? "uppercase" : "none",
        borderRadius: "var(--radius-2)",
        whiteSpace: "nowrap",
        ...TONES[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
