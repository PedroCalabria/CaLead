"use client";

import Link from "next/link";
import { useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "ghost"
  | "inverse"
  | "outlineInverse";
export type ButtonSize = "sm" | "md" | "lg";

const SIZES: Record<ButtonSize, { padding: string; height: number; fontSize: string; gap: number; icon: number }> = {
  sm: { padding: "0 12px", height: 32, fontSize: "var(--size-body-s)", gap: 6, icon: 15 },
  md: { padding: "0 16px", height: 40, fontSize: "var(--size-body-m)", gap: 8, icon: 18 },
  lg: { padding: "0 22px", height: 48, fontSize: "var(--size-body-l)", gap: 10, icon: 20 },
};

const VARIANTS: Record<ButtonVariant, CSSProperties> = {
  primary: { background: "var(--stone-950)", color: "var(--stone-050)", border: "1px solid var(--stone-950)" },
  accent: { background: "var(--blue-400)", color: "var(--text-on-accent)", border: "1px solid var(--blue-400)" },
  secondary: { background: "var(--surface-card)", color: "var(--text-strong)", border: "1px solid var(--border-default)" },
  ghost: { background: "transparent", color: "var(--text-strong)", border: "1px solid transparent" },
  inverse: { background: "var(--stone-050)", color: "var(--stone-950)", border: "1px solid var(--stone-050)" },
  outlineInverse: { background: "transparent", color: "var(--stone-050)", border: "1px solid var(--border-inverse)" },
};

const HOVER: Record<ButtonVariant, CSSProperties> = {
  primary: { background: "var(--stone-800)", borderColor: "var(--stone-800)" },
  accent: { background: "var(--blue-300)", borderColor: "var(--blue-300)" },
  secondary: { background: "var(--surface-hover)", borderColor: "var(--stone-400)" },
  ghost: { background: "var(--surface-hover)" },
  inverse: { background: "var(--stone-200)", borderColor: "var(--stone-200)" },
  outlineInverse: { background: "rgba(255,255,255,0.08)" },
};

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  block?: boolean;
  style?: CSSProperties;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  block = false,
  disabled = false,
  type = "button",
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const s = SIZES[size];

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        fontFamily: "var(--font-display)",
        fontWeight: "var(--weight-medium)" as CSSProperties["fontWeight"],
        fontSize: s.fontSize,
        letterSpacing: "-0.01em",
        borderRadius: "var(--radius-control)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
        transform: press && !disabled ? "scale(var(--press-scale))" : "none",
        whiteSpace: "nowrap",
        ...VARIANTS[variant],
        ...(hover && !disabled ? HOVER[variant] : null),
        ...(disabled
          ? { background: "var(--stone-200)", color: "var(--text-faint)", borderColor: "var(--stone-200)" }
          : null),
        ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={s.icon} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={s.icon} /> : null}
    </button>
  );
}

interface LinkButtonProps {
  href: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconRight?: IconName;
  block?: boolean;
  style?: CSSProperties;
  className?: string;
}

/** Same skin as Button, but it navigates — so it renders an anchor. */
export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  block = false,
  style,
  className,
}: LinkButtonProps) {
  const [hover, setHover] = useState(false);
  const s = SIZES[size];

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        fontFamily: "var(--font-display)",
        fontWeight: "var(--weight-medium)" as CSSProperties["fontWeight"],
        fontSize: s.fontSize,
        letterSpacing: "-0.01em",
        borderRadius: "var(--radius-control)",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "var(--transition-control)",
        ...VARIANTS[variant],
        ...(hover ? HOVER[variant] : null),
        ...style,
      }}
    >
      {icon ? <Icon name={icon} size={s.icon} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={s.icon} /> : null}
    </Link>
  );
}
