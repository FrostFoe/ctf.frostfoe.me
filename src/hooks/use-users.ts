import { useCallback, useState, useEffect } from "react";
import {
  getUsers,
  getUserById,
  getTotalUserCount,
  getUserCountByRole,
  getUserStats,
  type User,
} from "@/lib/services/users.service";

export interface UseUsersOptions {
  autoLoad?: boolean;
  filters?: {
    role?: string;
    limit?: number;
    offset?: number;
  };
}

/**
 * Hook for managing users data
 */
export function useUsers(options: UseUsersOptions = {}) {
  const { autoLoad = true, filters } = options;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers(filters);
      setUsers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "ব্যবহারকারী লোড করতে ব্যর্থ";
      setError(message);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchUserById = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserById(id);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "ব্যবহারকারী লোড করতে ব্যর্থ";
      setError(message);
      console.error("Error fetching user:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTotalCount = useCallback(async () => {
    try {
      return await getTotalUserCount();
    } catch (err) {
      console.error("Error getting user count:", err);
      return 0;
    }
  }, []);

  const getCountByRole = useCallback(async (role: string) => {
    try {
      return await getUserCountByRole(role);
    } catch (err) {
      console.error("Error getting user count by role:", err);
      return 0;
    }
  }, []);

  const getStats = useCallback(async () => {
    try {
      return await getUserStats();
    } catch (err) {
      console.error("Error getting user stats:", err);
      return { total: 0, admins: 0, organizers: 0, users: 0 };
    }
  }, []);

  useEffect(() => {
    if (autoLoad) {
      fetchUsers();
    }
  }, [autoLoad, fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    getTotalCount,
    getCountByRole,
    getStats,
    setUsers,
  };
}
