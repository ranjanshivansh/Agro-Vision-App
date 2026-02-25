import { NextResponse } from "next/server";
import { db } from "@/db";
import { reports, users } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { eq } from "drizzle-orm";
import { getWeather } from "@/lib/weather";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await db.query.users.findFirst({
  where: eq(users.id, Number(session.user.id)),
});

const city = user?.location || "Chennai";
const weather=await getWeather(city);
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const crop = formData.get("crop") as string;

    if (!file) {
      return NextResponse.json({ error: "No image provided" });
    }

    const bytes = await file.arrayBuffer();
    console.log(" API Route hit")
    // 🔥 HuggingFace API call
   const response = await fetch(
  "https://router.huggingface.co/hf-inference/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
     "Content-Type": file.type, // 🔥 IMPORTANT FIX

    },
    body: bytes,
  }
);

        const text = await response.text();

        let result;
        try {
        result = JSON.parse(text);
        } catch (err) {
        console.error("HF RAW RESPONSE:", text);
        return NextResponse.json(
            { error: "Invalid response from HuggingFace" },
            { status: 500 }
        );
        };

        if (!Array.isArray(result)) {
  console.error("HF Error:", result);
  return NextResponse.json(
    { error: "Model is loading, try again in a few seconds" },
    { status: 500 }
  );
}

    const top = result[0];

   const label = top.label;

// Extract ONLY disease
let disease = label;

if (label.includes("with")) {
  disease = label.split("with")[1].trim();
}
    const confidence = Math.round(top.score * 100);

    // 🔥 simple logic for severity
    let severity = "low";
    if (confidence > 85) severity = "high";
    else if (confidence > 60) severity = "medium";

    const status =
      severity === "high"
        ? "action_required"
        : severity === "medium"
        ? "treating"
        : "monitoring";

    const advisory = `Detected ${crop} with ${disease}. Take appropriate treatment.`;   

    // 🔥 SAVE TO DB
    await db.insert(reports).values({
      userId: Number(session.user.id),
      crop:crop,
      disease:disease,
      confidence,
      severity,
      status,
      advisory,
      temperature: weather.temperature,
      humidity: weather.humidity,
      rainfall: weather.rainfall,
    });

    return NextResponse.json({
      disease,
      confidence,
      severity,
      status,
      advisory,
      weather
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}