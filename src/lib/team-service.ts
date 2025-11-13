/**
 * Team Service
 * Manages team creation, joining, members and team operations
 */

import {
  createTeam as storageCreateTeam,
  joinTeam as storageJoinTeam,
  getUserTeams,
  getUserTeamsMemberOf,
  getAllTeams,
  saveUserTeams,
  saveUserTeamsMemberOf,
  Team,
  TeamMember,
} from "./storage";
import { logActivity } from "./user-data";

// ============== Team Creation Service ==============

/**
 * Create a new team
 */
export function createNewTeam(
  teamName: string,
  description: string,
  currentUserId: string,
  currentUsername: string,
  currentAvatar: string,
  isPublic: boolean = true,
): Team | null {
  const team: Team = {
    id: `team_${Date.now()}`,
    name: teamName,
    description,
    members: [
      {
        userId: currentUserId,
        username: currentUsername,
        role: "leader",
        joinedAt: new Date().toISOString(),
        avatar: currentAvatar,
      },
    ],
    createdAt: new Date().toISOString(),
    createdBy: currentUserId,
    isPublic,
    joinCode: generateJoinCode(),
    totalPoints: 0,
  };

  const success = storageCreateTeam(team);

  if (success) {
    logActivity("team_created", "টিম তৈরি করা হয়েছে", `"${teamName}" টিম তৈরি করেছেন`);
    return team;
  }

  return null;
}

/**
 * Generate a unique join code for team
 */
export function generateJoinCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ============== Team Joining Service ==============

/**
 * Join team using join code
 */
export function joinTeamWithCode(
  joinCode: string,
  currentUserId: string,
  currentUsername: string,
  currentAvatar: string,
): Team | null {
  const allTeams = getAllTeams();
  const team = allTeams.find((t) => t.joinCode === joinCode);

  if (!team) {
    return null;
  }

  // Check if already a member
  if (team.members.some((m) => m.userId === currentUserId)) {
    return null;
  }

  // Add member to team
  const newMember: TeamMember = {
    userId: currentUserId,
    username: currentUsername,
    role: "member",
    joinedAt: new Date().toISOString(),
    avatar: currentAvatar,
  };

  team.members.push(newMember);

  // Update in storage
  const memberTeams = getUserTeamsMemberOf();
  memberTeams.push(team);
  saveUserTeamsMemberOf(memberTeams);

  logActivity("team_joined", "টিমে যোগদান করেছেন", `"${team.name}" টিমে যোগদান করেছেন`);

  return team;
}

/**
 * Join team directly
 */
export function joinTeamDirectly(
  teamId: string,
  currentUserId: string,
  currentUsername: string,
  currentAvatar: string,
): Team | null {
  const allTeams = getAllTeams();
  const team = allTeams.find((t) => t.id === teamId);

  if (!team || !team.isPublic) {
    return null;
  }

  // Check if already a member
  if (team.members.some((m) => m.userId === currentUserId)) {
    return null;
  }

  // Add member to team
  const newMember: TeamMember = {
    userId: currentUserId,
    username: currentUsername,
    role: "member",
    joinedAt: new Date().toISOString(),
    avatar: currentAvatar,
  };

  team.members.push(newMember);

  // Update in storage
  const memberTeams = getUserTeamsMemberOf();
  memberTeams.push(team);
  saveUserTeamsMemberOf(memberTeams);

  logActivity("team_joined", "টিমে যোগদান করেছেন", `"${team.name}" টিমে যোগদান করেছেন`);

  return team;
}

// ============== Team Member Management ==============

/**
 * Remove member from team
 */
export function removeTeamMember(teamId: string, memberId: string, currentUserId: string): boolean {
  const userTeams = getUserTeams();
  const team = userTeams.find((t) => t.id === teamId);

  if (!team || team.createdBy !== currentUserId) {
    return false;
  }

  team.members = team.members.filter((m) => m.userId !== memberId);
  saveUserTeams(userTeams);

  return true;
}

/**
 * Update member role
 */
export function updateMemberRole(
  teamId: string,
  memberId: string,
  newRole: "leader" | "moderator" | "member",
  currentUserId: string,
): boolean {
  const userTeams = getUserTeams();
  const team = userTeams.find((t) => t.id === teamId);

  if (!team || team.createdBy !== currentUserId) {
    return false;
  }

  const member = team.members.find((m) => m.userId === memberId);
  if (member) {
    member.role = newRole;
    saveUserTeams(userTeams);
    return true;
  }

  return false;
}

