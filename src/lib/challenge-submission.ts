/**
 * Challenge Submission Service
 * Handles flag submission, verification, resource downloads, and data updates
 */

import {
  completeChallengeFull,
  updateUserStats,
  getOrInitializeUserStats,
} from "@/lib/user-data";
import {
  getFromStorage,
  saveToStorage,
  getCompletedChallenges,
  isChallengeCompleted,
} from "@/lib/storage";
import { ctfData } from "@/lib/ctf-data-loader";
import type { CompletedChallenge } from "@/lib/storage";

/**
 * Get challenge flags from JSON data
 */
function getChallengeFlagsFromJSON(challengeId: number): string[] {
  const challenge = ctfData.challenges.find((c) => c.id === challengeId);
  if (!challenge) {
    return [];
  }

  const flags: string[] = [];
  
  // Add main flag
  if ("flag" in challenge && challenge.flag) {
    flags.push(challenge.flag);
  }

  // Add alternate flags
  if ("alternateFlags" in challenge && Array.isArray(challenge.alternateFlags)) {
    flags.push(...(challenge.alternateFlags));
  }

  return flags;
}

// Fallback mock solutions (if not in JSON)
const CHALLENGE_SOLUTIONS: Record<number, string[]> = {
  1: ["flag{web_security_rules}", "flag{developer_tools_ftw}", "flag{hidden_input}"],
  2: ["flag{crypto_challenge_done}", "flag{caesar_cipher_solved}", "flag{shift_13}"],
  3: ["flag{sql_injection_pwned}", "flag{database_unlocked}", "flag{admin_bypass}"],
  4: ["flag{xss_vulnerability_found}", "flag{javascript_executed}", "flag{script_injected}"],
  5: ["flag{access_control_bypass}", "flag{admin_access_gained}", "flag{privilege_escalation}"],
};

/**
 * Verify submitted flag against JSON and fallback solutions
 */
export function verifyFlag(challengeId: number, submittedFlag: string): boolean {
  // Try JSON first
  const jsonFlags = getChallengeFlagsFromJSON(challengeId);
  if (jsonFlags.length > 0) {
    return jsonFlags.some(
      (flag) => flag.toLowerCase() === submittedFlag.toLowerCase().trim()
    );
  }

  // Fallback to mock solutions
  const solutions = CHALLENGE_SOLUTIONS[challengeId];
  if (!solutions) {
    console.error(`Challenge ${challengeId} not found`);
    return false;
  }

  // Case-insensitive comparison
  return solutions.some(
    (solution) => solution.toLowerCase() === submittedFlag.toLowerCase().trim()
  );
}

/**
 * Submit flag and update data
 */
export function submitFlagAndUpdate(
  challengeId: number,
  eventId: number,
  submittedFlag: string,
  timeSpent = 0,
  hintsUsed = 0,
): { success: boolean; message: string; points?: number } {
  // Verify flag
  if (!verifyFlag(challengeId, submittedFlag)) {
    return {
      success: false,
      message: "❌ ফ্ল্যাগ সঠিক নয়। আবার চেষ্টা করুন।",
    };
  }

  // Check if already completed
  const completed = getCompletedChallenges();
  if (completed.some((c) => c.challengeId === challengeId)) {
    return {
      success: false,
      message: "⚠️ আপনি ইতিমধ্যে এই চ্যালেঞ্জটি সমাধান করেছেন।",
    };
  }

  // Calculate points (hint penalty)
  let points = 100; // Base points
  if (hintsUsed > 0) {
    points = Math.max(50, 100 - hintsUsed * 10); // Minimum 50 points
  }

  // Mark as completed
  const success = completeChallengeFull(challengeId, eventId, points, timeSpent, hintsUsed);

  if (success) {
    return {
      success: true,
      message: `✅ চ্যালেঞ্জ সমাধান! ${points} পয়েন্ট অর্জন করেছেন।`,
      points,
    };
  }

  return {
    success: false,
    message: "❌ ডেটা সংরক্ষণে ত্রুটি। আবার চেষ্টা করুন।",
  };
}

/**
 * Get all valid solutions for a challenge
 */
export function getChallengeSolutions(challengeId: number): string[] {
  // Try JSON first
  const jsonFlags = getChallengeFlagsFromJSON(challengeId);
  if (jsonFlags.length > 0) {
    return jsonFlags;
  }

  // Fallback to mock solutions
  return CHALLENGE_SOLUTIONS[challengeId] || [];
}

/**
 * Simulate resource download tracking
 */
