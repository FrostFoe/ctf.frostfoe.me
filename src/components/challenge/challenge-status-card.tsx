/**
 * Challenge Status Card Component
 * Displays challenge completion status and statistics
 */

"use client";

import { useChallengeSubmission } from "@/hooks/use-data";

interface ChallengeStatusCardProps {
  challengeId: number;
}

export function ChallengeStatusCard({
  challengeId,
}: ChallengeStatusCardProps) {
  const { isCompleted } = useChallengeSubmission(challengeId);

  // TODO: Load stats from Supabase when available
  if (!isCompleted) {
    return null;
  }

  return null;
}

