import { db } from "@/db";
import { reports } from "@/db/schema";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    await db.insert(reports).values({
      userId: Number(session.user.id), // 🔥 REAL USER ID

      crop: body.crop,
      disease: body.disease,
      confidence: body.confidence,
      severity: body.severity,
      status: body.status,
      advisory: body.advisory,
      temperature: body.temperature,
      humidity: body.humidity,
      rainfall: body.rainfall,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}