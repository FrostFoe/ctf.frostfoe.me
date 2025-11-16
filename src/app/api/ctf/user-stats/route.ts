import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/supabase/auth";
import {
  getUserStats,
  initializeUserStats,
  updateUserStats,
} from "@/lib/supabase/ctf-service";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let stats = await getUserStats(user.id);

    if (!stats) {
      stats = await initializeUserStats(user.id);
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error("GET /api/ctf/user-stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const updatedStats = await updateUserStats(user.id, body);

    return NextResponse.json(updatedStats);
  } catch (error) {
    console.error("PUT /api/ctf/user-stats:", error);
    return NextResponse.json(
      { error: "Failed to update user stats" },
      { status: 500 }
    );
  }
}
