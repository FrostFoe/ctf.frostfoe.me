/**
 * useCtfData Hook - Supabase Version
 * Manages CTF events, challenges, and user participation data
 * Now uses Supabase database instead of localStorage
 */

import { useCallback, useState, useEffect } from "react";
import {
  getEvents,
  getChallengesByEvent,
  joinEvent,
  getEventParticipation,
  updateEventParticipation,
  getCompletedChallenges,
  logActivity,
} from "@/lib/supabase/ctf-service";
import { useUser } from "@/lib/context/user-context";

export interface CtfEvent {
  id: number;
  slug: string;
  title: string;
  status: "ongoing" | "upcoming" | "ended";
  players_count?: number;
  total_challenges: number;
  [key: string]: any;
}

export interface Challenge {
  id: number;
  event_id: number;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  challenge_resources?: Array<{
    id: number;
    name: string;
    url: string;
  }>;
}

export function useCtfData() {
  const { user } = useUser();
  const [events, setEvents] = useState<CtfEvent[]>([]);
  const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
  const [eventProgress, setEventProgress] = useState<Record<number, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load events and participation data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load all events
        const eventsData = await getEvents();
        setEvents(eventsData || []);

        // Load user's participation if logged in
        if (user?.id) {
          // Fetch user's participations
          const participations = await Promise.all(
            (eventsData || []).map((event) =>
              getEventParticipation(user.id, event.id)
            )
          );

          const joinedEventIds = participations
            .map((p, idx) => (p ? (eventsData || [])[idx].id : null))
            .filter((id) => id !== null) as number[];

          setParticipatingEvents(joinedEventIds);

          // Load progress for each event
          const progressData: Record<number, any> = {};
          for (const eventId of joinedEventIds) {
            const completed = await getCompletedChallenges(user.id, eventId);
            progressData[eventId] = {
              totalPoints: completed.reduce((sum, c) => sum + c.points_earned, 0),
              completedCount: completed.length,
            };
          }
          setEventProgress(progressData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load CTF data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  /**
   * Join an event
   */
  const joinCtfEvent = useCallback(
    async (eventId: number, eventTitle: string): Promise<boolean> => {
      if (!user?.id) return false;

      try {
        // Check if already participating
        const existing = await getEventParticipation(user.id, eventId);
        if (existing) return false;

        // Join event
        await joinEvent(user.id, eventId);

        // Update local state
        setParticipatingEvents((prev) => [...prev, eventId]);

        // Log activity
        await logActivity(
          user.id,
          "event_joined",
          "ইভেন্টে যোগদান করেছেন",
          `"${eventTitle}" ইভেন্টে যোগদান করেছেন`
        );

        return true;
      } catch (err) {
        console.error("Failed to join event:", err);
        return false;
      }
    },
    [user?.id]
  );

  /**
   * Check if user is participating in event
   */
  const isParticipating = useCallback(
    (eventId: number): boolean => {
      return participatingEvents.includes(eventId);
    },
    [participatingEvents]
  );

  /**
   * Get event progress
   */
  const loadEventProgress = useCallback(
    async (eventId: number) => {
      if (!user?.id) return null;

      try {
        const completed = await getCompletedChallenges(user.id, eventId);
        const progress = {
          totalPoints: completed.reduce((sum, c) => sum + c.points_earned, 0),
          completedCount: completed.length,
        };

        setEventProgress((prev) => ({
          ...prev,
          [eventId]: progress,
        }));

        return progress;
      } catch (err) {
        console.error("Failed to load event progress:", err);
        return null;
      }
    },
    [user?.id]
  );

  /**
   * Get event participation details
   */
  const getEventDetails = useCallback(
    async (eventId: number) => {
      if (!user?.id) return null;

      try {
        return await getEventParticipation(user.id, eventId);
      } catch (err) {
        console.error("Failed to get event details:", err);
        return null;
      }
    },
    [user?.id]
  );

  /**
   * Update event score
   */
  const updateScore = useCallback(
    async (eventId: number, points: number): Promise<boolean> => {
      if (!user?.id) return false;

      try {
        const current = await getEventParticipation(user.id, eventId);
        if (!current) return false;

        const newScore = (current.score || 0) + points;
        await updateEventParticipation(user.id, eventId, {
          score: newScore,
        });

        // Update local state
        setEventProgress((prev) => ({
          ...prev,
          [eventId]: {
            ...prev[eventId],
            totalPoints: newScore,
          },
        }));

        return true;
      } catch (err) {
        console.error("Failed to update score:", err);
        return false;
      }
    },
    [user?.id]
  );

  return {
    isLoading,
    error,
    events,
    participatingEvents,
    eventProgress,
    joinCtfEvent,
    isParticipating,
    loadEventProgress,
    getEventDetails,
    updateScore,
  };
}
