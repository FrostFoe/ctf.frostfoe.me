/**
 * Storage utilities for CTF Platform
 * Handles localStorage and JSON data persistence
 */

// User Profile Interface
export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  email: string;
  joinDate: string;
  country: string;
  totalPoints: number;
  ranking: number;
  solveRate: string;
}

// User Statistics Interface
export interface UserStats {
  totalPoints: number;
  ranking: number;
  challengesSolved: number;
  eventParticipations: number;
  teamsMembership: number;
  currentStreak: number;
  longestStreak: number;
  solveRate: string;
}

// Achievement Interface
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

// Recent Activity Interface
export interface RecentActivity {
  id: number;
  type:
    | "challenge_solved"
    | "event_joined"
    | "rank_achieved"
    | "team_created"
    | "team_joined";
  title: string;
  description: string;
  timestamp: string;
  date: Date;
}

// Completed Challenge Interface
export interface CompletedChallenge {
  challengeId: number;
  eventId: number;
  solvedAt: string;
  timeSpent: number; // in minutes
  pointsEarned: number;
  hintsUsed: number;
}

// Event Participation Interface
export interface EventParticipation {
  eventId: number;
  joinedAt: string;
  status: "participating" | "completed" | "abandoned";
  score: number;
  rank: number;
}

// Team Interface
export interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: string;
  createdBy: string;
  logo?: string;
  isPublic: boolean;
  joinCode?: string;
  totalPoints: number;
}

// Team Member Interface
export interface TeamMember {
  userId: string;
  username: string;
  role: "leader" | "moderator" | "member";
  joinedAt: string;
  avatar: string;
}

// User Settings Interface
export interface UserSettings {
  theme: "dark" | "light" | "auto";
  accentColor: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  digestEmails: boolean;
  challengeUpdates: boolean;
  profileVisibility: "public" | "friends" | "private";
  twoFactorAuth: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
}

// ============== Storage Keys ==============
const STORAGE_KEYS = {
  USER_PROFILE: "ctf_user_profile",
  USER_STATS: "ctf_user_stats",
  USER_ACHIEVEMENTS: "ctf_user_achievements",
  USER_ACTIVITIES: "ctf_user_activities",
  COMPLETED_CHALLENGES: "ctf_completed_challenges",
  EVENT_PARTICIPATIONS: "ctf_event_participations",
  USER_TEAMS: "ctf_user_teams",
  USER_TEAMS_MEMBER_OF: "ctf_user_teams_member_of",
  USER_SETTINGS: "ctf_user_settings",
  USER_SESSION: "ctf_user_session",
};

// ============== Generic Storage Functions ==============

/**
 * Get data from localStorage
 */
export function getFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error);
    return null;
  }
}

/**
 * Save data to localStorage
 */
export function saveToStorage<T>(key: string, data: T): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving to storage (${key}):`, error);
    return false;
  }
}

/**
 * Remove data from localStorage
 */
export function removeFromStorage(key: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from storage (${key}):`, error);
    return false;
  }
}

/**
 * Clear all CTF-related storage
 */
export function clearAllStorage(): boolean {
  if (typeof window === "undefined") return false;

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error("Error clearing storage:", error);
    return false;
  }
}

// ============== User Profile Functions ==============

/**
 * Get user profile from storage
 */
export function getUserProfile(): UserProfile | null {
  return getFromStorage<UserProfile>(STORAGE_KEYS.USER_PROFILE);
}

/**
 * Save user profile to storage
 */
export function saveUserProfile(profile: UserProfile): boolean {
  return saveToStorage(STORAGE_KEYS.USER_PROFILE, profile);
}

/**
 * Initialize default user profile
 */
export function initializeDefaultUserProfile(): UserProfile {
  const defaultProfile: UserProfile = {
    id: "user_" + Date.now(),
    username: "security_hacker",
    displayName: "মোহাম্মদ আহমেদ",
    avatar: "",
    bio: "Cybersecurity enthusiast এবং CTF প্রতিযোগী। সর্বদা নতুন দক্ষতা শিখছি।",
    email: "user@example.com",
    joinDate: new Date().toISOString().split("T")[0],
    country: "বাংলাদেশ",
    totalPoints: 0,
    ranking: 0,
    solveRate: "0%",
  };

  saveUserProfile(defaultProfile);
  return defaultProfile;
}

