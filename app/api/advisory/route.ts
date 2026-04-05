import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { crop, disease, severity, weather, location } = body;

    const prompt = `
You are an expert agricultural advisor.

Crop: ${crop}
Disease: ${disease}
Severity: ${severity}
Temperature: ${weather.temperature}°C
Humidity: ${weather.humidity}%
Rainfall: ${weather.rainfall} mm
Location: ${location}

Give:
1. Short advisory paragraph
2. 4 step treatment plan (numbered)

IMPORTANT:
- Steps MUST be numbered like:
1. Step one
2. Step two
3. Step three
4. Step four
Keep it simple.
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    if (!res.ok) {
  const errorText = await res.text();
  console.error("Gemini API Error:", errorText);
  return NextResponse.json({ error: "Gemini failed" }, { status: 500 });
}
    const data = await res.json();
    console.log("api hi",data);

    let text = "";

    if (data?.candidates?.length > 0) {
      text = data.candidates[0].content.parts
        .map((p: any) => p.text)
        .join("");
    }

    if (!text) {
      console.error("Empty Gemini response:", data);
    }
    return NextResponse.json({ text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}