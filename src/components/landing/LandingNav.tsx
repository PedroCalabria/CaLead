"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Transparent over the dark hero, glass once the page scrolls. */
export function LandingNav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sync = () => setStuck(window.scrollY > 72);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <header className="ib-nav fixed inset-x-0 top-0 z-40" data-stuck={stuck}>
      <div className="mx-auto flex h-[72px] max-w-[var(--page-max)] items-center justify-between gap-6 px-5 md:px-8">
        <Link
          href="/"
          className="type-h3 !text-[22px] text-inherit no-underline"
          style={{ letterSpacing: "-0.035em" }}
        >
          CaLead
        </Link>
        <nav className="flex items-center gap-5">
          <a href="#how" className="type-ui hidden text-inherit no-underline md:inline">
            How it works
          </a>
          <a href="#criteria" className="type-ui hidden text-inherit no-underline md:inline">
            ICP criteria
          </a>
          <Link href="/leads" className="type-ui hidden text-inherit no-underline md:inline">
            Leads
          </Link>
          <Link
            href="/submit"
            className="type-ui inline-flex h-10 items-center rounded-[var(--radius-control)] border border-current px-4 text-inherit no-underline"
          >
            Qualify a lead
          </Link>
        </nav>
      </div>
    </header>
  );
}
