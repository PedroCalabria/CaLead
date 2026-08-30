const WIDTHS = ["62%", "48%", "70%", "55%", "62%", "48%"];

/** Shown until the list is ready on the client. */
export function LeadsSkeleton() {
  return (
    <div className="mt-3.5 overflow-hidden rounded-md border border-[var(--app-line)] bg-white">
      {WIDTHS.map((w, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-[#f2f3f3] p-4">
          <div className="ib-shimmer h-3.5 w-[34px] rounded-[3px]" />
          <div className="ib-shimmer h-3.5 rounded-[3px]" style={{ width: w }} />
        </div>
      ))}
    </div>
  );
}
