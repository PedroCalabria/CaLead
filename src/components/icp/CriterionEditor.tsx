"use client";

import type { Criterion, CriterionType, SourceHint } from "@/lib/types";

interface CriterionEditorProps {
  criterion: Criterion;
  onPatch: (patch: Partial<Criterion>) => void;
  /** The mobile sheet uses taller controls and full-width fields. */
  layout: "inline" | "sheet";
}

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--app-dim)]";

export function CriterionEditor({ criterion, onPatch, layout }: CriterionEditorProps) {
  const sheet = layout === "sheet";
  const isDq = criterion.type === "disqualifier";
  const height = sheet ? 46 : 38;

  const control = {
    height,
    padding: sheet ? "0 12px" : "0 10px",
    border: "1px solid #dde0e0",
    borderRadius: 4,
    width: sheet ? "100%" : undefined,
  } as const;

  return (
    <>
      <div>
        <label className={labelClass} htmlFor={`name-${criterion.id}`}>
          Name
        </label>
        <input
          id={`name-${criterion.id}`}
          type="text"
          value={criterion.name}
          onChange={(e) => onPatch({ name: e.target.value })}
          style={{ ...control, width: "100%" }}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor={`desc-${criterion.id}`}>
          What to look for
        </label>
        <textarea
          id={`desc-${criterion.id}`}
          rows={sheet ? 4 : 3}
          value={criterion.description}
          onChange={(e) => onPatch({ description: e.target.value })}
          style={{
            width: "100%",
            padding: sheet ? "10px 12px" : "9px 10px",
            border: "1px solid #dde0e0",
            borderRadius: 4,
            resize: "vertical",
          }}
        />
      </div>

      <div className={sheet ? "grid gap-[18px]" : "flex flex-wrap gap-3"}>
        <div>
          <label className={labelClass} htmlFor={`type-${criterion.id}`}>
            Type
          </label>
          <select
            id={`type-${criterion.id}`}
            value={criterion.type}
            onChange={(e) => {
              const type = e.target.value as CriterionType;
              onPatch({
                type,
                weight: type === "disqualifier" ? null : (criterion.weight ?? 3),
              });
            }}
            style={{ ...control, padding: sheet ? "0 10px" : "0 8px" }}
          >
            <option value="must_have">Must have</option>
            <option value="nice_to_have">Nice to have</option>
            <option value="disqualifier">Disqualifier</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor={`weight-${criterion.id}`}>
            Weight
          </label>
          <select
            id={`weight-${criterion.id}`}
            value={criterion.weight ?? ""}
            disabled={isDq}
            onChange={(e) => onPatch({ weight: Number(e.target.value) })}
            style={{ ...control, padding: sheet ? "0 10px" : "0 8px" }}
          >
            {[1, 2, 3, 4, 5].map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor={`source-${criterion.id}`}>
            Source hint
          </label>
          <select
            id={`source-${criterion.id}`}
            value={criterion.source}
            onChange={(e) => onPatch({ source: e.target.value as SourceHint })}
            style={{ ...control, padding: sheet ? "0 10px" : "0 8px" }}
          >
            <option value="website">Website</option>
            <option value="linkedin">LinkedIn</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      {isDq ? (
        <div className="rounded border-l-[3px] border-l-[#9e3327] bg-[#fdf3f1] px-3 py-2.5 text-xs text-[#7d2b21]">
          A disqualifier has no weight. When it is met, the lead scores 2 regardless of
          everything else.
        </div>
      ) : null}
    </>
  );
}
