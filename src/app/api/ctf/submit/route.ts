import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/supabase/auth";
import { submitChallenge } from "@/lib/supabase/ctf-service";

interface SubmissionBody {
  challengeId: number;
  eventId: number;
  flag: string;
  correctFlag: string;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: SubmissionBody = await request.json();
    const { challengeId, eventId, flag, correctFlag } = body;

    if (!challengeId || !eventId || !flag || !correctFlag) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isCorrect = flag.trim().toLowerCase() === correctFlag.trim().toLowerCase();

    const submission = await submitChallenge(
      user.id,
      challengeId,
      eventId,
      flag,
      isCorrect
    );

    return NextResponse.json({
      success: isCorrect,
      submission,
      message: isCorrect
        ? "Congratulations! Flag is correct!"
        : "Incorrect flag. Try again!",
    });
  } catch (error) {
    console.error("POST /api/ctf/submit:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
