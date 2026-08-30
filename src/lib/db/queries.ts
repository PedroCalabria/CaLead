import { desc, eq } from "drizzle-orm";
import { getDb } from "./index";
import { icpVersions, leadRuns, leads, scrapes } from "./schema";
import { criteria as seedCriteria, guidance as seedGuidance } from "../mock-data";
import type {
  Criterion,
  Guidance,
  Lead,
  LeadStatus,
  LeadSubmission,
} from "../types";
import type { ScoringStep } from "../mock-api";
import type { ScrapeRecord } from "../agent/pipeline";

// --- ICP ----------------------------------------------------------------

export interface IcpVersion {
  id: number;
  label: string;
  criteria: Criterion[];
  guidance: Guidance;
}

/** The newest saved ICP, seeding one from mock-data on an empty database. */
export async function getActiveIcp(): Promise<IcpVersion> {
  const db = getDb();
  const [latest] = await db
    .select()
    .from(icpVersions)
    .orderBy(desc(icpVersions.id))
    .limit(1);

  if (latest) {
    return {
      id: latest.id,
      label: latest.label,
      criteria: latest.criteria,
      guidance: latest.guidance,
    };
  }
  return saveIcp(seedCriteria, seedGuidance);
}

/** Every save is a new row — a score can always be read back against its criteria. */
export async function saveIcp(
  criteria: Criterion[],
  guidance: Guidance,
): Promise<IcpVersion> {
  const db = getDb();
  const [previous] = await db
    .select({ label: icpVersions.label })
    .from(icpVersions)
    .orderBy(desc(icpVersions.id))
    .limit(1);

  const previousNumber = Number(previous?.label?.replace(/^v/, "") ?? 0);
  const label = `v${previousNumber + 1}`;

  const [row] = await db
    .insert(icpVersions)
    .values({ label, criteria, guidance })
    .returning();

  return { id: row.id, label: row.label, criteria, guidance };
}

// --- leads --------------------------------------------------------------

function newLeadId(): string {
  return `ld_${Math.random().toString(16).slice(2, 8)}`;
}

export async function createLead(
  submission: LeadSubmission,
  icp: IcpVersion,
): Promise<string> {
  const db = getDb();
  const id = newLeadId();

  await db.insert(leads).values({
    id,
    fullName: submission.fullName,
    email: submission.email,
    phone: submission.phone,
    companyWebsite: submission.website,
    linkedinUrl: submission.linkedin,
    status: "processing",
    icpVersionId: icp.id,
    criteriaVersion: icp.label,
  });

  return id;
}

export async function finishLead(
  id: string,
  lead: Omit<Lead, "id">,
  icp: IcpVersion,
): Promise<void> {
  const db = getDb();
  await db
    .update(leads)
    .set({
      companyName: lead.companyName,
      role: lead.role,
      niche: lead.niche,
      primaryService: lead.primaryService,
      icpFitScore: lead.icpFitScore,
      status: lead.status,
      icpFitReason: lead.icpFitReason,
      icebreaker: lead.icebreaker,
      criteriaResults: lead.criteriaResults,
      evidence: lead.evidence,
      unreadableSource: lead.unreadableSource ?? null,
      disqualified: lead.disqualified ?? false,
      icpVersionId: icp.id,
      criteriaVersion: icp.label,
      scoredAt: lead.scoredAt ? new Date(lead.scoredAt) : new Date(),
      durationMs: lead.durationMs ?? null,
    })
    .where(eq(leads.id, id));
}

export async function markLeadFailed(id: string): Promise<void> {
  const db = getDb();
  await db.update(leads).set({ status: "needs_review" }).where(eq(leads.id, id));
}

type LeadRow = typeof leads.$inferSelect;

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    companyWebsite: row.companyWebsite,
    linkedinUrl: row.linkedinUrl,
    companyName: row.companyName,
    role: row.role,
    niche: row.niche,
    primaryService: row.primaryService,
    icpFitScore: row.icpFitScore,
    status: row.status as LeadStatus,
    scoredAt: row.scoredAt?.toISOString(),
    submittedAt: row.submittedAt?.toISOString(),
    durationMs: row.durationMs ?? undefined,
    criteriaVersion: row.criteriaVersion,
    icpFitReason: row.icpFitReason,
    icebreaker: row.icebreaker,
    criteriaResults: row.criteriaResults,
    evidence: row.evidence,
    unreadableSource: row.unreadableSource ?? null,
    disqualified: row.disqualified,
  };
}

export async function getLead(id: string): Promise<Lead | null> {
  const db = getDb();
  const [row] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return row ? toLead(row) : null;
}

export async function listLeads(): Promise<Lead[]> {
  const db = getDb();
  const rows = await db.select().from(leads).orderBy(desc(leads.submittedAt));
  return rows.map(toLead);
}

// --- runs ---------------------------------------------------------------

export async function createRun(leadId: string, stages: ScoringStep[]): Promise<void> {
  const db = getDb();
  await db.insert(leadRuns).values({ leadId, stages });
}

export async function getRun(leadId: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(leadRuns)
    .where(eq(leadRuns.leadId, leadId))
    .orderBy(desc(leadRuns.id))
    .limit(1);
  return row ?? null;
}

export async function setStages(leadId: string, stages: ScoringStep[]): Promise<void> {
  const db = getDb();
  await db.update(leadRuns).set({ stages }).where(eq(leadRuns.leadId, leadId));
}

export async function finishRun(leadId: string, error?: string): Promise<void> {
  const db = getDb();
  await db
    .update(leadRuns)
    .set({ finishedAt: new Date(), error: error ?? null })
    .where(eq(leadRuns.leadId, leadId));
}

// --- scrapes ------------------------------------------------------------

export async function saveScrapes(
  leadId: string,
  records: ScrapeRecord[],
): Promise<void> {
  if (!records.length) return;
  const db = getDb();
  await db.insert(scrapes).values(
    records.map((record) => ({
      leadId,
      source: record.source,
      actorId: record.actorId,
      apifyRunId: record.apifyRunId,
      raw: record.raw ?? null,
      normalized: record.normalized ?? null,
      ok: record.ok,
    })),
  );
}

export async function getScrapes(leadId: string) {
  const db = getDb();
  return db.select().from(scrapes).where(eq(scrapes.leadId, leadId));
}
