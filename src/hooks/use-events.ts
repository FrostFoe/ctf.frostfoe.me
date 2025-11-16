import { useCallback, useState, useEffect } from "react";
import {
  getEvents,
  getEventById,
  getTotalEventCount,
  getEventCountByStatus,
  type CTFEvent,
} from "@/lib/services/events.service";

export interface UseEventsOptions {
  autoLoad?: boolean;
  filters?: {
    status?: string;
    limit?: number;
    offset?: number;
  };
}

/**
 * Hook for managing events data
 */
export function useEvents(options: UseEventsOptions = {}) {
  const { autoLoad = true, filters } = options;

  const [events, setEvents] = useState<CTFEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvents(filters);
      setEvents(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "ইভেন্ট লোড করতে ব্যর্থ";
      setError(message);
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchEventById = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEventById(id);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "ইভেন্ট লোড করতে ব্যর্থ";
      setError(message);
      console.error("Error fetching event:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTotalCount = useCallback(async () => {
    try {
      return await getTotalEventCount();
    } catch (err) {
      console.error("Error getting event count:", err);
      return 0;
    }
  }, []);

  const getCountByStatus = useCallback(async (status: string) => {
    try {
      return await getEventCountByStatus(status);
    } catch (err) {
      console.error("Error getting event count by status:", err);
      return 0;
    }
  }, []);

  useEffect(() => {
    if (autoLoad) {
      fetchEvents();
    }
  }, [autoLoad, fetchEvents]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    fetchEventById,
    getTotalCount,
    getCountByStatus,
    setEvents,
  };
}