// ============== User Stats Functions ==============

/**
 * Get user statistics from storage
 */
export function getUserStats(): UserStats | null {
  return getFromStorage<UserStats>(STORAGE_KEYS.USER_STATS);
}

/**
 * Save user statistics to storage
 */
export function saveUserStats(stats: UserStats): boolean {
  return saveToStorage(STORAGE_KEYS.USER_STATS, stats);
}

/**
 * Initialize default user statistics
 */
export function initializeDefaultUserStats(): UserStats {
  const defaultStats: UserStats = {
    totalPoints: 0,
    ranking: 0,
    challengesSolved: 0,
    eventParticipations: 0,
    teamsMembership: 0,
    currentStreak: 0,
    longestStreak: 0,
    solveRate: "0%",
  };

  saveUserStats(defaultStats);
  return defaultStats;
}

// ============== Achievements Functions ==============

/**
 * Get all achievements from storage
 */
export function getAchievements(): Achievement[] {
  return getFromStorage<Achievement[]>(STORAGE_KEYS.USER_ACHIEVEMENTS) || [];
}

/**
 * Save achievements to storage
 */
export function saveAchievements(achievements: Achievement[]): boolean {
  return saveToStorage(STORAGE_KEYS.USER_ACHIEVEMENTS, achievements);
}

/**
 * Unlock an achievement
 */
export function unlockAchievement(achievement: Achievement): boolean {
  const achievements = getAchievements();
  if (!achievements.find((a) => a.id === achievement.id)) {
    achievements.push({
      ...achievement,
      unlockedAt: new Date().toISOString().split("T")[0],
    });
    return saveAchievements(achievements);
  }
  return false;
}

// ============== Activities Functions ==============

/**
 * Get all recent activities from storage
 */
export function getActivities(): RecentActivity[] {
  const activities =
    getFromStorage<RecentActivity[]>(STORAGE_KEYS.USER_ACTIVITIES) || [];
  return activities.map((a) => ({
    ...a,
    date: new Date(a.timestamp),
  }));
}

/**
 * Save activities to storage
 */
export function saveActivities(activities: RecentActivity[]): boolean {
  return saveToStorage(STORAGE_KEYS.USER_ACTIVITIES, activities);
}

/**
 * Add new activity
 */
export function addActivity(activity: Omit<RecentActivity, "date">): boolean {
  const activities =
    getFromStorage<RecentActivity[]>(STORAGE_KEYS.USER_ACTIVITIES) || [];
  activities.unshift({
    ...activity,
    date: new Date(activity.timestamp),
  });

  // Keep only last 100 activities
  if (activities.length > 100) {
    activities.pop();
  }

  return saveActivities(activities);
}

// ============== Completed Challenges Functions ==============

/**
 * Get all completed challenges
 */
export function getCompletedChallenges(): CompletedChallenge[] {
  return (
    getFromStorage<CompletedChallenge[]>(STORAGE_KEYS.COMPLETED_CHALLENGES) ||
    []
  );
}

/**
 * Save completed challenges to storage
 */
export function saveCompletedChallenges(
  challenges: CompletedChallenge[],
): boolean {
  return saveToStorage(STORAGE_KEYS.COMPLETED_CHALLENGES, challenges);
}

/**
 * Mark challenge as completed
 */
export function completeChallenge(challenge: CompletedChallenge): boolean {
  const completed = getCompletedChallenges();

  // Check if already completed
  if (completed.find((c) => c.challengeId === challenge.challengeId)) {
    return false;
  }

  completed.push({
    ...challenge,
    solvedAt: new Date().toISOString(),
  });

  return saveCompletedChallenges(completed);
}

/**
 * Check if challenge is completed
 */
export function isChallengeCompleted(challengeId: number): boolean {
  const completed = getCompletedChallenges();
  return completed.some((c) => c.challengeId === challengeId);
}

/**
 * Get completed challenges for an event
 */
export function getCompletedChallengesByEvent(
  eventId: number,
): CompletedChallenge[] {
  const completed = getCompletedChallenges();
  return completed.filter((c) => c.eventId === eventId);
}

// ============== Event Participation Functions ==============

/**
 * Get all event participations
 */
