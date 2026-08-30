import { NextResponse } from "next/server";
import { validateAll } from "@/lib/validation";
import { createLead, getActiveIcp, listLeads } from "@/lib/db/queries";
import { runPipelineForLead } from "@/lib/agent/run";
import { background } from "@/lib/agent/background";
import type { LeadSubmission } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET() {
  try {
    return NextResponse.json({ leads: await listLeads() });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list leads" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let submission: LeadSubmission;
  try {
    submission = (await request.json()) as LeadSubmission;
  } catch {
    return NextResponse.json({ error: "Expected a JSON body" }, { status: 400 });
  }

  const errors = validateAll(submission);
  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    const icp = await getActiveIcp();
    const leadId = await createLead(submission, icp);

    // Respond now; the run continues in the background and the client polls.
    background(runPipelineForLead(leadId, submission));

    return NextResponse.json({ leadId }, { status: 202 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not start the run" },
      { status: 500 },
    );
  }
}
