/**
 * User Data Service
 * Manages user profile, statistics, achievements and activities with persistent storage
 */

import {
  getUserProfile,
  saveUserProfile,
  initializeDefaultUserProfile,
  getUserStats,
  saveUserStats,
  initializeDefaultUserStats,
  getAchievements,
  saveAchievements,
  unlockAchievement as storageUnlockAchievement,
  getActivities,
  addActivity as storageAddActivity,
  getCompletedChallenges,
  completeChallenge as storageCompleteChallenge,
  isChallengeCompleted,
  getCompletedChallengesByEvent,
  getEventParticipations,
  joinEvent as storageJoinEvent,
  isParticipatingInEvent,
  updateEventScore as storageUpdateEventScore,
  type UserProfile,
  type UserStats,
  type Achievement,
  type RecentActivity,
  CompletedChallenge,
  EventParticipation,
} from "./storage";

// Default achievements
const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_blood",
    name: "প্রথম রক্ত",
    description: "একটি চ্যালেঞ্জে সবার আগে সমাধান করুন",
    icon: "🩸",
    unlockedAt: "",
    rarity: "rare",
  },
  {
    id: "speed_run",
    name: "গতিশীল দোড়ানো",
    description: "1 ঘণ্টার মধ্যে একটি চ্যালেঞ্জ সমাধান করুন",
    icon: "⚡",
    unlockedAt: "",
    rarity: "common",
  },
  {
    id: "series_master",
    name: "সিরিজ মাস্টার",
    description: "সম্পূর্ণ সিরিজ সমাধান করুন",
    icon: "🎯",
    unlockedAt: "",
    rarity: "epic",
  },
  {
    id: "perfectionist",
    name: "নিখুঁততাবাদী",
    description: "ইঙ্গিত ছাড়াই 10টি চ্যালেঞ্জ সমাধান করুন",
    icon: "🏆",
    unlockedAt: "",
    rarity: "legendary",
  },
  {
    id: "team_leader",
    name: "দল নেতা",
    description: "একটি টিম তৈরি করুন এবং সদস্য যোগ করুন",
    icon: "👑",
    unlockedAt: "",
    rarity: "rare",
  },
  {
    id: "event_champion",
    name: "ইভেন্ট চ্যাম্পিয়ন",
    description: "একটি ইভেন্টে প্রথম স্থান অর্জন করুন",
    icon: "🥇",
    unlockedAt: "",
    rarity: "legendary",
  },
];

// ============== User Profile Service ==============

/**
 * Get or initialize user profile
 */
export function getOrInitializeUserProfile(): UserProfile {
  let profile = getUserProfile();

  if (!profile) {
    profile = initializeDefaultUserProfile();
  }

  return profile;
}

/**
 * Update user profile
 */
export function updateUserProfile(updates: Partial<UserProfile>): UserProfile {
  const profile = getOrInitializeUserProfile();
  const updated = { ...profile, ...updates };
  saveUserProfile(updated);
  return updated;
}

/**
 * Get user display data
 */
export function getUserDisplayData() {
  const profile = getOrInitializeUserProfile();
  const stats = getOrInitializeUserStats();

  return {
    profile,
    stats,
  };
}

// ============== User Stats Service ==============

/**
 * Get or initialize user statistics
 */
export function getOrInitializeUserStats(): UserStats {
  let stats = getUserStats();

  if (!stats) {
    stats = initializeDefaultUserStats();
  }

  return stats;
}

/**
 * Update user statistics
 */
export function updateUserStats(updates: Partial<UserStats>): UserStats {
  const stats = getOrInitializeUserStats();
  const updated = { ...stats, ...updates };
  saveUserStats(updated);
  return updated;
}

/**
 * Calculate and update ranking
 */
export function updateRanking(): void {
  const stats = getOrInitializeUserStats();
  const allParticipations = getEventParticipations();
  const totalScore = allParticipations.reduce((sum, p) => sum + p.score, 0);

  stats.totalPoints = totalScore;
  stats.ranking = Math.max(1, 1000 - Math.floor(totalScore / 10)); // Simplified ranking

  saveUserStats(stats);
}

// ============== Achievements Service ==============

/**
 * Get all achievements
 */
export function getAllAchievements(): Achievement[] {
  const stored = getAchievements();

  if (stored.length === 0) {
    // Initialize default achievements
    saveAchievements(DEFAULT_ACHIEVEMENTS);
    return DEFAULT_ACHIEVEMENTS;
  }

  return stored;
}

/**
 * Get unlocked achievements
 */
export function getUnlockedAchievements(): Achievement[] {
  return getAllAchievements().filter((a) => a.unlockedAt !== "");
}

/**
 * Check if achievement is unlocked
 */
export function isAchievementUnlocked(achievementId: string): boolean {
  return getUnlockedAchievements().some((a) => a.id === achievementId);
}

/**
 * Unlock achievement with validation
 */
export function unlockAchievementWithCheck(achievementId: string, context: any = {}): boolean {
  const achievements = getAllAchievements();
  const achievement = achievements.find((a) => a.id === achievementId);

  if (!achievement || isAchievementUnlocked(achievementId)) {
    return false;
  }

  const unlockedAchievement = {
    ...achievement,
    unlockedAt: new Date().toISOString().split("T")[0],
  };

  const success = storageUnlockAchievement(unlockedAchievement);

  if (success) {
    // Add activity log
    storageAddActivity({
      id: Date.now(),
      type: "rank_achieved",
      title: "অর্জন আনলক হয়েছে",
      description: `"${achievement.name}" অর্জন আনলক করেছেন`,
      timestamp: new Date().toISOString(),
    });
  }

  return success;
}

