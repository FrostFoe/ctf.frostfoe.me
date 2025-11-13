/**
 * useTeams Hook
 * Manages team creation, joining, and member operations
 */

import { useCallback, useState, useEffect } from "react";
import {
  createNewTeam,
  joinTeamWithCode,
  joinTeamDirectly,
  removeTeamMember,
  updateMemberRole,
  leaveTeam,
  getTeamById,
  getTeamMembers,
  isTeamMember,
  isTeamLeader,
  getUserTeamRole,
  getTeamStatistics,
  getAllTeams,
  getPublicTeams,
  searchTeams,
  updateTeamPoints,
} from "@/lib/team-service";
import type { Team, TeamMember } from "@/lib/storage";

export function useTeams() {
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load teams on mount
  useEffect(() => {
    const teams = getAllTeams();
    setUserTeams(teams);
    setIsLoading(false);
  }, []);

  /**
   * Create a new team
   */
  const createTeam = useCallback(
    (
      teamName: string,
      description: string,
      currentUserId: string,
      currentUsername: string,
      currentAvatar: string,
      isPublic = true,
    ): Team | null => {
      const team = createNewTeam(
        teamName,
        description,
        currentUserId,
        currentUsername,
        currentAvatar,
        isPublic,
      );

      if (team) {
        setUserTeams((prev) => [...prev, team]);
      }

      return team;
    },
    [],
  );

  /**
   * Join team with code
   */
  const joinWithCode = useCallback(
    (
      joinCode: string,
      currentUserId: string,
      currentUsername: string,
      currentAvatar: string,
    ): Team | null => {
      const team = joinTeamWithCode(
        joinCode,
        currentUserId,
        currentUsername,
        currentAvatar,
      );

      if (team) {
        setUserTeams((prev) => [...prev, team]);
      }

      return team;
    },
    [],
  );

  /**
   * Join team directly
   */
  const joinDirect = useCallback(
    (
      teamId: string,
      currentUserId: string,
      currentUsername: string,
      currentAvatar: string,
    ): Team | null => {
      const team = joinTeamDirectly(
        teamId,
        currentUserId,
        currentUsername,
        currentAvatar,
      );

      if (team) {
        setUserTeams((prev) => [...prev, team]);
      }

      return team;
    },
    [],
  );

  /**
   * Remove team member
   */
  const removeMember = useCallback(
    (teamId: string, memberId: string, currentUserId: string): boolean => {
      const success = removeTeamMember(teamId, memberId, currentUserId);

      if (success) {
        const team = getTeamById(teamId);
        if (team) {
          setUserTeams((prev) => prev.map((t) => (t.id === teamId ? team : t)));
        }
      }

      return success;
    },
    [],
  );

  /**
   * Update member role
   */
  const changeMemberRole = useCallback(
    (
      teamId: string,
      memberId: string,
      newRole: "leader" | "moderator" | "member",
      currentUserId: string,
    ): boolean => {
      const success = updateMemberRole(
        teamId,
        memberId,
        newRole,
        currentUserId,
      );

      if (success) {
        const team = getTeamById(teamId);
        if (team) {
          setUserTeams((prev) => prev.map((t) => (t.id === teamId ? team : t)));
        }
      }

      return success;
    },
    [],
  );

  /**
   * Leave team
   */
  const leaveCurrentTeam = useCallback(
    (teamId: string, currentUserId: string): boolean => {
      const success = leaveTeam(teamId, currentUserId);

      if (success) {
        setUserTeams((prev) => prev.filter((t) => t.id !== teamId));
      }

      return success;
    },
    [],
  );

  /**
   * Get team by ID
   */
  const getTeam = useCallback((teamId: string): Team | null => {
    return getTeamById(teamId);
  }, []);

  /**
   * Get team members
   */
  const getMembers = useCallback((teamId: string): TeamMember[] => {
    return getTeamMembers(teamId);
  }, []);

  /**
   * Check if user is team member
   */
  const isMember = useCallback((teamId: string, userId: string): boolean => {
    return isTeamMember(teamId, userId);
  }, []);

  /**
   * Check if user is team leader
   */
  const isLeader = useCallback((teamId: string, userId: string): boolean => {
    return isTeamLeader(teamId, userId);
  }, []);

  /**
   * Get user role in team
   */
  const getUserRole = useCallback(
    (teamId: string, userId: string): string | null => {
      return getUserTeamRole(teamId, userId);
    },
    [],
  );

  /**
   * Get team statistics
   */
  const getStats = useCallback((teamId: string) => {
    return getTeamStatistics(teamId);
  }, []);

  /**
   * Get public teams
   */
  const getPublic = useCallback((): Team[] => {
    return getPublicTeams();
  }, []);

  /**
   * Search teams
   */
  const searchTeamsFunc = useCallback(
    (query: string, onlyPublic = true): Team[] => {
      return searchTeams(query, onlyPublic);
    },
    [],
  );

  /**
   * Update team points
   */
  const addPoints = useCallback((teamId: string, points: number): boolean => {
    const success = updateTeamPoints(teamId, points);

    if (success) {
      const team = getTeamById(teamId);
      if (team) {
        setUserTeams((prev) => prev.map((t) => (t.id === teamId ? team : t)));
      }
    }

    return success;
  }, []);

  return {
    isLoading,
    userTeams,
    createTeam,
    joinWithCode,
    joinDirect,
    removeMember,
    changeMemberRole,
    leaveCurrentTeam,
    getTeam,
    getMembers,
    isMember,
    isLeader,
    getUserRole,
    getStats,
    getPublic,
    searchTeamsFunc,
    addPoints,
  };
}
