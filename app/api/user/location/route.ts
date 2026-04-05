import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
 // ✅ ADD THIS

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions); // ✅ FIXED

    console.log("SESSION:", session); // 👈 DEBUG

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { location } = await req.json();

    if (!location) {
      return NextResponse.json({ error: "Location required" }, { status: 400 });
    }

    await db
      .update(users)
      .set({ location })
      .where(eq(users.id, Number(session.user.id)));

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("LOCATION UPDATE ERROR:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}