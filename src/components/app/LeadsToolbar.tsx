"use client";

import { Switch } from "@/components/ui/Switch";
import { STATUS } from "@/lib/scoring";
import type { LeadStatus } from "@/lib/types";
import { useStore, type SortKey } from "@/state/store";

const STATUS_KEYS: LeadStatus[] = ["scored", "processing", "needs_review"];

const controlStyle = {
  height: 38,
  padding: "0 14px",
  background: "#fff",
  border: "1px solid #dde0e0",
  borderRadius: 4,
  color: "var(--app-ink)",
  cursor: "pointer",
} as const;

interface LeadsToolbarProps {
  niches: string[];
  total: number;
  filtersOpen: boolean;
  columnsOpen: boolean;
  onToggleFilters: () => void;
  onToggleColumns: () => void;
}

export function LeadsToolbar({
  niches,
  filtersOpen,
  columnsOpen,
  onToggleFilters,
  onToggleColumns,
}: LeadsToolbarProps) {
  const {
    filters,
    setFilters,
    clearFilters,
    hidden,
    toggleHidden,
    setAllHidden,
    anyHidden,
  } = useStore();

  const filterCount =
    (filters.niches.length ? 1 : 0) +
    (filters.statuses.length ? 1 : 0) +
    (filters.minScore > 1 ? 1 : 0) +
    (filters.search.trim() ? 1 : 0);

  const contactLabel = anyHidden ? "Contact details hidden" : "Hide contact details";

  const toggleIn = <T extends string>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const chip = (on: boolean) => ({
    height: 28,
    padding: "0 10px",
    background: on ? "var(--app-teal)" : "#fff",
    color: on ? "#fff" : "var(--app-dim)",
    border: "1px solid #dde0e0",
    borderRadius: 14,
    fontSize: 12,
    cursor: "pointer",
  });

  return (
    <>
      <div className="relative mt-[18px] flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        <div className="relative min-w-[180px] flex-1 md:max-w-[340px]">
          <input
            type="search"
            placeholder="Search name, company or niche"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value, page: 0 })}
            aria-label="Search leads"
            className="h-[38px] w-full rounded border border-[#dde0e0] bg-white px-3"
          />
        </div>

        <button
          type="button"
          onClick={onToggleFilters}
          aria-expanded={filtersOpen}
          style={controlStyle}
        >
          Filters <span className="font-mono text-[var(--app-teal)]">{filterCount}</span>
        </button>

        <button
          type="button"
          onClick={onToggleColumns}
          aria-expanded={columnsOpen}
          style={controlStyle}
          className="hidden md:inline-flex"
        >
          Columns
        </button>

        <div className="hidden flex-1 md:block" />

        <label className="hidden cursor-pointer items-center gap-[9px] text-[13px] text-[var(--app-dim)] md:flex">
          <Switch checked={anyHidden} onChange={() => setAllHidden(!anyHidden)} label={contactLabel} />
          {contactLabel}
        </label>

        <select
          aria-label="Sort by"
          value={filters.sortKey}
          onChange={(e) => setFilters({ sortKey: e.target.value as SortKey, page: 0 })}
          className="hidden h-[38px] rounded border border-[#dde0e0] bg-white px-2 md:block"
        >
          <option value="score">Sort: ICP fit score</option>
          <option value="date">Sort: date added</option>
          <option value="name">Sort: name</option>
        </select>
      </div>

      {columnsOpen ? (
        <div className="mt-2.5 max-w-[420px] rounded-md border border-[var(--app-line)] bg-white px-4 py-3.5">
          <div className="flex items-center justify-between">
            <span className="font-medium">Columns</span>
            <button
              type="button"
              onClick={onToggleColumns}
              className="cursor-pointer border-0 bg-transparent text-[var(--app-faint)]"
            >
              Close
            </button>
          </div>
          <div className="mt-1.5 text-xs text-[var(--app-faint)]">
            Contact fields are personal data. Hide them individually, or all three at once for
            screen sharing.
          </div>
          <div className="mt-3 grid gap-0.5">
            {(
              [
                ["fullName", "Full name"],
                ["email", "Email"],
                ["phone", "Phone number"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-2.5 py-[7px]">
                <input
                  type="checkbox"
                  checked={!hidden[key]}
                  onChange={() => toggleHidden(key)}
                  className="h-[15px] w-[15px] accent-[var(--app-teal)]"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      ) : null}

      {filtersOpen ? (
        <div className="mt-2.5 rounded-md border border-[var(--app-line)] bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Filters</span>
            <button
              type="button"
              onClick={onToggleFilters}
              className="cursor-pointer border-0 bg-transparent text-[var(--app-faint)]"
            >
              Close
            </button>
          </div>

          <div className="mt-3.5 grid gap-6 md:grid-cols-[220px_1fr_1fr]">
            <div>
              <div className="text-xs font-medium text-[var(--app-dim)]">Minimum score</div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={filters.minScore}
                onChange={(e) => setFilters({ minScore: Number(e.target.value), page: 0 })}
                aria-label="Minimum score"
                className="mt-2.5 w-full accent-[var(--app-teal)]"
              />
              <div style={{ font: "500 13px/1 var(--font-mono)", color: "var(--app-ink)" }}>
                {filters.minScore === 1 ? "Any score" : `${filters.minScore} and above`}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-[var(--app-dim)]">Niche</div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {niches.map((niche) => {
                  const on = filters.niches.includes(niche);
                  return (
                    <button
                      key={niche}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setFilters({ niches: toggleIn(filters.niches, niche), page: 0 })}
                      style={chip(on)}
                    >
                      {niche}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-[var(--app-dim)]">Status</div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {STATUS_KEYS.map((key) => {
                  const on = filters.statuses.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setFilters({ statuses: toggleIn(filters.statuses, key), page: 0 })
                      }
                      style={chip(on)}
                    >
                      {STATUS[key].label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#f2f3f3] pt-3.5 md:hidden">
            <label className="flex items-center gap-[9px] text-[13px] text-[var(--app-dim)]">
              <Switch
                checked={anyHidden}
                onChange={() => setAllHidden(!anyHidden)}
                label={contactLabel}
              />
              {contactLabel}
            </label>
            <select
              aria-label="Sort by"
              value={filters.sortKey}
              onChange={(e) => setFilters({ sortKey: e.target.value as SortKey, page: 0 })}
              className="h-[38px] rounded border border-[#dde0e0] bg-white px-2"
            >
              <option value="score">Sort: score</option>
              <option value="date">Sort: date</option>
              <option value="name">Sort: name</option>
            </select>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-3.5 h-8 cursor-pointer rounded border border-[#dde0e0] bg-white px-3 text-[13px]"
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </>
  );
}
