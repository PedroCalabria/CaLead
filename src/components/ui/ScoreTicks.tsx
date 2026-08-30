import { ticks } from "@/lib/scoring";

interface ScoreTicksProps {
  score: number | null | undefined;
  width: number;
  height: number;
  gap?: number;
  align?: "left" | "right";
  /** Grow each bar up from the baseline as it appears. */
  animate?: boolean;
}

/** The ten-segment 1–10 fit meter used across the product screens. */
export function ScoreTicks({
  score,
  width,
  height,
  gap = 1.5,
  align = "left",
  animate = false,
}: ScoreTicksProps) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: align === "right" ? "flex-end" : "flex-start",
        gap,
        height,
      }}
    >
      {ticks(score).map((bg, i) => (
        <span
          key={i}
          className={animate ? "ib-fill" : undefined}
          style={{ width, height, background: bg }}
        />
      ))}
    </span>
  );
}