export function getEventParticipations(): EventParticipation[] {
  return (
    getFromStorage<EventParticipation[]>(STORAGE_KEYS.EVENT_PARTICIPATIONS) ||
    []
  );
}

/**
 * Save event participations to storage
 */
export function saveEventParticipations(
  participations: EventParticipation[],
): boolean {
  return saveToStorage(STORAGE_KEYS.EVENT_PARTICIPATIONS, participations);
}

/**
 * Join an event
 */
export function joinEvent(eventId: number): boolean {
  const participations = getEventParticipations();

  // Check if already joined
  if (participations.find((p) => p.eventId === eventId)) {
    return false;
  }

  participations.push({
    eventId,
    joinedAt: new Date().toISOString(),
    status: "participating",
    score: 0,
    rank: 0,
  });

  return saveEventParticipations(participations);
}

/**
 * Check if user is participating in event
 */
export function isParticipatingInEvent(eventId: number): boolean {
  const participations = getEventParticipations();
  return participations.some((p) => p.eventId === eventId);
}

/**
 * Get event participation details
 */
export function getEventParticipation(
  eventId: number,
): EventParticipation | null {
  const participations = getEventParticipations();
  return participations.find((p) => p.eventId === eventId) || null;
}

/**
 * Update event participation score
 */
export function updateEventScore(eventId: number, points: number): boolean {
  const participations = getEventParticipations();
  const participation = participations.find((p) => p.eventId === eventId);

  if (participation) {
    participation.score = points;
    return saveEventParticipations(participations);
  }

  return false;
}

// ============== Teams Functions ==============

/**
 * Get all teams created by user
 */
export function getUserTeams(): Team[] {
  return getFromStorage<Team[]>(STORAGE_KEYS.USER_TEAMS) || [];
}

/**
 * Save user teams to storage
 */
export function saveUserTeams(teams: Team[]): boolean {
  return saveToStorage(STORAGE_KEYS.USER_TEAMS, teams);
}

/**
 * Get all teams user is member of
 */
export function getUserTeamsMemberOf(): Team[] {
  return getFromStorage<Team[]>(STORAGE_KEYS.USER_TEAMS_MEMBER_OF) || [];
}

/**
 * Save teams user is member of to storage
 */
export function saveUserTeamsMemberOf(teams: Team[]): boolean {
  return saveToStorage(STORAGE_KEYS.USER_TEAMS_MEMBER_OF, teams);
}

/**
 * Create a new team
 */
export function createTeam(team: Team): boolean {
  const teams = getUserTeams();
  teams.push(team);
  return saveUserTeams(teams);
}

/**
 * Join a team
 */
export function joinTeam(team: Team, currentUserId: string): boolean {
  const memberTeams = getUserTeamsMemberOf();
  memberTeams.push(team);
  return saveUserTeamsMemberOf(memberTeams);
}

/**
 * Get all teams (created + member of)
 */
export function getAllTeams(): Team[] {
  return [...getUserTeams(), ...getUserTeamsMemberOf()];
}

// ============== Settings Functions ==============

/**
 * Get user settings from storage
 */
export function getUserSettings(): UserSettings | null {
  return getFromStorage<UserSettings>(STORAGE_KEYS.USER_SETTINGS);
}

/**
 * Save user settings to storage
 */
export function saveUserSettings(settings: UserSettings): boolean {
  return saveToStorage(STORAGE_KEYS.USER_SETTINGS, settings);
}

/**
 * Initialize default user settings
 */
export function initializeDefaultUserSettings(): UserSettings {
  const defaultSettings: UserSettings = {
    theme: "dark",
    accentColor: "#3b82f6",
    emailNotifications: true,
    pushNotifications: true,
    digestEmails: false,
    challengeUpdates: true,
    profileVisibility: "public",
    twoFactorAuth: false,
    language: "bn",
    timezone: "Asia/Dhaka",
    dateFormat: "DD/MM/YYYY",
  };

  saveUserSettings(defaultSettings);
  return defaultSettings;
}

/**
 * Update specific setting
 */
export function updateSetting<K extends keyof UserSettings>(
  key: K,
  value: UserSettings[K],
): boolean {
  const settings = getUserSettings() || initializeDefaultUserSettings();
  settings[key] = value;
  return saveUserSettings(settings);
}
