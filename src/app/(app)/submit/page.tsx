"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ScoreTicks } from "@/components/ui/ScoreTicks";
import { band } from "@/lib/scoring";
import {
  initialSteps,
  runScoring,
  type ScoringStep,
} from "@/lib/mock-api";
import { normaliseUrl, validateAll, validateField } from "@/lib/validation";
import type { Lead, LeadSubmission, SubmissionField } from "@/lib/types";
import { useStore } from "@/state/store";

type Phase = "idle" | "processing" | "done";

const EMPTY: LeadSubmission = {
  fullName: "",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
};

const COUNTRY_CODES = ["+1", "+44", "+49", "+61", "+55"];
const CC_LABEL: Record<string, string> = {
  "+1": "US +1",
  "+44": "UK +44",
  "+49": "DE +49",
  "+61": "AU +61",
  "+55": "BR +55",
};

export default function SubmitPage() {
  const router = useRouter();
  const { addLead } = useStore();

  const [form, setForm] = useState<LeadSubmission>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<SubmissionField, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [cc, setCc] = useState("+1");

  const [phase, setPhase] = useState<Phase>("idle");
  const [steps, setSteps] = useState<ScoringStep[]>([]);
  const [newLead, setNewLead] = useState<Lead | null>(null);

  const cancelRef = useRef<(() => void) | null>(null);
  useEffect(() => () => cancelRef.current?.(), []);

  const onChange = useCallback((field: SubmissionField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const error = validateField(field, value);
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  }, []);

  const onBlur = useCallback((field: SubmissionField) => {
    setForm((prev) => {
      const value = normaliseUrl(field, prev[field]);
      setErrors((prevErrors) => {
        const error = validateField(field, value);
        const next = { ...prevErrors };
        if (error) next[field] = error;
        else delete next[field];
        return next;
      });
      return value === prev[field] ? prev : { ...prev, [field]: value };
    });
  }, []);

  const submit = () => {
    const found = validateAll(form);
    const count = Object.keys(found).length;
    if (count) {
      setErrors(found);
      setFormError(
        count === 1
          ? "One field needs attention before we can score this lead."
          : `${count} fields need attention before we can score this lead.`,
      );
      return;
    }

    setFormError(null);
    setRunError(null);
    setSteps(initialSteps(form));
    setPhase("processing");

    cancelRef.current = runScoring(
      form,
      (index, patch) =>
        setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s))),
      (lead) => {
        addLead(lead);
        setNewLead(lead);
        setPhase("done");
      },
      (message) => {
        setRunError(message);
        setPhase("idle");
      },
    );
  };

  const reset = () => {
    cancelRef.current?.();
    setForm(EMPTY);
    setErrors({});
    setFormError(null);
    setRunError(null);
    setPhase("idle");
    setSteps([]);
    setNewLead(null);
  };

  return (
    <main className="mx-auto max-w-[620px] px-5 pt-11 pb-24 md:px-6">
      {phase === "idle" ? (
        <IdleForm
          form={form}
          errors={errors}
          formError={formError}
          runError={runError}
          cc={cc}
          onCc={(value) => {
            setCc(value);
            const rest = form.phone.trim().replace(/^\+\d+[\s-]*/, "");
            onChange("phone", rest ? `${value} ${rest}` : `${value} `);
          }}
          onChange={onChange}
          onBlur={onBlur}
          onSubmit={submit}
        />
      ) : null}

      {phase === "processing" ? <Processing form={form} steps={steps} /> : null}

      {phase === "done" && newLead ? (
        <Done
          lead={newLead}
          onView={() => router.push(`/leads/${newLead.id}`)}
          onAnother={reset}
        />
      ) : null}
    </main>
  );
}

/* ------------------------------------------------------------------ */

const inputStyle = (invalid: boolean, mono = false) => ({
  width: "100%",
  height: 44,
  padding: "0 12px",
  background: "#fff",
  border: `1px solid ${invalid ? "#c46a5d" : "#cfd4d4"}`,
  borderRadius: 4,
  fontFamily: mono ? "var(--font-mono)" : undefined,
});

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-medium">
      {children}
    </label>
  );
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <div className="mt-1.5 text-[13px] text-[#9e3327]">{children}</div>;
}

interface IdleFormProps {
  form: LeadSubmission;
  errors: Partial<Record<SubmissionField, string>>;
  formError: string | null;
  runError: string | null;
  cc: string;
  onCc: (value: string) => void;
  onChange: (field: SubmissionField, value: string) => void;
  onBlur: (field: SubmissionField) => void;
  onSubmit: () => void;
}

