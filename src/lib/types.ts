export type CriterionType = "must_have" | "nice_to_have" | "disqualifier";
export type SourceHint = "website" | "linkedin" | "both";
export type CriterionResult = "met" | "partial" | "not_met" | "unknown";
export type LeadStatus = "scored" | "processing" | "needs_review";
export type EvidenceSource = "website" | "linkedin";
export type Tone = "Direct" | "Warm" | "Formal";

export interface Criterion {
  id: string;
  name: string;
  description: string;
  type: CriterionType;
  weight: number | null;
  source: SourceHint;
  enabled: boolean;
}

export type StarterCriterion = Omit<Criterion, "id" | "enabled">;

export interface CriterionOutcome {
  criterion: string;
  type: CriterionType;
  weight: number | null;
  result: CriterionResult;
  note: string;
}

export interface Evidence {
  source: EvidenceSource;
  location: string;
  snippet: string;
  supports: string[];
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyWebsite: string;
  linkedinUrl: string;
  companyName: string;
  role: string;
  niche: string;
  primaryService: string;
  icpFitScore: number | null;
  status: LeadStatus;
  scoredAt?: string;
  submittedAt?: string;
  durationMs?: number;
  criteriaVersion: string;
  icpFitReason: string | null;
  icebreaker: string | null;
  criteriaResults: CriterionOutcome[];
  evidence: Evidence[];
  unreadableSource?: EvidenceSource | null;
  disqualified?: boolean;
}

export interface Guidance {
  tone: Tone;
  maxLength: number;
  instruction: string;
}

export interface SampleLead {
  companyName: string;
  niche: string;
  results: Record<string, CriterionResult>;
}

/** The five fields a rep submits. */
export interface LeadSubmission {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
}

export type SubmissionField = keyof LeadSubmission;
