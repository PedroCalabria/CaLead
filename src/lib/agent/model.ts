// The one place a model provider is named. Swapping to another provider —
// Anthropic through the Vercel AI Gateway, say — is a change to this file only.
import { google } from "@ai-sdk/google";

export const MODEL_ID = process.env.LLM_MODEL ?? "gemini-3.6-flash";

export const model = google(MODEL_ID);

/**
 * Free-tier Flash allows ~10-15 requests/minute. Two calls per lead means a
 * seeding run can trip that, so callers batch with this pause between leads.
 */
export const RATE_LIMIT_PAUSE_MS = Number(process.env.LLM_PAUSE_MS ?? 5000);
