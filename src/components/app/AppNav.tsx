"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useGuardedNav } from "@/hooks/useGuardedNav";

const TABS = [
  { href: "/leads", label: "Leads" },
  { href: "/submit", label: "Submit a lead" },
  { href: "/icp", label: "ICP criteria" },
];

export function AppNav() {
  const pathname = usePathname();
  const navigate = useGuardedNav();
  const [drawer, setDrawer] = useState(false);

  const go = (href: string) => {
    setDrawer(false);
    navigate(href);
  };

  const isActive = (href: string) => pathname.startsWith(href);
  const tabStyle = (href: string, mobile: boolean) => ({
    height: mobile ? 48 : 34,
    padding: mobile ? "0 14px" : "0 12px",
    textAlign: mobile ? ("left" as const) : ("center" as const),
    background: isActive(href) ? "var(--app-teal-soft)" : "transparent",
    border: 0,
    borderRadius: mobile ? 5 : 4,
    color: isActive(href) ? "var(--app-teal)" : "var(--app-dim)",
    fontWeight: 500,
    fontSize: mobile ? 15 : undefined,
    cursor: "pointer",
  });

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--app-line)] bg-white">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-7 px-6">
        <button
          type="button"
          onClick={() => go("/")}
          className="flex cursor-pointer items-center gap-[9px] border-0 bg-transparent p-0"
        >
          <span className="h-[19px] w-[9px] bg-[var(--app-teal)]" />
          <span
            style={{
              font: "500 16px/1 var(--font-display)",
              letterSpacing: "-0.01em",
              color: "var(--app-ink)",
            }}
          >
            CaLead
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {TABS.map((tab) => (
            <button
              key={tab.href}
              type="button"
              onClick={() => go(tab.href)}
              style={tabStyle(tab.href, false)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => setDrawer((d) => !d)}
          aria-label="Menu"
          aria-expanded={drawer}
          className="grid h-[38px] w-[38px] cursor-pointer place-items-center gap-1 rounded border border-[var(--app-line)] bg-transparent md:hidden"
        >
          <span className="h-[1.5px] w-4 bg-[var(--app-ink)]" />
          <span className="h-[1.5px] w-4 bg-[var(--app-ink)]" />
        </button>
      </div>

      {drawer ? (
        <nav className="grid gap-1 border-t border-[var(--app-line)] bg-white p-2 md:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.href}
              type="button"
              onClick={() => go(tab.href)}
              style={tabStyle(tab.href, true)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