function IdleForm({
  form,
  errors,
  formError,
  runError,
  cc,
  onCc,
  onChange,
  onBlur,
  onSubmit,
}: IdleFormProps) {
  return (
    <div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 34,
          letterSpacing: "-0.01em",
        }}
      >
        Qualify a lead
      </h1>
      <p className="mt-2.5 mb-[30px] text-[var(--app-dim)]">
        We read the company website and the LinkedIn page, then score the lead against your
        ICP criteria.
      </p>

      {formError ? (
        <div
          role="alert"
          className="mb-5 rounded border border-[#f0d3ce] border-l-[3px] border-l-[#9e3327] bg-[#fdf1ef] px-3.5 py-3 text-[13px] text-[#7d2b21]"
        >
          {formError}
        </div>
      ) : null}

      {runError ? (
        <div
          role="alert"
          className="mb-5 rounded border border-[#f0e2c6] border-l-[3px] border-l-[#9a6410] bg-[#fdf7ec] px-3.5 py-3 text-[13px] text-[#7a4f0c]"
        >
          <strong className="font-medium">The run did not finish.</strong> {runError}
          <div className="mt-1 text-[var(--app-faint)]">
            The details are unchanged — try again, or score a different lead.
          </div>
        </div>
      ) : null}

      <form
        className="rounded-lg border border-[var(--app-line)] bg-white p-6"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        noValidate
      >
        <div className="grid gap-5">
          <div>
            <Label htmlFor="f-name">Full name</Label>
            <input
              id="f-name"
              type="text"
              placeholder="Jordan Ellis"
              value={form.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              onBlur={() => onBlur("fullName")}
              aria-invalid={!!errors.fullName}
              style={inputStyle(!!errors.fullName)}
            />
            <FieldError>{errors.fullName}</FieldError>
          </div>

          <div>
            <Label htmlFor="f-email">Email</Label>
            <input
              id="f-email"
              type="email"
              placeholder="jordan@acme.io"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              onBlur={() => onBlur("email")}
              aria-invalid={!!errors.email}
              style={inputStyle(!!errors.email)}
            />
            <FieldError>{errors.email}</FieldError>
          </div>

          <div>
            <Label htmlFor="f-phone">Phone number</Label>
            <div className="flex gap-2">
              <select
                aria-label="Country code"
                value={cc}
                onChange={(e) => onCc(e.target.value)}
                style={{
                  height: 44,
                  padding: "0 8px",
                  background: "#fff",
                  border: "1px solid #cfd4d4",
                  borderRadius: 4,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {COUNTRY_CODES.map((code) => (
                  <option key={code} value={code}>
                    {CC_LABEL[code]}
                  </option>
                ))}
              </select>
              <input
                id="f-phone"
                type="tel"
                placeholder="+1 (415) 555-0148"
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                onBlur={() => onBlur("phone")}
                aria-invalid={!!errors.phone}
                style={{ ...inputStyle(!!errors.phone, true), flex: 1, width: "auto" }}
              />
            </div>
            <FieldError>{errors.phone}</FieldError>
          </div>

          <div>
            <Label htmlFor="f-site">Company website</Label>
            <input
              id="f-site"
              type="url"
              placeholder="acme.io"
              value={form.website}
              onChange={(e) => onChange("website", e.target.value)}
              onBlur={() => onBlur("website")}
              aria-invalid={!!errors.website}
              style={inputStyle(!!errors.website, true)}
            />
            <FieldError>{errors.website}</FieldError>
            {/^https:\/\//.test(form.website) ? (
              <div className="mt-1.5 text-xs text-[var(--app-faint)]">
                Saved as {form.website}
              </div>
            ) : null}
          </div>

          <div>
            <Label htmlFor="f-li">LinkedIn URL</Label>
            <input
              id="f-li"
              type="url"
              placeholder="linkedin.com/company/acme"
              value={form.linkedin}
              onChange={(e) => onChange("linkedin", e.target.value)}
              onBlur={() => onBlur("linkedin")}
              aria-invalid={!!errors.linkedin}
              style={inputStyle(!!errors.linkedin, true)}
            />
            <FieldError>{errors.linkedin}</FieldError>
          </div>
        </div>

        <div className="mt-[26px] border-t border-[#eceeee] pt-5">
          <button
            type="submit"
            className="h-[46px] w-full cursor-pointer rounded border border-[var(--app-teal)] bg-[var(--app-teal)] text-[15px] font-medium text-white"
          >
            Score this lead
          </button>
          <div className="mt-3 text-[13px] text-[var(--app-faint)]">
            We read the company website and their LinkedIn, then score the lead against your
            active ICP criteria. It usually takes a minute or two. Nothing is sent to the lead.
          </div>
        </div>
      </form>

    </div>
  );
}

