"use client";

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  size?: "sm" | "lg";
}

export function Switch({ checked, onChange, label, size = "sm" }: SwitchProps) {
  const large = size === "lg";
  const track = large ? { width: 44, height: 26, padding: 3, radius: 13 } : { width: 34, height: 18, padding: 2, radius: 9 };
  const knob = large ? 20 : 14;
  const travel = large ? 18 : 16;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      style={{
        width: track.width,
        height: track.height,
        padding: track.padding,
        border: 0,
        borderRadius: track.radius,
        background: checked ? "var(--app-teal)" : "#d5d9d9",
        cursor: "pointer",
        flex: "none",
      }}
    >
      <span
        style={{
          display: "block",
          width: knob,
          height: knob,
          borderRadius: "50%",
          background: "#fff",
          transform: checked ? `translateX(${travel}px)` : "translateX(0)",
          transition: "transform .15s ease",
        }}
      />
    </button>
  );
}
