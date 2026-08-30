// Postgres schema. The jsonb columns store the exact shapes from lib/types.ts —
// that file stays the contract, and the database never reshapes it.
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type {
  Criterion,
  CriterionOutcome,
  Evidence,
  EvidenceSource,
  Guidance,
  LeadStatus,
} from "../types";
import type { ScoringStep } from "../mock-api";

/**
 * One row per save of the ICP editor. `criteriaVersion` on a lead points here,
 * so a score can always be read back against the criteria that produced it.
 */
export const icpVersions = pgTable("icp_versions", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(), // "v4", "v5", …
  criteria: jsonb("criteria").$type<Criterion[]>().notNull(),
  guidance: jsonb("guidance").$type<Guidance>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: text("id").primaryKey(), // "ld_xxxx", generated app-side

  // the five submitted fields
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  companyWebsite: text("company_website").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),

  // derived by the agent
  companyName: text("company_name").notNull().default("—"),
  role: text("role").notNull().default("—"),
  niche: text("niche").notNull().default("—"),
  primaryService: text("primary_service").notNull().default("—"),

  icpFitScore: integer("icp_fit_score"),
  status: text("status").$type<LeadStatus>().notNull().default("processing"),
  icpFitReason: text("icp_fit_reason"),
  icebreaker: text("icebreaker"),

  criteriaResults: jsonb("criteria_results").$type<CriterionOutcome[]>().notNull().default([]),
  evidence: jsonb("evidence").$type<Evidence[]>().notNull().default([]),

  unreadableSource: text("unreadable_source").$type<EvidenceSource | null>(),
  disqualified: boolean("disqualified").notNull().default(false),

  icpVersionId: integer("icp_version_id").references(() => icpVersions.id),
  criteriaVersion: text("criteria_version").notNull().default("v1"),

  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow().notNull(),
  scoredAt: timestamp("scored_at", { withTimezone: true }),
  durationMs: integer("duration_ms"),
});

/**
 * Live state of one pipeline run. `stages` is the ScoringStep[] the /submit
 * screen polls — stored as-is so the route is a straight read, no translation.
 */
export const leadRuns = pgTable("lead_runs", {
  id: serial("id").primaryKey(),
  leadId: text("lead_id").references(() => leads.id, { onDelete: "cascade" }).notNull(),
  stages: jsonb("stages").$type<ScoringStep[]>().notNull(),
  error: text("error"),
  apifyRunIds: jsonb("apify_run_ids").$type<Record<string, string>>().notNull().default({}),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
});

/**
 * Raw + normalised scraper output, kept forever. This is the audit trail, the
 * cache behind `replay` mode, and the reason re-scoring costs no Apify credit.
 */
export const scrapes = pgTable("scrapes", {
  id: serial("id").primaryKey(),
  leadId: text("lead_id").references(() => leads.id, { onDelete: "cascade" }).notNull(),
  source: text("source").$type<"website" | "linkedin_person" | "linkedin_company">().notNull(),
  actorId: text("actor_id").notNull(),
  apifyRunId: text("apify_run_id"),
  raw: jsonb("raw").notNull(),
  normalized: jsonb("normalized"),
  ok: boolean("ok").notNull().default(true),
  fetchedAt: timestamp("fetched_at", { withTimezone: true }).defaultNow().notNull(),
});
