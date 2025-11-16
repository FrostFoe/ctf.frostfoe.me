/**
 * useChallenges Hook
 * Manages challenge completion, hints, and progress tracking
 * Uses Supabase for data persistence
 */

import { useCallback, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface ChallengeCompletion {
  id: number;
  challenge_id: number;
  user_id: number;
  event_id: number;
  completed_at: string;
  time_spent?: number;
  hints_used: number;
  points_earned: number;
}

export function useChallenges() {
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(
    new Set()
  );
  const [revealedHints, setRevealedHints] = useState<Record<number, string[]>>(
    {}
  );
  const [challengeData, setChallengeData] = useState<
    Record<number, ChallengeCompletion>
  >({});

  /**
   * Load user's completed challenges on mount
   */
  useEffect(() => {
    loadCompletedChallenges();
  }, []);

  /**
   * Load completed challenges from Supabase
   */
  const loadCompletedChallenges = useCallback(async () => {
    try {
      // Get current user ID from context or localStorage
      const userId = localStorage.getItem("user_id");
      if (!userId) return;

      const { data, error } = await supabase
        .from("completed_challenges")
        .select("*")
        .eq("user_id", parseInt(userId));

      if (error) throw error;

      const completed = new Set(
        (data || []).map((item: ChallengeCompletion) => item.challenge_id)
      );
      setCompletedChallenges(completed);

      const dataMap: Record<number, ChallengeCompletion> = {};
      (data || []).forEach((item: ChallengeCompletion) => {
        dataMap[item.challenge_id] = item;
      });
      setChallengeData(dataMap);
    } catch (error) {
      console.error("Error loading completed challenges:", error);
    }
  }, []);

  /**
   * Check if challenge is solved
   */
  const isSolved = useCallback(
    (challengeId: number): boolean => {
      return completedChallenges.has(challengeId);
    },
    [completedChallenges]
  );

  /**
   * Get challenge completion details
   */
  const getChallengeData = useCallback(
    (challengeId: number): ChallengeCompletion | null => {
      return challengeData[challengeId] || null;
    },
    [challengeData]
  );

  /**
   * Complete a challenge
   */
  const solveChallenge = useCallback(
    async (
      challengeId: number,
      eventId: number,
      points: number,
      timeSpent = 0,
      hintsUsed = 0
    ): Promise<boolean> => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) return false;

        const { data, error } = await supabase
          .from("completed_challenges")
          .insert([
            {
              challenge_id: challengeId,
              user_id: parseInt(userId),
              event_id: eventId,
              time_spent: timeSpent,
              hints_used: hintsUsed,
              points_earned: points,
              completed_at: new Date().toISOString(),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        setCompletedChallenges(
          (prev) => new Set([...prev, challengeId])
        );
        if (data) {
          setChallengeData((prev) => ({
            ...prev,
            [challengeId]: data,
          }));
        }

        return true;
      } catch (error) {
        console.error("Error saving challenge completion:", error);
        return false;
      }
    },
    []
  );

  /**
   * Reveal a hint
   */
  const openHint = useCallback(
    (
      challengeId: number,
      hintIndex: number,
      availableHints: string[]
    ): string | null => {
      const hint = availableHints[hintIndex] || null;

      if (hint) {
        setRevealedHints((prev) => ({
          ...prev,
          [challengeId]: [...(prev[challengeId] || []), hint],
        }));
      }

      return hint;
    },
    []
  );

  /**
   * Get revealed hints count
   */
  const getHintsUsed = useCallback(
    (challengeId: number): number => {
      return revealedHints[challengeId]?.length || 0;
    },
    [revealedHints]
  );

  /**
   * Get all revealed hints
   */
  const getHints = useCallback(
    (challengeId: number): string[] => {
      return revealedHints[challengeId] || [];
    },
    [revealedHints]
  );

  /**
   * Get completion time
   */
  const getTime = useCallback(
    (challengeId: number): number | null => {
      return challengeData[challengeId]?.time_spent || null;
    },
    [challengeData]
  );

  /**
   * Get points earned
   */
  const getPoints = useCallback(
    (challengeId: number): number | null => {
      return challengeData[challengeId]?.points_earned || null;
    },
    [challengeData]
  );

  return {
    isSolved,
    getChallengeData,
    solveChallenge,
    openHint,
    getHintsUsed,
    getHints,
    getTime,
    getPoints,
    completedChallenges,
  };
}
