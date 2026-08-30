import { NextResponse } from "next/server";
import { getActiveIcp, saveIcp } from "@/lib/db/queries";
import type { Criterion, Guidance } from "@/lib/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const icp = await getActiveIcp();
    return NextResponse.json(icp);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to read the ICP" },
      { status: 500 },
    );
  }
}

/** Every save creates a new version, so old scores stay explainable. */
export async function PUT(request: Request) {
  let body: { criteria: Criterion[]; guidance: Guidance };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.criteria) || !body.guidance) {
    return NextResponse.json(
      { error: "Both criteria and guidance are required" },
      { status: 422 },
    );
  }

  try {
    return NextResponse.json(await saveIcp(body.criteria, body.guidance));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save the ICP" },
      { status: 500 },
    );
  }
}
