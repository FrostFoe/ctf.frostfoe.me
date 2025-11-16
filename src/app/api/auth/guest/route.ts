/**
 * POST /api/auth/guest
 * Create a guest session
 */

import { createGuestSession, setAuthCookie } from "@/lib/supabase/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const guestUser = await createGuestSession();

    if (!guestUser) {
      return NextResponse.json(
        { error: "Failed to create guest session" },
        { status: 500 },
      );
    }

    // Set auth cookie
    await setAuthCookie(guestUser.id);

    return NextResponse.json({ user: guestUser, message: "Guest session created" });
  } catch (error) {
    console.error("POST /api/auth/guest error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
