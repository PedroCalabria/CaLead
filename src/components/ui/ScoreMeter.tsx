import type { CSSProperties } from "react";
import { METER_TRACK, band } from "@/lib/scoring";

interface ScoreMeterProps {
  /** 0–100. */
  value?: number;
  segments?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}

export function ScoreMeter({
  value = 0,
  segments = 10,
  label,
  showValue = true,
  size = "md",
  style,
}: ScoreMeterProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const filled = Math.round((clamped / 100) * segments);
  const tone = band(clamped).color;
  const height = size === "sm" ? 6 : size === "lg" ? 14 : 10;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label || showValue ? (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          {label ? <span className="type-label">{label}</span> : null}
          {showValue ? (
            <span className="type-data" style={{ color: tone }}>
              {Math.round(value)}
            </span>
          ) : null}
        </div>
      ) : null}
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: segments }, (_, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              height,
              borderRadius: "var(--radius-2)",
              background: i < filled ? tone : METER_TRACK,
              transition: "background-color var(--dur-base) var(--ease-standard)",
              transitionDelay: `${i * 30}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
