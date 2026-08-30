// Call 2 of 2, kept separate so tone and length constraints do not compete
// with the analytical work of qualifying.
import { generateObject } from "ai";
import { z } from "zod";
import { model } from "./model";
import type { ScrapedContext } from "./context";
import type { Evidence, Guidance } from "../types";

const IcebreakerSchema = z.object({
  icebreaker: z.string(),
});

const SYSTEM = `You write the opening line of a cold outreach message for an SDR team.

What makes these work:
- One concrete detail the prospect will recognise as specifically theirs, taken from
  the supplied evidence. Never a detail you assumed.
- An observation, not a pitch. Do not describe your own product; there isn't one here.
- End with a light question that gives them something easy to answer.
- No greeting, no sign-off, no subject line. The opening lines only.
- No emoji, ever.
- Never mention that the information was scraped or automated.

If the evidence is thin, write something shorter and honest rather than padding it
with flattery.`;

export async function writeIcebreaker(
  context: ScrapedContext,
  evidence: Evidence[],
  guidance: Guidance,
): Promise<string> {
  const facts = [
    context.company?.name ? `Company: ${context.company.name}` : "",
    context.person?.fullName ? `Contact: ${context.person.fullName}` : "",
    context.person?.role ? `Their role: ${context.person.role}` : "",
    context.company?.description ? `What they do: ${context.company.description.slice(0, 400)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const evidenceBlock = evidence
    .slice(0, 6)
    .map((e) => `- [${e.location}] "${e.snippet}"`)
    .join("\n");

  const prompt = `# The lead

${facts || "Little is known about the contact."}

# Verified evidence you may draw on

${evidenceBlock || "No verified evidence — keep it short and general."}

# House style

Tone: ${guidance.tone}
Hard limit: ${guidance.maxLength} characters. Going over is a failure.
Team instruction: ${guidance.instruction}`;

  const { object } = await generateObject({
    model,
    schema: IcebreakerSchema,
    schemaName: "icebreaker",
    system: SYSTEM,
    prompt,
  });

  let text = object.icebreaker.trim();

  // One retry, then hard-trim at a sentence boundary. The detail page renders a
  // character count against maxLength, so an overrun is visible to the user.
  if (text.length > guidance.maxLength) {
    const retry = await generateObject({
      model,
      schema: IcebreakerSchema,
      schemaName: "icebreaker",
      system: SYSTEM,
      prompt: `${prompt}

Your previous attempt was ${text.length} characters, over the ${guidance.maxLength} limit.
Rewrite it shorter. Keep the specific detail; drop everything else.`,
    });
    text = retry.object.icebreaker.trim();
  }

  if (text.length > guidance.maxLength) {
    const cut = text.slice(0, guidance.maxLength);
    const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "));
    text = lastStop > guidance.maxLength * 0.5 ? cut.slice(0, lastStop + 1) : cut.trimEnd();
  }

  return text;
}
