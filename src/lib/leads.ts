import type { GridFilters } from "@/state/store";
import type { Lead } from "./types";

/** Niche column is "Group — detail"; filters work on the group. */
export function nicheGroup(niche: string): string {
  return niche.split(" — ")[0];
}

export function nicheGroups(leads: Lead[]): string[] {
  const out: string[] = [];
  for (const lead of leads) {
    const group = nicheGroup(lead.niche);
    if (!out.includes(group)) out.push(group);
  }
  return out;
}

export function filterLeads(leads: Lead[], filters: GridFilters): Lead[] {
  const q = filters.search.trim().toLowerCase();

  const matched = leads.filter((lead) => {
    if (q) {
      const haystack = `${lead.fullName} ${lead.companyName} ${lead.niche}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.niches.length && !filters.niches.includes(nicheGroup(lead.niche))) return false;
    if (filters.statuses.length && !filters.statuses.includes(lead.status)) return false;
    if (filters.minScore > 0) {
      if (lead.icpFitScore === null || lead.icpFitScore === undefined) return false;
      if (lead.icpFitScore < filters.minScore) return false;
    }
    return true;
  });

  const dir = filters.sortDir === "asc" ? 1 : -1;

  return matched.slice().sort((a, b) => {
    if (filters.sortKey === "name") return a.fullName.localeCompare(b.fullName) * dir;
    if (filters.sortKey === "date") {
      const at = new Date(a.scoredAt ?? a.submittedAt ?? 0).getTime();
      const bt = new Date(b.scoredAt ?? b.submittedAt ?? 0).getTime();
      return (at - bt) * dir;
    }
    const av = a.icpFitScore ?? -1;
    const bv = b.icpFitScore ?? -1;
    return (av - bv) * dir;
  });
}
