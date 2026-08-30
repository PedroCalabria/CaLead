"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ScoreMeter } from "@/components/ui/ScoreMeter";

/** The sample lead panel beside the hero copy. The meter fills on load. */
export function HeroCard() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setScore(90), 420);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="overflow-hidden rounded-[var(--radius-panel)] bg-surface-card shadow-[var(--shadow-dialog)]">
      <div className="flex items-center gap-2.5 border-b border-hairline bg-surface-sunken px-4 py-3">
        <Icon name="target" size={15} color="var(--text-muted)" />
        <span className="type-label flex-1">Lead output</span>
        <span className="type-data text-faint">SCORED 14:02</span>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="type-h4 text-ink">Northlight</div>
            <div className="type-body-small text-muted">
              Jordan Ellis · Head of Growth · HR tech
            </div>
          </div>
          <Badge tone="hot">Hot 90</Badge>
        </div>

        <ScoreMeter label="ICP fit" value={score} />

        <p className="type-body-small text-body">
          Mid-market SaaS with 40–60 employees, hiring 3 SDRs right now, and their site
          leads with a manual-process pain point the product removes.
        </p>

        <div className="flex flex-col gap-2">
          <span className="type-label">Generated ice breaker</span>
          <p className="type-body rounded-[var(--radius-card)] border border-blue-200 bg-surface-accent-soft p-3.5 text-ink">
            Saw you&rsquo;re hiring three SDRs at once off the back of the Series A &mdash;
            that&rsquo;s a lot of ramp happening in parallel. How are you handling lead
            research for the new reps before they hit quota?
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge tone="cold" uppercase={false}>
            LinkedIn · Jobs — 3 open roles
          </Badge>
          <Badge tone="cold" uppercase={false}>
            Website · Homepage hero
          </Badge>
        </div>
      </div>
    </div>
  );
}
