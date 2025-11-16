import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/supabase/auth";
import { getEvents } from "@/lib/supabase/ctf-service";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const events = await getEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/ctf/events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