export function trackResourceDownload(
  challengeId: number,
  resourceName: string,
  sizeBytes: number,
): { success: boolean; downloadUrl: string; message: string } {
  // In production, generate secure download URL
  const downloadUrl = `/api/challenges/${challengeId}/resources/download?file=${encodeURIComponent(resourceName)}`;

  // Log download in localStorage
  const downloads = localStorage.getItem("ctf_resource_downloads");
  const downloadList: { challengeId: number; resource: string; timestamp: string; size: number }[] =
    downloads ? JSON.parse(downloads) : [];

  downloadList.push({
    challengeId,
    resource: resourceName,
    timestamp: new Date().toISOString(),
    size: sizeBytes,
  });

  localStorage.setItem("ctf_resource_downloads", JSON.stringify(downloadList));

  return {
    success: true,
    downloadUrl,
    message: `📥 "${resourceName}" ডাউনলোড শুরু হয়েছে...`,
  };
}

/**
 * Get resource download history
 */
export function getDownloadHistory(): {
  challengeId: number;
  resource: string;
  timestamp: string;
  size: number;
}[] {
  const downloads = localStorage.getItem("ctf_resource_downloads");
  return downloads ? JSON.parse(downloads) : [];
}

/**
 * Calculate final score for challenge with advanced scoring system
 */
export function calculateChallengeScore(
  basePoints: number,
  timeSpentMinutes: number,
  hintsUsed: number,
  difficulty?: string,
  solveCount?: number,
): { points: number; breakdown: Record<string, number> } {
  let points = basePoints;
  const breakdown: Record<string, number> = {
    base: basePoints,
    difficultyMultiplier: 1,
    hintPenalty: 0,
    timeBenefit: 0,
    speedBonus: 0,
    solveCountReduction: 0,
  };

  // Difficulty multiplier (increases base points)
  let difficultyMultiplier = 1.0;
  if (difficulty) {
    switch (difficulty.toLowerCase()) {
      case "সহজ":
        difficultyMultiplier = 0.8; // 20% easier
        break;
      case "মধ্যম":
      case "মাঝারি":
        difficultyMultiplier = 1.0; // Standard
        break;
      case "কঠিন":
      case "মাঝারি থেকে কঠিন":
        difficultyMultiplier = 1.25; // 25% harder
        break;
      case "অসম্ভব":
        difficultyMultiplier = 1.5; // 50% harder
        break;
    }
  }

  const baseAfterDifficulty = Math.round(basePoints * difficultyMultiplier);
  points = baseAfterDifficulty;
  breakdown.difficultyMultiplier = baseAfterDifficulty - basePoints;

  // Hint penalty (5-10 points per hint depending on difficulty)
  if (hintsUsed > 0) {
    const hintCost = difficultyMultiplier > 1.2 ? 15 : 10; // Higher cost for harder challenges
    const hintPenalty = Math.min(hintsUsed * hintCost, Math.floor(points * 0.4)); // Max 40% penalty
    points -= hintPenalty;
    breakdown.hintPenalty = -hintPenalty;
  }

  // Speed bonus (solve within time limit relative to difficulty)
  if (timeSpentMinutes > 0) {
    let speedTimeLimit = 60; // minutes
    if (difficultyMultiplier < 1) speedTimeLimit = 30;
    else if (difficultyMultiplier > 1.2) speedTimeLimit = 120;

    if (timeSpentMinutes <= speedTimeLimit / 2) {
      // Solved in under half the time limit
      const speedBonus = Math.round(points * 0.15); // 15% bonus
      points += speedBonus;
      breakdown.speedBonus = speedBonus;
    } else if (timeSpentMinutes <= speedTimeLimit) {
      // Solved within time limit
      const speedBonus = Math.round(points * 0.1 * (1 - timeSpentMinutes / speedTimeLimit));
      points += speedBonus;
      breakdown.speedBonus = speedBonus;
    }
  }

  // Time degradation (lose points for slow solve)
  if (timeSpentMinutes > 480) {
    // After 8 hours
    const timeLoss = Math.round(points * 0.1);
    points -= timeLoss;
    breakdown.timeBenefit = -timeLoss;
  }

  // Solve count reduction (first solvers get more points)
  if (solveCount && solveCount > 10) {
    // After 10 solves, points decrease
    const reduction = Math.round(
      points * Math.log(solveCount) * 0.02
    );
    points -= Math.min(reduction, Math.floor(points * 0.3)); // Max 30% reduction
    breakdown.solveCountReduction = -Math.min(reduction, Math.floor(points * 0.3));
  }

  // Ensure minimum 50 points, maximum reasonable value
  points = Math.max(50, Math.min(points, Math.round(basePoints * 2)));

  return { points, breakdown };
}

/**
 * Get challenge statistics
 */
export function getChallengeStats(challengeId: number) {
  const completed = getCompletedChallenges();
  const challenge = completed.find((c) => c.challengeId === challengeId);

  return {
    isCompleted: !!challenge,
    completedAt: challenge?.solvedAt || null,
    timeSpent: challenge?.timeSpent || 0,
    pointsEarned: challenge?.pointsEarned || 0,
    hintsUsed: challenge?.hintsUsed || 0,
  };
}

/**
 * Get total points earned across all challenges
 */
