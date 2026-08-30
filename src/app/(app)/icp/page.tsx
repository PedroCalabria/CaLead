"use client";

import { useMemo, useState } from "react";
import { CriterionEditor } from "@/components/icp/CriterionEditor";
import { ScoreTicks } from "@/components/ui/ScoreTicks";
import { Switch } from "@/components/ui/Switch";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  RESULT_LABEL,
  SOURCE_LABEL,
  TYPE_LABEL,
  band,
  scoreFrom,
  weightBudget,
} from "@/lib/scoring";
import type { Criterion, Tone } from "@/lib/types";
import { useStore } from "@/state/store";

const newId = () => `cr_${Math.random().toString(16).slice(2, 6)}`;
const TONES: Tone[] = ["Direct", "Warm", "Formal"];

export default function IcpPage() {
  const {
    criteria,
    setCriteria,
    guidance,
    setGuidance,
    starters,
    sample,
    dirty,
    saveCriteria,
    discardCriteria,
    askConfirm,
    editingId,
    setEditingId,
  } = useStore();

  const isMobile = useIsMobile();
  const [dragId, setDragId] = useState<string | null>(null);

  const budget = weightBudget(criteria);
  const preview = useMemo(() => scoreFrom(criteria, sample.results), [criteria, sample]);
  const previewBand = band(preview.score);
  const enabledCount = criteria.filter((c) => c.enabled).length;
  const activeDqs = criteria.filter((c) => c.enabled && c.type === "disqualifier");

  const patch = (id: string, next: Partial<Criterion>) =>
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, ...next } : c)));

  const addCriterion = () => {
    const id = newId();
    setCriteria((prev) => [
      ...prev,
      {
        id,
        name: "New criterion",
        description: "",
        type: "nice_to_have",
        weight: 3,
        source: "both",
        enabled: true,
      },
    ]);
    setEditingId(id);
  };

  const duplicate = (id: string) =>
    setCriteria((prev) => {
      const i = prev.findIndex((c) => c.id === id);
      if (i < 0) return prev;
      const copy = { ...prev[i], id: newId(), name: `${prev[i].name} (copy)` };
      const out = prev.slice();
      out.splice(i + 1, 0, copy);
      return out;
    });

  const move = (id: string, delta: number) =>
    setCriteria((prev) => {
      const i = prev.findIndex((c) => c.id === id);
      const j = i + delta;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const out = prev.slice();
      [out[i], out[j]] = [out[j], out[i]];
      return out;
    });

  const drop = (targetId: string) => {
    const from = dragId;
    setDragId(null);
    if (!from || from === targetId) return;
    setCriteria((prev) => {
      const i = prev.findIndex((c) => c.id === from);
      const j = prev.findIndex((c) => c.id === targetId);
      if (i < 0 || j < 0) return prev;
      const out = prev.slice();
      const [item] = out.splice(i, 1);
      out.splice(j, 0, item);
      return out;
    });
  };

  const askDelete = (c: Criterion) =>
    askConfirm({
      title: `Delete “${c.name}”?`,
      body: "Existing lead scores won’t change. New leads will be scored without this criterion.",
      confirm: "Delete criterion",
      cancel: "Keep it",
      tone: "danger",
      onConfirm: () => {
        setCriteria((prev) => prev.filter((x) => x.id !== c.id));
        setEditingId(null);
      },
    });

  const editing = criteria.find((c) => c.id === editingId) ?? null;

  return (
    <main className="mx-auto max-w-[1280px] px-5 pt-6 pb-[120px] md:px-6">
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 30,
            letterSpacing: "-0.01em",
          }}
        >
          ICP criteria
        </h1>
        <p className="mt-2 max-w-[70ch] text-[var(--app-dim)]">
          These criteria decide every score. Write them in your own words, say where to look,
          and weight what matters. Changes apply to new leads only.
        </p>
      </div>

      <div className="mt-5 grid items-start gap-4 md:grid-cols-[1fr_340px]">
        <div className="grid min-w-0 gap-4">
          {criteria.length === 0 ? (
            <div className="rounded-lg border border-[var(--app-line)] bg-white p-8">
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24 }}>
                Define what a good lead looks like
              </div>
              <p className="mt-2.5 max-w-[56ch] text-[var(--app-dim)]">
                Nothing is scored until there is at least one criterion. Start with these four
                and edit them, or write your own.
              </p>
              <div className="mt-[18px] grid gap-2">
                {starters.map((st) => (
                  <div
                    key={st.name}
                    className="flex items-center justify-between gap-3 rounded-md border border-[#e8eaea] px-3.5 py-3"
                  >
                    <div>
                      <div className="font-medium">{st.name}</div>
                      <div className="text-xs text-[var(--app-faint)]">
                        {TYPE_LABEL[st.type]}
                        {st.weight ? ` · w${st.weight}` : ""}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setCriteria((prev) => [...prev, { ...st, id: newId(), enabled: true }])
                      }
                      className="h-8 cursor-pointer rounded border-0 bg-[var(--app-teal)] px-3 text-[13px] font-medium text-white"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addCriterion}
                className="mt-4 h-[38px] cursor-pointer rounded border border-[#cfd4d4] bg-white px-3.5 font-medium"
              >
                Write a criterion from scratch
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-[var(--app-line)] bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-[#eceeee] px-[18px] py-3.5">
                <div className="type-label !text-[var(--app-faint)]">
                  Criteria · drag to reorder
                </div>
                <button
                  type="button"
                  onClick={addCriterion}
                  className="h-8 cursor-pointer rounded border border-[#dde0e0] bg-white px-3 text-[13px] font-medium"
                >
                  Add criterion
                </button>
              </div>

              {criteria.map((c) => {
                const isDq = c.type === "disqualifier";
                const points = isDq || !budget ? 0 : ((c.weight ?? 0) / budget) * 100;
                const inlineOpen = !isMobile && editingId === c.id;

                return (
                  <div
                    key={c.id}
                    draggable
                    onDragStart={() => setDragId(c.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => drop(c.id)}
                    className="border-b border-[#f2f3f3]"
                    style={{
                      background: c.enabled ? "#fff" : "#fafbfb",
                      opacity: dragId === c.id ? 0.5 : 1,
                    }}
                  >
                    <div className="flex items-start gap-3 px-[18px] py-3.5">
                      <div
                        aria-hidden
                        className="mt-0.5 hidden w-3.5 flex-none cursor-grab text-[13px] leading-none text-[#c3caca] md:block"
                      >
                        ⠿
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="font-medium"
                            style={{
                              color: isDq
                                ? "#9e3327"
                                : c.enabled
                                  ? "var(--app-ink)"
                                  : "var(--app-faint)",
                            }}
                          >
                            {c.name}
                          </span>
                          <span
                            style={{
                              font: "400 11px/1 var(--font-mono)",
                              color: "var(--app-faint)",
                            }}
                          >
                            {isDq ? "n/a" : `w${c.weight ?? 0}`}
                          </span>
                        </div>
                        <div className="mt-[3px] text-xs text-[var(--app-faint)]">
                          {TYPE_LABEL[c.type]} · {SOURCE_LABEL[c.source]} ·{" "}
                          {isDq
                            ? "Forces a score of 20 when met"
                            : c.enabled
                              ? `Worth up to ${Math.round(points)} of 100 points`
                              : "Disabled — no effect on scores"}
                        </div>
                        {c.description ? (
                          <div className="mt-1.5 text-[13px] text-[var(--app-dim)]">
                            {c.description}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-none items-center gap-1.5">
                        <Switch
                          checked={c.enabled}
                          onChange={() => patch(c.id, { enabled: !c.enabled })}
                          label={`Enable ${c.name}`}
                        />
                        <IconBtn
                          onClick={() => setEditingId(editingId === c.id ? null : c.id)}
                          wide
                        >
                          {editingId === c.id ? "Done" : "Edit"}
                        </IconBtn>
                        <IconBtn onClick={() => duplicate(c.id)} title="Duplicate" desktopOnly>
                          ⧉
                        </IconBtn>
                        <IconBtn onClick={() => move(c.id, -1)} title="Move up">
                          ↑
                        </IconBtn>
                        <IconBtn onClick={() => move(c.id, 1)} title="Move down">
                          ↓
                        </IconBtn>
                        <IconBtn onClick={() => askDelete(c)} title="Delete" danger>
                          ✕
                        </IconBtn>
                      </div>
                    </div>

                    {inlineOpen ? (
                      <div className="grid gap-3.5 px-[18px] pt-1 pb-[18px] pl-11">
                        <CriterionEditor
                          criterion={c}
                          onPatch={(next) => patch(c.id, next)}
                          layout="inline"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}

          <div className="rounded-lg border border-[var(--app-line)] bg-white p-[18px]">
            <div className="type-label !text-[var(--app-faint)]">Weight budget</div>
            <div className="mt-3 flex items-baseline gap-2.5">
              <span className="tabular" style={{ font: "500 34px/1 var(--font-mono)" }}>
                {budget}
              </span>
              <span className="text-[var(--app-dim)]">
                {budget} points of weight across {enabledCount} enabled criteria
              </span>
            </div>
            <p className="mt-2.5 text-[13px] text-[var(--app-dim)]">
              {budget
                ? `Each weight point is worth ${(9 / budget).toFixed(2)} of the 1–10 scale. A lead that meets nothing scores 1.`
                : "Add a weighted criterion to build the scale."}
            </p>
            <p className="mt-2 text-[13px] text-[var(--app-dim)]">
              {activeDqs.length
                ? `${activeDqs.length === 1 ? "One disqualifier is active: " : `${activeDqs.length} disqualifiers are active: `}${activeDqs
                    .map((c) => c.name)
                    .join(", ")}. Any one of them forces a score of 20, whatever the rest of the criteria say.`
                : "No disqualifiers are active. Every criterion contributes proportionally."}
            </p>
          </div>

          <div className="rounded-lg border border-[var(--app-line)] bg-white p-[18px]">
            <div className="type-label !text-[var(--app-faint)]">Icebreaker guidance</div>
            <div className="mt-3.5 flex flex-wrap gap-6">
              <div>
                <div className="mb-2 text-xs font-medium text-[var(--app-dim)]">Tone</div>
                <div className="flex gap-1.5">
                  {TONES.map((tone) => {
                    const on = guidance.tone === tone;
                    return (
                      <button
                        key={tone}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setGuidance({ tone })}
                        style={{
                          height: 34,
                          padding: "0 14px",
                          background: on ? "var(--app-teal)" : "#fff",
                          color: on ? "#fff" : "var(--app-dim)",
                          border: "1px solid #dde0e0",
                          borderRadius: 4,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        {tone}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-xs font-medium text-[var(--app-dim)]"
                  htmlFor="max-length"
                >
                  Maximum length
                </label>
                <div className="flex items-center gap-2.5">
                  <input
                    id="max-length"
                    type="number"
                    min={120}
                    max={600}
                    step={20}
                    value={guidance.maxLength}
                    onChange={(e) => setGuidance({ maxLength: Number(e.target.value) })}
                    className="h-[34px] w-[100px] rounded border border-[#dde0e0] px-2.5 font-mono"
                  />
                  <span className="text-[13px] text-[var(--app-faint)]">characters</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label
                className="mb-1.5 block text-xs font-medium text-[var(--app-dim)]"
                htmlFor="instruction"
              >
                Extra instruction (optional)
              </label>
              <textarea
                id="instruction"
                rows={2}
                value={guidance.instruction}
                onChange={(e) => setGuidance({ instruction: e.target.value })}
                placeholder="Always reference something specific from their site, never mention their funding"
                className="w-full resize-y rounded border border-[#dde0e0] px-2.5 py-[9px]"
              />
            </div>
          </div>
        </div>

        {/* ---------- Live preview ---------- */}
        <aside className="rounded-lg border border-[var(--app-line)] bg-white p-[18px] md:sticky md:top-[72px]">
          <div className="type-label !text-[var(--app-faint)]">Live preview</div>
          <div className="mt-1.5 text-xs text-[var(--app-faint)]">
            Your current criteria applied to one sample lead.
          </div>
          <div className="mt-3.5 font-medium">
            {sample.companyName} · {sample.niche}
          </div>

          <div className="mt-3.5 flex items-end gap-3.5">
            <div
              className="tabular"
              style={{
                font: "500 48px/0.85 var(--font-mono)",
                letterSpacing: "-0.02em",
                color: previewBand.color,
              }}
            >
              {preview.score}
              <span className="text-[15px] text-[var(--app-faint)]">/100</span>
            </div>
            <ScoreTicks score={preview.score} width={5} height={34} gap={2} />
          </div>

          <div className="mt-2 text-[13px] font-medium" style={{ color: previewBand.color }}>
            {previewBand.label}
          </div>
          <p className="mt-2 text-[13px] text-[var(--app-dim)]">
            {preview.disqualifiedBy
              ? `Disqualified by “${preview.disqualifiedBy}”. The rest of the criteria are ignored.`
              : `${
                  criteria.filter(
                    (c) =>
                      c.enabled &&
                      c.type !== "disqualifier" &&
                      sample.results[c.name] === "met",
                  ).length
                } of ${
                  criteria.filter((c) => c.enabled && c.type !== "disqualifier").length
                } weighted criteria met outright, ${
                  criteria.filter(
                    (c) =>
                      c.enabled &&
                      c.type !== "disqualifier" &&
                      sample.results[c.name] === "partial",
                  ).length
                } partially.`}
          </p>

          <div className="mt-3.5 grid gap-[7px] border-t border-[#f2f3f3] pt-3.5">
            {criteria
              .filter((c) => c.enabled)
              .map((c) => {
                const r = sample.results[c.name] ?? "unknown";
                const color =
                  r === "met"
                    ? c.type === "disqualifier"
                      ? "#9e3327"
                      : "#2c6a4c"
                    : r === "partial"
                      ? "#9a6410"
                      : "var(--app-faint)";
                return (
                  <div key={c.id} className="flex items-baseline justify-between gap-2.5 text-xs">
                    <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[var(--app-dim)]">
                      {c.name}
                    </span>
                    <span className="flex-none font-mono" style={{ color }}>
                      {c.type === "disqualifier"
                        ? r === "met"
                          ? "Triggered"
                          : "Clear"
                        : RESULT_LABEL[r]}
                    </span>
                  </div>
                );
              })}
          </div>
        </aside>
      </div>

      {dirty ? (
        <div className="fixed inset-x-0 bottom-0 z-40 flex flex-wrap items-center justify-between gap-4 bg-[var(--app-ink)] px-6 py-3 text-white">
          <span className="text-[13px]">
            Unsaved changes to your ICP criteria. New leads keep using the saved version until
            you save.
          </span>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={discardCriteria}
              className="h-[38px] cursor-pointer rounded border border-[#3a4247] bg-transparent px-3.5 font-medium text-[#b9c0c2]"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={saveCriteria}
              className="h-[38px] cursor-pointer rounded border-0 bg-white px-4 font-medium text-[var(--app-ink)]"
            >
              Save changes
            </button>
          </div>
        </div>
      ) : null}

      {isMobile && editing ? (
        <div className="fixed inset-0 z-50 overflow-auto bg-white px-5 pt-[18px] pb-10">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[17px] font-medium">Edit criterion</span>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="h-10 cursor-pointer rounded border border-[#dde0e0] bg-white px-3.5 font-medium"
            >
              Done
            </button>
          </div>

          <div className="mt-5 grid gap-[18px]">
            <CriterionEditor
              criterion={editing}
              onPatch={(next) => patch(editing.id, next)}
              layout="sheet"
            />

            <div className="flex items-center justify-between gap-3 border-t border-[#f2f3f3] py-3.5">
              <span className="font-medium">Enabled</span>
              <Switch
                checked={editing.enabled}
                onChange={() => patch(editing.id, { enabled: !editing.enabled })}
                label="Enabled"
                size="lg"
              />
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => duplicate(editing.id)}
                className="h-[46px] flex-1 cursor-pointer rounded border border-[#dde0e0] bg-white font-medium"
              >
                Duplicate
              </button>
              <button
                type="button"
                onClick={() => askDelete(editing)}
                className="h-[46px] flex-1 cursor-pointer rounded border border-[#e8d6d3] bg-white font-medium text-[#9e3327]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  danger,
  wide,
  desktopOnly,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title?: string;
  danger?: boolean;
  wide?: boolean;
  desktopOnly?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={
        desktopOnly
          ? "hidden md:inline-flex md:items-center md:justify-center"
          : "inline-flex items-center justify-center"
      }
      style={{
        height: 30,
        width: wide ? undefined : 30,
        padding: wide ? "0 10px" : 0,
        background: "#fff",
        border: `1px solid ${danger ? "#e8d6d3" : "#dde0e0"}`,
        borderRadius: 4,
        fontSize: 12,
        color: danger ? "#9e3327" : undefined,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
