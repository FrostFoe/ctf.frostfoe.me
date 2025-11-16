/**
 * POST /api/auth/logout
 * Clear auth cookie and log out user
 */

import { clearAuthCookie } from "@/lib/supabase/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await clearAuthCookie();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("POST /api/auth/logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
