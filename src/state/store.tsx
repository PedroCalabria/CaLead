"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  criteria as seedCriteria,
  guidance as seedGuidance,
  leads as seedLeads,
  sampleLead,
  starterCriteria,
} from "@/lib/mock-data";
import type {
  Criterion,
  Guidance,
  Lead,
  LeadStatus,
  SampleLead,
  StarterCriterion,
} from "@/lib/types";

export interface ContactVisibility {
  fullName: boolean;
  email: boolean;
  phone: boolean;
}

export type SortKey = "score" | "date" | "name";
export type SortDir = "asc" | "desc";

export interface GridFilters {
  search: string;
  minScore: number;
  niches: string[];
  statuses: LeadStatus[];
  sortKey: SortKey;
  sortDir: SortDir;
  page: number;
}

export interface ConfirmDialog {
  title: string;
  body: string;
  confirm: string;
  cancel: string;
  tone?: "danger" | "default";
  onConfirm: () => void;
}

const DEFAULT_FILTERS: GridFilters = {
  search: "",
  minScore: 1,
  niches: [],
  statuses: [],
  sortKey: "score",
  sortDir: "desc",
  page: 0,
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

interface StoreValue {
  leads: Lead[];
  addLead: (lead: Lead) => void;

  criteria: Criterion[];
  setCriteria: (next: Criterion[] | ((prev: Criterion[]) => Criterion[])) => void;
  savedCriteria: Criterion[];
  guidance: Guidance;
  setGuidance: (patch: Partial<Guidance>) => void;
  savedGuidance: Guidance;
  starters: StarterCriterion[];
  sample: SampleLead;
  dirty: boolean;
  saveCriteria: () => void;
  discardCriteria: () => void;

  hidden: ContactVisibility;
  toggleHidden: (key: keyof ContactVisibility) => void;
  setAllHidden: (value: boolean) => void;
  anyHidden: boolean;

  filters: GridFilters;
  setFilters: (patch: Partial<GridFilters>) => void;
  clearFilters: () => void;
  filtersActive: boolean;

  selected: Record<string, true>;
  setSelected: (next: Record<string, true>) => void;

  copied: string | null;
  markCopied: (key: string) => void;

  toast: string | null;
  showToast: (message: string) => void;

  dialog: ConfirmDialog | null;
  askConfirm: (dialog: ConfirmDialog) => void;
  closeDialog: () => void;

  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(() => seedLeads.slice());
  const [criteria, setCriteriaState] = useState<Criterion[]>(() => clone(seedCriteria));
  const [savedCriteria, setSavedCriteria] = useState<Criterion[]>(() => clone(seedCriteria));
  const [guidance, setGuidanceState] = useState<Guidance>(() => ({ ...seedGuidance }));
  const [savedGuidance, setSavedGuidance] = useState<Guidance>(() => ({ ...seedGuidance }));

  const [hidden, setHidden] = useState<ContactVisibility>({
    fullName: false,
    email: false,
    phone: false,
  });
  const [filters, setFiltersState] = useState<GridFilters>(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<Record<string, true>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [dialog, setDialog] = useState<ConfirmDialog | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const markCopied = useCallback((key: string) => {
    setCopied(key);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(
      () => setCopied((current) => (current === key ? null : current)),
      2000,
    );
  }, []);

  const setCriteria = useCallback(
    (next: Criterion[] | ((prev: Criterion[]) => Criterion[])) => {
      setCriteriaState((prev) => (typeof next === "function" ? next(prev) : next));
    },
    [],
  );

  const setGuidance = useCallback((patch: Partial<Guidance>) => {
    setGuidanceState((prev) => ({ ...prev, ...patch }));
  }, []);

  const dirty = useMemo(
    () =>
      JSON.stringify(criteria) !== JSON.stringify(savedCriteria) ||
      JSON.stringify(guidance) !== JSON.stringify(savedGuidance),
    [criteria, savedCriteria, guidance, savedGuidance],
  );

  const saveCriteria = useCallback(() => {
    setSavedCriteria(clone(criteria));
    setSavedGuidance({ ...guidance });
    showToast("Criteria saved — new leads use v5");
  }, [criteria, guidance, showToast]);

  const discardCriteria = useCallback(() => {
    setCriteriaState(clone(savedCriteria));
    setGuidanceState({ ...savedGuidance });
    setEditingId(null);
  }, [savedCriteria, savedGuidance]);

  const setFilters = useCallback((patch: Partial<GridFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch }));
  }, []);

  const clearFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

  const filtersActive =
    !!filters.search.trim() ||
    filters.niches.length > 0 ||
    filters.statuses.length > 0 ||
    filters.minScore > 1;

  const anyHidden = hidden.fullName || hidden.email || hidden.phone;

  const value: StoreValue = {
    leads,
    addLead: useCallback((lead: Lead) => setLeads((prev) => [lead, ...prev]), []),
    criteria,
    setCriteria,
    savedCriteria,
    guidance,
    setGuidance,
    savedGuidance,
    starters: starterCriteria,
    sample: sampleLead,
    dirty,
    saveCriteria,
    discardCriteria,
    hidden,
    toggleHidden: useCallback(
      (key: keyof ContactVisibility) =>
        setHidden((prev) => ({ ...prev, [key]: !prev[key] })),
      [],
    ),
    setAllHidden: useCallback(
      (v: boolean) => setHidden({ fullName: v, email: v, phone: v }),
      [],
    ),
    anyHidden,
    filters,
    setFilters,
    clearFilters,
    filtersActive,
    selected,
    setSelected,
    copied,
    markCopied,
    toast,
    showToast,
    dialog,
    askConfirm: setDialog,
    closeDialog: useCallback(() => setDialog(null), []),
    editingId,
    setEditingId,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