/**
 * Leave team
 */
export function leaveTeam(teamId: string, currentUserId: string): boolean {
  const memberTeams = getUserTeamsMemberOf();
  const team = memberTeams.find((t) => t.id === teamId);

  if (!team) {
    return false;
  }

  // Cannot leave if you're the leader
  const userMember = team.members.find((m) => m.userId === currentUserId);
  if (userMember?.role === "leader") {
    return false;
  }

  team.members = team.members.filter((m) => m.userId !== currentUserId);
  saveUserTeamsMemberOf(memberTeams);

  return true;
}

// ============== Team Information ==============

/**
 * Get team by ID
 */
export function getTeamById(teamId: string): Team | null {
  const allTeams = getAllTeams();
  return allTeams.find((t) => t.id === teamId) || null;
}

/**
 * Get team members
 */
export function getTeamMembers(teamId: string): TeamMember[] {
  const team = getTeamById(teamId);
  return team ? team.members : [];
}

/**
 * Check if user is team member
 */
export function isTeamMember(teamId: string, userId: string): boolean {
  const team = getTeamById(teamId);
  return team ? team.members.some((m) => m.userId === userId) : false;
}

/**
 * Check if user is team leader
 */
export function isTeamLeader(teamId: string, userId: string): boolean {
  const team = getTeamById(teamId);
  return team ? team.members.some((m) => m.userId === userId && m.role === "leader") : false;
}

/**
 * Get user role in team
 */
export function getUserTeamRole(teamId: string, userId: string): string | null {
  const team = getTeamById(teamId);
  const member = team?.members.find((m) => m.userId === userId);
  return member?.role || null;
}

// ============== Team Statistics ==============

/**
 * Calculate team statistics
 */
export function getTeamStatistics(teamId: string) {
  const team = getTeamById(teamId);

  if (!team) {
    return null;
  }

  return {
    teamId: team.id,
    teamName: team.name,
    memberCount: team.members.length,
    totalPoints: team.totalPoints,
    createdAt: team.createdAt,
    leader: team.members.find((m) => m.role === "leader"),
    members: team.members,
    isPublic: team.isPublic,
  };
}

/**
 * Get team ranking
 */
export function getTeamRanking(teams: Team[]): (Team & { rank: number })[] {
  return teams.sort((a, b) => b.totalPoints - a.totalPoints).map((team, index) => ({
    ...team,
    rank: index + 1,
  }));
}

/**
 * Update team points
 */
export function updateTeamPoints(teamId: string, points: number): boolean {
  const userTeams = getUserTeams();
  const team = userTeams.find((t) => t.id === teamId);

  if (team) {
    team.totalPoints += points;
    saveUserTeams(userTeams);
    return true;
  }

  const memberTeams = getUserTeamsMemberOf();
  const memberTeam = memberTeams.find((t) => t.id === teamId);

  if (memberTeam) {
    memberTeam.totalPoints += points;
    saveUserTeamsMemberOf(memberTeams);
    return true;
  }

  return false;
}

// ============== Team Discovery ==============

/**
 * Get public teams
 */
export function getPublicTeams(): Team[] {
  return getAllTeams().filter((t) => t.isPublic);
}

/**
 * Search teams
 */
export function searchTeams(query: string, onlyPublic: boolean = true): Team[] {
  const teams = onlyPublic ? getPublicTeams() : getAllTeams();
  const lowerQuery = query.toLowerCase();

  return teams.filter(
    (t) => t.name.toLowerCase().includes(lowerQuery) || t.description.toLowerCase().includes(lowerQuery),
  );
}

/**
 * Get teams by member count
 */
export function getTeamsBySize(minSize: number, maxSize: number): Team[] {
  return getAllTeams().filter((t) => t.members.length >= minSize && t.members.length <= maxSize);
}

/**
 * Get trending teams (most recent)
 */
export function getTrendingTeams(limit: number = 5): Team[] {
  return getAllTeams()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Get top teams by points
 */
export function getTopTeams(limit: number = 5): Team[] {
  return getAllTeams().sort((a, b) => b.totalPoints - a.totalPoints).slice(0, limit);
}
