/**
 * useCtfData Hook
 * Manages CTF events, challenges, and user participation data
 */

import { useCallback, useState, useEffect } from "react";
import {
  joinEvent,
  isParticipatingInEvent,
  getEventParticipation,
  updateEventScore,
} from "@/lib/storage";
import { getEventProgress } from "@/lib/challenge-service";
import { logActivity } from "@/lib/user-data";

export interface CtfEvent {
  id: number;
  slug: string;
  title: string;
  status: "ongoing" | "upcoming" | "ended";
  players: number;
  totalChallenges: number;
  completedChallenges: number;
  [key: string]: any;
}

export function useCtfData() {
  const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
  const [eventProgress, setEventProgress] = useState<Record<number, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load participation data on mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

  /**
   * Join an event
   */
  const joinCtfEvent = useCallback(
    (eventId: number, eventTitle: string): boolean => {
      if (isParticipatingInEvent(eventId)) {
        return false;
      }

      const success = joinEvent(eventId);

      if (success) {
        setParticipatingEvents((prev) => [...prev, eventId]);
        logActivity(
          "event_joined",
          "ইভেন্টে যোগদান করেছেন",
          `"${eventTitle}" ইভেন্টে যোগদান করেছেন`,
        );
        return true;
      }

      return false;
    },
    [],
  );

  /**
   * Check if user is participating in event
   */
  const isParticipating = useCallback((eventId: number): boolean => {
    return isParticipatingInEvent(eventId);
  }, []);

  /**
   * Get event progress
   */
  const loadEventProgress = useCallback((eventId: number, totalChallenges: number) => {
    const progress = getEventProgress(eventId, totalChallenges);
    setEventProgress((prev) => ({
      ...prev,
      [eventId]: progress,
    }));
    return progress;
  }, []);

  /**
   * Get event participation details
   */
  const getEventDetails = useCallback((eventId: number) => {
    return getEventParticipation(eventId);
  }, []);

  /**
   * Update event score
   */
  const updateScore = useCallback((eventId: number, points: number): boolean => {
    const success = updateEventScore(eventId, points);
    if (success) {
      const details = getEventParticipation(eventId);
      if (details) {
        setEventProgress((prev) => ({
          ...prev,
          [eventId]: {
            ...prev[eventId],
            totalPoints: details.score,
          },
        }));
      }
    }
    return success;
  }, []);

  return {
    isLoading,
    participatingEvents,
    eventProgress,
    joinCtfEvent,
    isParticipating,
    loadEventProgress,
    getEventDetails,
    updateScore,
  };
}
