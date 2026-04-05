import { db } from "@/db";
import { reports } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const latestReport = await db.query.reports.findFirst({
    where: eq(reports.userId, userId),
    orderBy: [desc(reports.createdAt)],
  });

  if (!latestReport) {
    return NextResponse.json({ error: "No reports found" }, { status: 404 });
  }

  return NextResponse.json(latestReport);
}