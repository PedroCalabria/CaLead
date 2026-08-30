import { NextResponse } from "next/server";
import { getLead } from "@/lib/db/queries";
import { rescoreLead } from "@/lib/agent/run";

export const runtime = "nodejs";
export const maxDuration = 300;

/** Re-runs judgment and scoring from the cached scrapes. Spends no Apify credit. */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const updated = await rescoreLead(id);
    if (!updated) {
      return NextResponse.json(
        { error: "No cached scrapes for this lead — it cannot be re-scored." },
        { status: 409 },
      );
    }
    return NextResponse.json({ lead: await getLead(id) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Re-score failed" },
      { status: 500 },
    );
  }
}
