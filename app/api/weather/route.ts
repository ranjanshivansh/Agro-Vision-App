import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getWeather } from "@/lib/weather";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" });
  }

  // 🔥 get user location
  const user = await db.query.users.findFirst({
    where: eq(users.id, Number(session.user.id)),
  });

  const city = user?.location || "Chennai";

  // 🔥 get weather
  const weather = await getWeather(city);

  return Response.json({
    city,
    weather,
    location:city,
    current:weather,
    date: new Date().toDateString(),
    forecast:weather.forecast
  });
}