export function getTotalPointsEarned(): number {
  const completed = getCompletedChallenges();
  return completed.reduce((sum, c) => sum + c.pointsEarned, 0);
}

/**
 * Get challenge completion progress
 */
export function getChallengeCompletionProgress(allChallenges: any[]): {
  completed: number;
  total: number;
  percentage: number;
} {
  const completed = getCompletedChallenges();
  const completedIds = new Set(completed.map((c) => c.challengeId));

  return {
    completed: completedIds.size,
    total: allChallenges.length,
    percentage: Math.round((completedIds.size / allChallenges.length) * 100),
  };
}

/**
 * Estimate points for a challenge based on difficulty
 */
export function estimatePoints(difficulty: string): number {
  switch (difficulty) {
    case "সহজ":
    case "easy":
      return 50;
    case "মাঝারি":
    case "মধ্যম":
    case "medium":
      return 75;
    case "কঠিন":
    case "hard":
      return 100;
    case "অসম্ভব":
    case "impossible":
      return 150;
    default:
      return 75;
  }
}

/**
 * Generate submission history summary
 */
export function getSubmissionHistory(challengeId: number): {
  totalAttempts: number;
  completionAttempt: number | null;
  status: "completed" | "incomplete" | "not_started";
} {
  const submissions = localStorage.getItem("ctf_challenge_submissions");
  const submissionList: {
    challengeId: number;
    flag: string;
    isCorrect: boolean;
    timestamp: string;
  }[] = submissions ? JSON.parse(submissions) : [];

  const challengeSubmissions = submissionList.filter((s) => s.challengeId === challengeId);
  const completedSubmission = challengeSubmissions.find((s) => s.isCorrect);

  return {
    totalAttempts: challengeSubmissions.length,
    completionAttempt: completedSubmission
      ? challengeSubmissions.indexOf(completedSubmission) + 1
      : null,
    status: completedSubmission ? "completed" : challengeSubmissions.length > 0 ? "incomplete" : "not_started",
  };
}

/**
 * Log flag submission attempt
 */
export function logSubmissionAttempt(
  challengeId: number,
  flag: string,
  isCorrect: boolean,
): void {
  const submissions = localStorage.getItem("ctf_challenge_submissions");
  const submissionList: {
    challengeId: number;
    flag: string;
    isCorrect: boolean;
    timestamp: string;
  }[] = submissions ? JSON.parse(submissions) : [];

  submissionList.push({
    challengeId,
    flag,
    isCorrect,
    timestamp: new Date().toISOString(),
  });

  // Keep only last 500 submissions
  if (submissionList.length > 500) {
    submissionList.splice(0, submissionList.length - 500);
  }

  localStorage.setItem("ctf_challenge_submissions", JSON.stringify(submissionList));
}

/**
 * Get challenge leaderboard for event
 */
export function getEventChallengeLeaderboard(eventId: number, challengeId: number) {
  const completed = getCompletedChallenges();
  const eventChallenges = completed.filter((c) => c.eventId === eventId && c.challengeId === challengeId);

  return eventChallenges
    .sort((a, b) => new Date(a.solvedAt).getTime() - new Date(b.solvedAt).getTime())
    .slice(0, 10) // Top 10
    .map((c, index) => ({
      rank: index + 1,
      points: c.pointsEarned,
      timeSpent: c.timeSpent,
      timestamp: c.solvedAt,
    }));
}

/**
 * Load all challenge flags from JSON (for initialization/admin purposes)
 */
export function loadAllChallengeFlagsFromJSON(): Record<number, string[]> {
  const allFlags: Record<number, string[]> = {};

  ctfData.challenges.forEach((challenge) => {
    const flags: string[] = [];

    if ("flag" in challenge && challenge.flag) {
      flags.push(challenge.flag);
    }

    if ("alternateFlags" in challenge && Array.isArray(challenge.alternateFlags)) {
      flags.push(...(challenge.alternateFlags));
    }

    if (flags.length > 0) {
      allFlags[challenge.id] = flags;
    }
  });

  return allFlags;
}

/**
 * Export challenge statistics
 */
export function exportChallengeStats() {
  const completed = getCompletedChallenges();
  const stats = getOrInitializeUserStats();

  return {
    totalChallengesCompleted: completed.length,
    totalPointsEarned: getTotalPointsEarned(),
    averageTimePerChallenge:
      completed.length > 0 ? Math.round(completed.reduce((sum, c) => sum + c.timeSpent, 0) / completed.length) : 0,
    averageHintsUsed: completed.length > 0 ? Math.round(completed.reduce((sum, c) => sum + c.hintsUsed, 0) / completed.length) : 0,
    mostUsedHints: Math.max(...completed.map((c) => c.hintsUsed), 0),
    fastestSolve: completed.length > 0 ? Math.min(...completed.map((c) => c.timeSpent)) : 0,
    exportedAt: new Date().toISOString(),
  };
}
