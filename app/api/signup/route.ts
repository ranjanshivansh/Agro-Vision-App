import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password, location } = body;

    // Check existing user
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [user] = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      location,
    }).returning();

    return NextResponse.json(
      { success: true, userId: user.id },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    );
  }
}