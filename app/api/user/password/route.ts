import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession();

  const { currentPassword, newPassword } = await req.json();

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, Number(session?.user.id)),
  });

  const isValid = await bcrypt.compare(currentPassword, user?user.password:"");

  if (!isValid) {
    return NextResponse.json({ error: "Wrong password" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({ password: hashed })
    .where(eq(users.id, user?user.id:2));

  return NextResponse.json({ success: true });
}