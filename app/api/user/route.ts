import { db } from "@/db";
import { users } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, Number(session.user.id)),
  });

  return Response.json(user);
}

