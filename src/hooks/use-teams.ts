/**
 * useTeams Hook - Supabase Version
 * Manages team creation, joining, and member operations
 * Now uses Supabase database instead of localStorage
 */

import { useCallback, useState, useEffect } from "react";
import {
  createTeam,
  getTeamById,
  getTeams,
  getUserTeams,
  addTeamMember,
  removeTeamMember,
} from "@/lib/supabase/ctf-service";
import { useUser } from "@/lib/context/user-context";

export interface Team {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  is_public: boolean;
  join_code?: string;
  created_by: string;
  total_points: number;
  created_at: string;
  team_members?: Array<{
    id: number;
    user_id: string;
    role: "leader" | "moderator" | "member";
    joined_at: string;
  }>;
}

export interface TeamMember {
  id: number;
  user_id: string;
  role: "leader" | "moderator" | "member";
  joined_at: string;
}

export function useTeams() {
  const { user } = useUser();
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load teams on mount
  useEffect(() => {
    const loadTeams = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load public teams
        const publicTeams = await getTeams();
        setAllTeams(publicTeams || []);

        // Load user's teams if authenticated
        if (user?.id) {
          const userTeamsData = await getUserTeams(user.id);
          setUserTeams(userTeamsData || []);
        } else {
          setUserTeams([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load teams");
      } finally {
        setIsLoading(false);
      }
    };

    loadTeams();
  }, [user?.id]);

  /**
   * Create a new team
   */
  const createNewTeam = useCallback(
    async (
      teamName: string,
      description?: string,
      isPublic = true
    ): Promise<Team | null> => {
      if (!user?.id) {
        setError("User not authenticated");
        return null;
      }

      try {
        const team = await createTeam(user.id, teamName, description, isPublic);
        setUserTeams((prev) => [...prev, team]);
        return team;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to create team";
        setError(message);
        return null;
      }
    },
    [user?.id]
  );

  /**
   * Join team with code
   */
  const joinWithCode = useCallback(
    async (joinCode: string): Promise<Team | null> => {
      if (!user?.id) {
        setError("User not authenticated");
        return null;
      }

      try {
        // Find team by join code
        const teams = await getTeams();
        const targetTeam = teams.find((t) => t.join_code === joinCode);

        if (!targetTeam) {
          setError("Invalid join code");
          return null;
        }

        await addTeamMember(targetTeam.id, user.id, "member");
        setUserTeams((prev) => [...prev, targetTeam]);
        return targetTeam;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to join team";
        setError(message);
        return null;
      }
    },
    [user?.id]
  );

  /**
   * Join team directly
   */
  const joinDirect = useCallback(
    async (teamId: string): Promise<Team | null> => {
      if (!user?.id) {
        setError("User not authenticated");
        return null;
      }

      try {
        const team = await getTeamById(teamId);
        if (!team) {
          setError("Team not found");
          return null;
        }

        if (!team.is_public) {
          setError("This team is not public");
          return null;
        }

        await addTeamMember(teamId, user.id, "member");
        setUserTeams((prev) => [...prev, team]);
        return team;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to join team";
        setError(message);
        return null;
      }
    },
    [user?.id]
  );

  /**
   * Remove team member
   */
  const removeMember = useCallback(
    async (teamId: string, memberId: string): Promise<boolean> => {
      if (!user?.id) {
        setError("User not authenticated");
        return false;
      }

      try {
        const team = await getTeamById(teamId);
        if (team?.created_by !== user.id) {
          setError("Only team leader can remove members");
          return false;
        }

        await removeTeamMember(teamId, memberId);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove member");
        return false;
      }
    },
    [user?.id]
  );

  /**
   * Leave team
   */
  const leaveTeam = useCallback(
    async (teamId: string): Promise<boolean> => {
      if (!user?.id) {
        setError("User not authenticated");
        return false;
      }

      try {
        await removeTeamMember(teamId, user.id);
        setUserTeams((prev) => prev.filter((t) => t.id !== teamId));
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to leave team");
        return false;
      }
    },
    [user?.id]
  );

  /**
   * Get team by ID
   */
  const getTeam = useCallback(
    async (teamId: string): Promise<Team | null> => {
      try {
        return await getTeamById(teamId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to get team");
        return null;
      }
    },
    []
  );

  /**
   * Check if user is team member
   */
  const isMember = useCallback(
    (teamId: string): boolean => {
      return userTeams.some((t) => t.id === teamId);
    },
    [userTeams]
  );

  /**
   * Check if user is team leader
   */
  const isLeader = useCallback(
    async (teamId: string): Promise<boolean> => {
      if (!user?.id) return false;

      try {
        const team = await getTeamById(teamId);
        return team?.created_by === user.id;
      } catch {
        return false;
      }
    },
    [user?.id]
  );

  /**
   * Get public teams (searchable)
   */
  const getPublicTeams = useCallback(
    (query?: string): Team[] => {
      return allTeams.filter((t) => {
        if (!t.is_public) return false;
        if (query) {
          return t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.description?.toLowerCase().includes(query.toLowerCase());
        }
        return true;
      });
    },
    [allTeams]
  );

  return {
    isLoading,
    error,
    userTeams,
    allTeams,
    createNewTeam,
    joinWithCode,
    joinDirect,
    removeMember,
    leaveTeam,
    getTeam,
    isMember,
    isLeader,
    getPublicTeams,
  };
}