function Processing({ form, steps }: { form: LeadSubmission; steps: ScoringStep[] }) {
  const company = form.website.replace(/^https?:\/\//, "").replace(/\/$/, "") || "New lead";

  return (
    <div className="ib-rise">
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 34,
          letterSpacing: "-0.01em",
        }}
      >
        Reading the sources
      </h1>
      <p className="mt-2.5 mb-[30px] text-[var(--app-dim)]">
        {company} · two public pages, seven criteria.
      </p>

      <div className="overflow-hidden rounded-lg border border-[var(--app-line)] bg-white">
        {steps.map((step) => {
          const done = step.state === "done";
          const active = step.state === "active";
          const failed = step.state === "failed";
          const ring = done ? "#2c6a4c" : failed ? "#9a6410" : active ? "var(--app-teal)" : "#dfe3e3";
          const bar = failed ? "#9a6410" : done ? "#2c6a4c" : "var(--app-teal)";

          return (
            <div
              key={step.id}
              className="flex gap-3.5 border-b border-[#f2f3f3] px-5 py-[18px]"
            >
              <div
                style={{
                  flex: "none",
                  width: 18,
                  height: 18,
                  marginTop: 2,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  border: `1.5px solid ${ring}`,
                  background: done ? "#2c6a4c" : failed ? "#9a6410" : "transparent",
                  color: "#fff",
                  font: "500 11px/1 var(--font-mono)",
                }}
              >
                {done ? "✓" : failed ? "!" : ""}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-3">
                  <span
                    className="font-medium"
                    style={{
                      color: step.state === "pending" ? "var(--app-faint)" : "var(--app-ink)",
                    }}
                  >
                    {step.label}
                  </span>
                  <span
                    style={{ font: "400 12px/1.5 var(--font-mono)", color: "var(--app-faint)" }}
                  >
                    {done ? "Done" : failed ? "Unreachable" : active ? "Reading…" : "Queued"}
                  </span>
                </div>
                <div className="mt-1 text-[13px] text-[var(--app-faint)]">{step.detail}</div>
                <div className="mt-2.5 h-[3px] overflow-hidden rounded-sm bg-[#eceeee]">
                  <div
                    style={{
                      height: 3,
                      width: done || failed ? "100%" : active ? "65%" : "0%",
                      background: bar,
                      transition: "width .9s linear",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-[13px] text-[var(--app-faint)]">
        You can leave this page — scoring continues and the lead appears in the list as soon
        as it is done.
      </div>
    </div>
  );
}

function Done({
  lead,
  onView,
  onAnother,
}: {
  lead: Lead;
  onView: () => void;
  onAnother: () => void;
}) {
  const b = band(lead.icpFitScore);
  const partial = lead.status === "needs_review";

  return (
    <div className="ib-rise">
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 34,
          letterSpacing: "-0.01em",
        }}
      >
        {partial ? "Scored, with one source missing" : `Scored ${lead.icpFitScore} out of 100`}
      </h1>
      <p className="mt-2.5 mb-6 text-[var(--app-dim)]">
        {lead.fullName} at {lead.companyName} · scored in{" "}
        {((lead.durationMs ?? 0) / 1000).toFixed(1)}s
      </p>

      {partial ? (
        <div
          role="alert"
          className="mb-5 rounded border border-[#ecdfc4] border-l-[3px] border-l-[#9a6410] bg-[#fdf7ec] px-3.5 py-3 text-[13px] text-[#7a5210]"
        >
          We couldn&rsquo;t reach linkedin.com for {lead.companyName}. Check the URL or try
          again — everything else on this lead was scored normally.
        </div>
      ) : null}

      <div className="rounded-lg border border-[var(--app-line)] bg-white p-6">
        <div className="flex items-start gap-5">
          <div>
            <ScoreTicks score={lead.icpFitScore} width={5} height={38} gap={2} animate />
            <div
              className="tabular mt-2"
              style={{
                font: "500 44px/1 var(--font-mono)",
                letterSpacing: "-0.02em",
                color: b.color,
              }}
            >
              {lead.icpFitScore}
              <span className="text-[15px] text-[var(--app-faint)]">/100</span>
            </div>
            <div className="text-xs font-medium" style={{ color: b.color }}>
              {b.label}
            </div>
          </div>
          <div className="min-w-0 flex-1 border-l border-[#eceeee] pl-5">
            <div className="text-base font-medium">
              {lead.companyName} · {lead.niche}
            </div>
            <div className="mt-2 text-[13px] text-[var(--app-dim)]">{lead.icpFitReason}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 border-t border-[#eceeee] pt-5 md:flex-row">
          <button
            type="button"
            onClick={onView}
            className="h-11 flex-1 cursor-pointer rounded border border-[var(--app-teal)] bg-[var(--app-teal)] font-medium text-white"
          >
            View lead
          </button>
          <button
            type="button"
            onClick={onAnother}
            className="h-11 flex-1 cursor-pointer rounded border border-[#cfd4d4] bg-white font-medium text-[var(--app-ink)]"
          >
            Qualify another lead
          </button>
        </div>
      </div>
    </div>
  );
}
