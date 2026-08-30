"use client";

import { useEffect } from "react";
import { useStore } from "@/state/store";

export function ConfirmDialog() {
  const { dialog, closeDialog } = useStore();

  useEffect(() => {
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDialog();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog, closeDialog]);

  if (!dialog) return null;

  return (
    <div
      onClick={closeDialog}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "#13181a66",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={dialog.title}
        onClick={(e) => e.stopPropagation()}
        className="ib-rise"
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 20px 60px #13181a2e",
          padding: 24,
        }}
      >
        <div style={{ fontWeight: 500, fontSize: 17 }}>{dialog.title}</div>
        <div style={{ marginTop: 10, fontSize: 13, color: "var(--app-dim)" }}>{dialog.body}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button
            type="button"
            onClick={closeDialog}
            style={{
              height: 38,
              padding: "0 16px",
              background: "#fff",
              border: "1px solid #cfd4d4",
              borderRadius: 4,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {dialog.cancel}
          </button>
          <button
            type="button"
            onClick={() => {
              const { onConfirm } = dialog;
              closeDialog();
              onConfirm();
            }}
            style={{
              height: 38,
              padding: "0 16px",
              background: dialog.tone === "danger" ? "#9e3327" : "var(--app-teal)",
              color: "#fff",
              border: 0,
              borderRadius: 4,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {dialog.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}
