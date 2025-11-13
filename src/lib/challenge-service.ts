/**
 * Challenge Service
 * Manages challenge completion, hints, and progress tracking
 */

import { getCompletedChallenges, completeChallengeFull } from "./user-data";
import { isChallengeCompleted, getCompletedChallengesByEvent } from "./storage";

export interface ChallengeHint {
  challengeId: number;
  hints: string[];
  usedHints: number[];
  lastRevealedAt: string;
}

const CHALLENGE_HINTS_KEY = "ctf_challenge_hints";

// ============== Challenge Hints Storage ==============

/**
 * Get hints for a challenge
 */
export function getChallengeHints(challengeId: number): ChallengeHint | null {
  if (typeof window === "undefined") return null;

  try {
    const hints = localStorage.getItem(CHALLENGE_HINTS_KEY);
    if (!hints) return null;

    const hintsData: ChallengeHint[] = JSON.parse(hints);
    return hintsData.find((h) => h.challengeId === challengeId) || null;
  } catch (error) {
    console.error("Error reading hints:", error);
    return null;
  }
}

/**
 * Reveal a hint for a challenge
 */
export function revealHint(challengeId: number, hintIndex: number, availableHints: string[]): string | null {
  if (typeof window === "undefined") return null;

  try {
    let hintsData: ChallengeHint[] = [];

    const stored = localStorage.getItem(CHALLENGE_HINTS_KEY);
    if (stored) {
      hintsData = JSON.parse(stored);
    }

    let challengeHints = hintsData.find((h) => h.challengeId === challengeId);

    if (!challengeHints) {
      challengeHints = {
        challengeId,
        hints: availableHints,
        usedHints: [],
        lastRevealedAt: new Date().toISOString(),
      };
      hintsData.push(challengeHints);
    }

    // Check if hint already revealed
    if (challengeHints.usedHints.includes(hintIndex)) {
      return availableHints[hintIndex] || null;
    }

    // Check hint limit (max 3 hints per challenge)
    if (challengeHints.usedHints.length >= 3) {
      return null;
    }

    // Reveal hint
    challengeHints.usedHints.push(hintIndex);
    challengeHints.lastRevealedAt = new Date().toISOString();

    localStorage.setItem(CHALLENGE_HINTS_KEY, JSON.stringify(hintsData));

    return availableHints[hintIndex] || null;
  } catch (error) {
    console.error("Error revealing hint:", error);
    return null;
  }
}

/**
 * Get revealed hints count for a challenge
 */
export function getRevealedHintsCount(challengeId: number): number {
  const hints = getChallengeHints(challengeId);
  return hints ? hints.usedHints.length : 0;
}

/**
 * Get all revealed hints for a challenge
 */
export function getRevealedHints(challengeId: number): string[] {
  const hints = getChallengeHints(challengeId);
  if (!hints) return [];

  return hints.usedHints.map((index) => hints.hints[index]).filter((h) => h);
}

// ============== Challenge Completion Service ==============

/**
 * Check if challenge is completed by user
 */
export function isChallengeSolvedByUser(challengeId: number): boolean {
  return isChallengeCompleted(challengeId);
}

/**
 * Get challenge completion time
 */
export function getChallengeCompletionTime(challengeId: number): number | null {
  const completed = getCompletedChallenges().find((c) => c.challengeId === challengeId);
  return completed ? completed.timeSpent : null;
}

/**
 * Get challenge points earned
 */
export function getChallengePointsEarned(challengeId: number): number | null {
  const completed = getCompletedChallenges().find((c) => c.challengeId === challengeId);
  return completed ? completed.pointsEarned : null;
}

/**
 * Get challenge completion details
 */
export function getChallengeDetails(challengeId: number) {
  const completed = getCompletedChallenges().find((c) => c.challengeId === challengeId);
  const hints = getChallengeHints(challengeId);

  return {
    isCompleted: !!completed,
    completedAt: completed?.solvedAt || null,
    timeSpent: completed?.timeSpent || 0,
    pointsEarned: completed?.pointsEarned || 0,
    hintsUsed: hints?.usedHints.length || 0,
    totalHints: hints?.hints.length || 0,
  };
}

