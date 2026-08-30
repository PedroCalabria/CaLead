"use client";

import { useStore } from "@/state/store";

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;

  return (
    <div
      role="status"
      className="ib-rise"
      style={{
        position: "fixed",
        left: "50%",
        bottom: 28,
        transform: "translateX(-50%)",
        zIndex: 70,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 16px",
        background: "var(--app-ink)",
        color: "#fff",
        borderRadius: 5,
        boxShadow: "0 8px 30px #13181a3d",
        fontSize: 13,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5fbf95" }} />
      {toast}
    </div>
  );
}
