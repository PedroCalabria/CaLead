"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades a section in as it enters the viewport. The hidden start state
 * only applies once this has run, so the page reads fine without JS.
 */
export function Reveal({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Starts false on both server and client so hydration matches; nothing is
  // hidden until the effect below arms the reveal styles.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Without IntersectionObserver there is nothing to wait for, so the
    // content stays visible rather than animating in.
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    document.documentElement.classList.add("reveal-ready");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={ref} id={id} data-reveal data-in={shown} className={className}>
      {children}
    </div>
  );
}
