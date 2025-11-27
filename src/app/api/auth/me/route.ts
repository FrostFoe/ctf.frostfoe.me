import { NextRequest, NextResponse } from "next/server";
import { getMe } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("session")?.value || "";

    const result = await getMe(sessionId);

    if (!result.user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user: result.user });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}