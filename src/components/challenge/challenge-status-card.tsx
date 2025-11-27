/**
 * Challenge Status Card Component
 * Displays challenge completion status and statistics
 */

"use client";

import { Check, Clock, Zap, Trophy } from "lucide-react";
import { useChallengeSubmission } from "@/hooks/use-data";

interface ChallengeStatusCardProps {
  challengeId: number;
  basePoints?: number;
}

export function ChallengeStatusCard({
  challengeId,
  basePoints = 100,
}: ChallengeStatusCardProps) {
  const { isCompleted } = useChallengeSubmission(challengeId, 1);

  // TODO: Load stats from Supabase when available
  if (!isCompleted) {
    return null;
  }

  return null;
}

