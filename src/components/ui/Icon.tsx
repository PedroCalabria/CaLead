import {
  ArrowDown,
  ArrowUpRight,
  Globe,
  MessageSquareQuote,
  ScanLine,
  SlidersHorizontal,
  Target,
  type LucideIcon,
} from "lucide-react";

// The design system draws from Lucide with kebab-case names. Only the
// icons the screens actually use are mapped, so the bundle stays small.
const ICONS = {
  "arrow-down": ArrowDown,
  "arrow-up-right": ArrowUpRight,
  globe: Globe,
  "message-square-quote": MessageSquareQuote,
  "scan-line": ScanLine,
  "sliders-horizontal": SlidersHorizontal,
  target: Target,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS | "linkedin";

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export function Icon({
  name,
  size = 18,
  strokeWidth = 1.75,
  color = "currentColor",
  className,
}: IconProps) {
  // Lucide dropped its brand marks, so LinkedIn is drawn here to keep the
  // same stroke weight and box as the rest of the set.
  if (name === "linkedin") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ display: "block", flex: "none" }}
        aria-hidden
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  const Glyph = ICONS[name];
  return (
    <Glyph
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      color={color}
      className={className}
      style={{ display: "block", flex: "none" }}
      aria-hidden
    />
  );
}
