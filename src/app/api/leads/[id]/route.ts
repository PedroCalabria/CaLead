import { NextResponse } from "next/server";
import { getLead, getRun } from "@/lib/db/queries";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const [lead, run] = await Promise.all([getLead(id), getRun(id)]);
    if (!lead) {
      return NextResponse.json({ error: "No such lead" }, { status: 404 });
    }
    return NextResponse.json({
      lead,
      stages: run?.stages ?? [],
      error: run?.error ?? null,
      done: Boolean(run?.finishedAt),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to read the lead" },
      { status: 500 },
    );
  }
}