// ============== Event Progress Tracking ==============

/**
 * Get event challenges completion summary
 */
export function getEventChallengeSummary(eventId: number, totalChallenges: number) {
  const completed = getCompletedChallengesByEvent(eventId);
  const completionRate = Math.round((completed.length / totalChallenges) * 100);

  return {
    completed: completed.length,
    total: totalChallenges,
    rate: completionRate,
    totalPoints: completed.reduce((sum, c) => sum + c.pointsEarned, 0),
    totalTimeSpent: completed.reduce((sum, c) => sum + c.timeSpent, 0),
    averageTimePerChallenge: completed.length > 0 ? Math.round(completed.reduce((sum, c) => sum + c.timeSpent, 0) / completed.length) : 0,
  };
}

/**
 * Calculate difficulty progress
 */
export function getDifficultyProgress(eventId: number, difficulties: string[]) {
  const completed = getCompletedChallengesByEvent(eventId);

  const progressByDifficulty: Record<string, { completed: number; total: number; rate: number }> = {};

  difficulties.forEach((diff) => {
    // This would need challenge data to implement fully
    progressByDifficulty[diff] = {
      completed: 0,
      total: 0,
      rate: 0,
    };
  });

  return progressByDifficulty;
}

// ============== Challenge Analytics ==============

/**
 * Get most difficult challenges (least solved)
 */
export function getMostDifficultChallenges(challenges: any[], limit = 5) {
  return challenges.sort((a, b) => (a.solves || 0) - (b.solves || 0)).slice(0, limit);
}

/**
 * Get solve statistics
 */
export function getSolveStatistics(challenges: any[]) {
  const completed = getCompletedChallenges();

  return {
    totalChallenges: challenges.length,
    solvedChallenges: completed.length,
    unsolvedChallenges: challenges.length - completed.length,
    solvePercentage: Math.round((completed.length / challenges.length) * 100),
    totalPointsEarned: completed.reduce((sum, c) => sum + c.pointsEarned, 0),
    totalTimeSpent: completed.reduce((sum, c) => sum + c.timeSpent, 0),
    averagePointsPerChallenge: completed.length > 0 ? Math.round(completed.reduce((sum, c) => sum + c.pointsEarned, 0) / completed.length) : 0,
  };
}

/**
 * Get category-wise progress
 */
export function getCategoryProgress(challenges: any[]) {
  const completed = getCompletedChallenges();
  const completedIds = new Set(completed.map((c) => c.challengeId));

  const categoryStats: Record<string, { total: number; solved: number; rate: number }> = {};

  challenges.forEach((challenge) => {
    const category = challenge.category || "Unknown";

    if (!categoryStats[category]) {
      categoryStats[category] = { total: 0, solved: 0, rate: 0 };
    }

    categoryStats[category].total++;

    if (completedIds.has(challenge.id)) {
      categoryStats[category].solved++;
    }
  });

  // Calculate rates
  Object.keys(categoryStats).forEach((category) => {
    const stat = categoryStats[category];
    stat.rate = Math.round((stat.solved / stat.total) * 100);
  });

  return categoryStats;
}

// ============== Leaderboard Service ==============

/**
 * Calculate user score for leaderboard
 */
export function calculateUserLeaderboardScore() {
  const completed = getCompletedChallenges();
  const achievements = 0; // Can be enhanced

  return {
    totalPoints: completed.reduce((sum, c) => sum + c.pointsEarned, 0),
    challengesSolved: completed.length,
    achievements,
    averageTime: completed.length > 0 ? Math.round(completed.reduce((sum, c) => sum + c.timeSpent, 0) / completed.length) : 0,
  };
}

/**
 * Generate leaderboard entry
 */
export function generateLeaderboardEntry(userProfile: any) {
  const score = calculateUserLeaderboardScore();

  return {
    userId: userProfile.id,
    username: userProfile.username,
    displayName: userProfile.displayName,
    avatar: userProfile.avatar,
    totalPoints: score.totalPoints,
    challengesSolved: score.challengesSolved,
    rank: 0, // Will be set when sorting
    achievements: score.achievements,
    lastSolved: getCompletedChallenges()[0]?.solvedAt || null,
  };
}
