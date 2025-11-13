/**
 * useChallenges Hook
 * Manages challenge completion, hints, and progress tracking
 */

import { useCallback, useState } from "react";
import {
  isChallengeSolvedByUser,
  getChallengeCompletionTime,
  getChallengePointsEarned,
  getChallengeDetails,
  revealHint,
  getRevealedHintsCount,
  getRevealedHints,
} from "@/lib/challenge-service";
import { completeChallengeFull } from "@/lib/user-data";

export function useChallenges() {
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(
    new Set(),
  );
  const [revealedHints, setRevealedHints] = useState<Record<number, string[]>>({});

  /**
   * Check if challenge is solved
   */
  const isSolved = useCallback((challengeId: number): boolean => {
    return isChallengeSolvedByUser(challengeId);
  }, []);

  /**
   * Get challenge completion details
   */
  const getChallengeData = useCallback((challengeId: number) => {
    return getChallengeDetails(challengeId);
  }, []);

  /**
   * Complete a challenge
   */
  const solveChallenge = useCallback(
    (
      challengeId: number,
      eventId: number,
      points: number,
      timeSpent = 0,
      hintsUsed = 0,
    ): boolean => {
      const success = completeChallengeFull(
        challengeId,
        eventId,
        points,
        timeSpent,
        hintsUsed,
      );

      if (success) {
        setCompletedChallenges((prev) => new Set([...prev, challengeId]));
      }

      return success;
    },
    [],
  );

  /**
   * Reveal a hint
   */
  const openHint = useCallback(
    (
      challengeId: number,
      hintIndex: number,
      availableHints: string[],
    ): string | null => {
      const hint = revealHint(challengeId, hintIndex, availableHints);

      if (hint) {
        setRevealedHints((prev) => ({
          ...prev,
          [challengeId]: [...(prev[challengeId] || []), hint],
        }));
      }

      return hint;
    },
    [],
  );

  /**
   * Get revealed hints count
   */
  const getHintsUsed = useCallback((challengeId: number): number => {
    return getRevealedHintsCount(challengeId);
  }, []);

  /**
   * Get all revealed hints
   */
  const getHints = useCallback((challengeId: number): string[] => {
    return getRevealedHints(challengeId);
  }, []);

  /**
   * Get completion time
   */
  const getTime = useCallback((challengeId: number): number | null => {
    return getChallengeCompletionTime(challengeId);
  }, []);

  /**
   * Get points earned
   */
  const getPoints = useCallback((challengeId: number): number | null => {
    return getChallengePointsEarned(challengeId);
  }, []);

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
