import { NextResponse } from "next/server";
import { db } from "@/db"; // adjust if path differs

export async function GET() {
  try {
    // Simple query
    const result = await db.execute("SELECT 1");

    return NextResponse.json({
      success: true,
      message: "Database connected successfully ✅",
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Database connection failed ❌",
      error,
    });
  }
}