// Call 1 of 2: judge the lead against the ICP criteria and cite evidence.
// It never returns a score — scoreFrom() in lib/scoring.ts owns the arithmetic.
import { generateObject } from "ai";
import { z } from "zod";
import { model } from "./model";
import { renderContext, type ScrapedContext } from "./context";
import { SOURCE_LABEL, TYPE_LABEL } from "../scoring";
import type { Criterion } from "../types";

// `note` sits before `result` deliberately: the model writes its reasoning
// first and commits to a verdict second. Field order is not cosmetic here.
const QualifySchema = z.object({
  companyName: z.string().describe("The company's own name, as it writes it."),
  role: z.string().describe("The lead's job title, or an em dash if unknown."),
  niche: z.string().describe("Short market descriptor, e.g. 'B2B SaaS — HR tech'."),
  primaryService: z.string().describe("One line on what the company sells."),
  criteriaResults: z.array(
    z.object({
      criterion: z.string().describe("Criterion name, copied exactly."),
      note: z.string().describe("One sentence of reasoning, citing what you read."),
      result: z.enum(["met", "partial", "not_met", "unknown"]),
    }),
  ),
  evidence: z.array(
    z.object({
      source: z.enum(["website", "linkedin"]),
      location: z.string().describe("The section heading you took this from."),
      snippet: z.string().describe("Copied word-for-word from the source text."),
      supports: z.array(z.string()).describe("Criterion names this supports."),
    }),
  ),
  icpFitReason: z.string().describe("Two or three sentences explaining the fit."),
});

export type QualifyResult = z.infer<typeof QualifySchema>;

const SYSTEM = `You qualify B2B sales leads for an SDR team.

You are given text scraped from a company's website and LinkedIn, and a list of the
team's ICP criteria. Judge each criterion from that text alone.

Rules you must follow:

1. Judge only from the supplied text. If the text does not settle a criterion, the
   result is "unknown". Never infer from what a company of this type usually does.
2. If a source is marked UNREACHABLE, every criterion that depends on it is
   "unknown". Do not substitute a guess from the other source.
3. Every evidence snippet must be copied word-for-word from the supplied text.
   Do not paraphrase, tidy, shorten, or join fragments. Snippets are checked
   against the source automatically, and anything that does not match is discarded.
4. "supports" must contain criterion names copied exactly as they were given.
5. Return one entry in criteriaResults for every criterion, in the order given.
6. Write "note" before deciding "result" — reason first, then commit.

Result meanings: "met" the text clearly establishes it; "partial" there is real but
incomplete support; "not_met" the text contradicts it; "unknown" the text is silent.

For a disqualifier criterion, "met" means the disqualifying thing is TRUE of this
company, which will sink the score. Read those carefully.`;

export async function qualify(
  context: ScrapedContext,
  criteria: Criterion[],
): Promise<QualifyResult> {
  const enabled = criteria.filter((c) => c.enabled);

  const criteriaBlock = enabled
    .map(
      (c, i) =>
        `${i + 1}. ${c.name}\n` +
        `   Type: ${TYPE_LABEL[c.type]}${c.weight === null ? "" : ` (weight ${c.weight})`}\n` +
        `   Look in: ${SOURCE_LABEL[c.source]}\n` +
        `   What counts: ${c.description}`,
    )
    .join("\n\n");

  const { object } = await generateObject({
    model,
    schema: QualifySchema,
    schemaName: "lead_qualification",
    system: SYSTEM,
    prompt: `# ICP criteria (${enabled.length})

${criteriaBlock}

# Scraped sources

${renderContext(context)}`,
  });

  return object;
}
