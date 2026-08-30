// waitUntil keeps a Vercel function alive after it has already responded.
// Outside that runtime (next dev, a script) it is unavailable, so fall back to
// an unawaited promise — same effect locally, where the process is long-lived.
import { waitUntil } from "@vercel/functions";

export function background(work: Promise<unknown>): void {
  const swallow = work.catch((error) => {
    console.error("[background]", error);
  });

  try {
    waitUntil(swallow);
  } catch {
    void swallow;
  }
}