/**
 * Check and unlock achievements based on user progress
 */
export function checkAndUnlockAchievements(): void {
  const stats = getOrInitializeUserStats();
  const completedChallenges = getCompletedChallenges();
  const participations = getEventParticipations();

  // Check speed_run (completed in < 60 minutes)
  const speedRun = completedChallenges.find((c) => c.timeSpent < 60);
  if (speedRun && !isAchievementUnlocked("speed_run")) {
    unlockAchievementWithCheck("speed_run");
  }

  // Check perfectionist (10+ challenges without hints)
  const noHintsChallenges = completedChallenges.filter((c) => c.hintsUsed === 0);
  if (noHintsChallenges.length >= 10 && !isAchievementUnlocked("perfectionist")) {
    unlockAchievementWithCheck("perfectionist");
  }

  // Check team_leader
  if (stats.teamsMembership > 0 && !isAchievementUnlocked("team_leader")) {
    unlockAchievementWithCheck("team_leader");
  }

  // Check event_champion (high score in event)
  const topScores = participations.filter((p) => p.rank === 1);
  if (topScores.length > 0 && !isAchievementUnlocked("event_champion")) {
    unlockAchievementWithCheck("event_champion");
  }
}

// ============== Activities Service ==============

/**
 * Get recent activities
 */
export function getRecentActivities(limit = 20): RecentActivity[] {
  const activities = getActivities();
  return activities.slice(0, limit);
}

/**
 * Log activity
 */
export function logActivity(
  type: RecentActivity["type"],
  title: string,
  description: string,
): void {
  storageAddActivity({
    id: Date.now(),
    type,
    title,
    description,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Get activity summary by type
 */
export function getActivitySummary(): Record<string, number> {
  const activities = getActivities();
  const summary: Record<string, number> = {
    challenge_solved: 0,
    event_joined: 0,
    rank_achieved: 0,
    team_created: 0,
    team_joined: 0,
  };

  activities.forEach((activity) => {
    if (activity.type in summary) {
      summary[activity.type]++;
    }
  });

  return summary;
}

// ============== Challenge Progress Service ==============

/**
 * Get challenge completion status for an event
 */
export function getEventProgress(eventId: number) {
  const completed = getCompletedChallengesByEvent(eventId);
  const participation = getEventParticipations().find((p) => p.eventId === eventId);

  return {
    completed: completed.length,
    totalPoints: completed.reduce((sum, c) => sum + c.pointsEarned, 0),
    challenges: completed,
    participation,
  };
}

/**
 * Complete a challenge and update stats
 */
export function completeChallengeFull(
  challengeId: number,
  eventId: number,
  points: number,
  timeSpent = 0,
  hintsUsed = 0,
): boolean {
  // Mark challenge as completed
  const success = storageCompleteChallenge({
    challengeId,
    eventId,
    solvedAt: new Date().toISOString(),
    timeSpent,
    pointsEarned: points,
    hintsUsed,
  });

  if (success) {
    // Update stats
    const stats = getOrInitializeUserStats();
    stats.challengesSolved++;
    stats.totalPoints += points;
    stats.solveRate = `${Math.round((stats.challengesSolved / 100) * 100)}%`;
    saveUserStats(stats);

    // Update event score
    const participation = getEventParticipations().find((p) => p.eventId === eventId);
    if (participation) {
      storageUpdateEventScore(eventId, participation.score + points);
    }

    // Log activity
    logActivity("challenge_solved", "চ্যালেঞ্জ সমাধান করা হয়েছে", `চ্যালেঞ্জ #${challengeId} সমাধান করেছেন - ${points} পয়েন্ট অর্জন`);

    // Check achievements
    checkAndUnlockAchievements();

    // Update ranking
    updateRanking();

    return true;
  }

  return false;
}

/**
 * Get user statistics summary
 */
export function getUserStatisticsSummary() {
  const stats = getOrInitializeUserStats();
  const achievements = getUnlockedAchievements();
  const activities = getRecentActivities(10);
  const completedChallenges = getCompletedChallenges();

  return {
    stats,
    achievements,
    activities,
    completedCount: completedChallenges.length,
    totalTimeSpent: completedChallenges.reduce((sum, c) => sum + c.timeSpent, 0),
  };
}

// ============== Export Data Service ==============

/**
 * Export all user data as JSON
 */
export function exportUserData() {
  return {
    profile: getOrInitializeUserProfile(),
    stats: getOrInitializeUserStats(),
    achievements: getAllAchievements(),
    activities: getActivities(),
    completedChallenges: getCompletedChallenges(),
    eventParticipations: getEventParticipations(),
    exportedAt: new Date().toISOString(),
  };
}

/**
 * Get data size in storage
 */
export function getStorageSize(): number {
  if (typeof window === "undefined") return 0;

  let size = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      size += localStorage[key].length + key.length;
    }
  }

  return Math.round((size / 1024) * 100) / 100; // KB
}
