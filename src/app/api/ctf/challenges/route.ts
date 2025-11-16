import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/supabase/auth";
import {
  getEvents,
  getChallengesByEvent,
  getCompletedChallenges,
  isChallengeCompleted,
} from "@/lib/supabase/ctf-service";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const eventId = searchParams.get("eventId");
    const includeProgress = searchParams.get("includeProgress") === "true";

    if (eventId) {
      const challengesData = await getChallengesByEvent(parseInt(eventId));

      if (includeProgress) {
        const completedIds = new Set(
          (await getCompletedChallenges(user.id, parseInt(eventId))).map(
            (c) => c.challenge_id
          )
        );

        const challengesWithProgress = challengesData.map((challenge) => ({
          ...challenge,
          isCompleted: completedIds.has(challenge.id),
        }));

        return NextResponse.json(challengesWithProgress);
      }

      return NextResponse.json(challengesData);
    }

    // If no eventId, return empty array (events should be queried separately)
    return NextResponse.json([]);
  } catch (error) {
    console.error("GET /api/ctf/challenges:", error);
    return NextResponse.json(
      { error: "Failed to fetch challenges" },
      { status: 500 }
    );
  }
}
