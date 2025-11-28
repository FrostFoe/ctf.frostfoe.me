/**
 * Consolidated Data Hooks
 * Combines all data management functionality for the CTF platform
 */

import { useCallback, useState, useEffect } from "react";
import data from "@/lib/db.json";
import type { CTFStatus, CTFType } from "@/lib/types";

// ===== TYPES AND INTERFACES =====

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface UseEventsOptions {
  autoLoad?: boolean;
  filters?: {
    status?: string;
    limit?: number;
    offset?: number;
  };
}

export interface CtfEvent {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  badge?: string;
  status: CTFStatus;
  ctfType?: CTFType;
  totalChallenges: number;
  startDate?: string;
  endDate?: string;
  difficulty?: string;
  skillLevel?: string;
  location?: string;
  format?: string;
  hostedBy?: string;
  teamSize?: number;
  tags?: string[];
  imageUrl?: string;
  registrationUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Challenge {
  id: number;
  eventId: number;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  flag?: string;
  challengeResources?: Array<{
    id: number;
    name: string;
    url: string;
  }>;
}

export interface ChallengeCompletion {
  id: number;
  challenge_id: number;
  user_id: number;
  event_id: number;
  completed_at: string;
  time_spent?: number;
  hints_used: number;
  points_earned: number;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  points?: number;
  error?: string;
}

export interface EventProgress {
  totalPoints: number;
  completedCount: number;
}

// ===== PAGINATION HOOK =====

/**
 * Hook for managing pagination
 */
export function usePagination(initialPageSize: number = 10) {
  const [state, setState] = useState<PaginationState>({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
    totalPages: 0,
  });

  const setTotal = useCallback((total: number) => {
    setState((prev) => ({
      ...prev,
      total,
      totalPages: Math.ceil(total / prev.pageSize),
    }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setState((prev) => {
      const newPage = Math.max(1, Math.min(page, prev.totalPages || 1));
      return { ...prev, page: newPage };
    });
  }, []);

  const nextPage = useCallback(() => {
    setState((prev) => {
      if (prev.page < prev.totalPages) {
        return { ...prev, page: prev.page + 1 };
      }
      return prev;
    });
  }, []);

  const prevPage = useCallback(() => {
    setState((prev) => {
      if (prev.page > 1) {
        return { ...prev, page: prev.page - 1 };
      }
      return prev;
    });
  }, []);

  const changePageSize = useCallback((size: number) => {
    setState((prev) => ({
      ...prev,
      pageSize: size,
      page: 1,
      totalPages: Math.ceil(prev.total / size),
    }));
  }, []);

  const getOffset = useCallback(() => {
    return (state.page - 1) * state.pageSize;
  }, [state.page, state.pageSize]);

  return {
    ...state,
    setTotal,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
    getOffset,
    hasNextPage: state.page < state.totalPages,
    hasPrevPage: state.page > 1,
  };
}

// ===== EVENTS HOOK =====

/**
 * Hook for managing events data
 */
export function useEvents(options: UseEventsOptions = {}) {
  const { autoLoad = true, filters } = options;

  const [events, setEvents] = useState<CtfEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let filteredEvents = data.events.map((event): CtfEvent => ({
        id: event.id,
        slug: event.slug,
        title: event.title || "",
        subtitle: event.subtitle || undefined,
        description: event.description || undefined,
        image: event.image || event.imageUrl || undefined,
        badge: event.badge || undefined,
        status: event.status as CTFStatus,
        ctfType: event.ctfType as CTFType,
        totalChallenges: event.totalChallenges ?? 0,
        startDate: event.startDate || undefined,
        endDate: event.endDate || undefined,
        difficulty: event.difficulty || undefined,
        skillLevel: event.skillLevel || undefined,
        location: event.location || undefined,
        format: event.format || undefined,
        hostedBy: event.hostedBy || (event as any).hosted_by || undefined,
        teamSize: event.teamSize || (event as any).team_size || undefined,
        tags: Array.isArray(event.tags) ? event.tags : [],
        imageUrl: event.imageUrl || undefined,
        registrationUrl: event.registrationUrl || undefined,
        createdAt: event.createdAt || undefined,
        updatedAt: event.updatedAt || undefined,
      }));

      if (filters?.status) {
        filteredEvents = filteredEvents.filter(e => e.status === filters.status);
      }

      if (filters?.limit) {
        const offset = filters.offset || 0;
        filteredEvents = filteredEvents.slice(offset, offset + filters.limit);
      }

      setEvents(filteredEvents);
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
      const event = data.events.find(e => e.id === id);
      return event || null;
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
    return data.events.length;
  }, []);

  const getCountByStatus = useCallback(async (status: string) => {
    return data.events.filter(e => e.status === status).length;
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

// ===== CTF DATA HOOK =====

/**
 * Hook for managing CTF events and participation
 */
export function useCtfData() {
  const [events, setEvents] = useState<CtfEvent[]>([]);
  const [participatingEvents, setParticipatingEvents] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load events on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Load all events
        setEvents((data.events || []).map((event): CtfEvent => ({
          id: event.id,
          slug: event.slug,
          title: event.title || "",
          subtitle: event.subtitle || undefined,
          description: event.description || undefined,
          image: event.image || event.imageUrl || undefined,
          badge: event.badge || undefined,
          status: event.status as CTFStatus,
          ctfType: event.ctfType as CTFType,
          totalChallenges: event.totalChallenges ?? 0,
          startDate: event.startDate || undefined,
          endDate: event.endDate || undefined,
          difficulty: event.difficulty || undefined,
          skillLevel: event.skillLevel || undefined,
          location: event.location || undefined,
          format: event.format || undefined,
          hostedBy: event.hostedBy || (event as any).hosted_by || undefined,
          teamSize: event.teamSize || (event as any).team_size || undefined,
          tags: Array.isArray(event.tags) ? event.tags : [],
          imageUrl: event.imageUrl || undefined,
          registrationUrl: event.registrationUrl || undefined,
          createdAt: event.createdAt || undefined,
          updatedAt: event.updatedAt || undefined,
        })));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load CTF data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  /**
   * Join an event
   */
  const joinCtfEvent = useCallback(
    async (eventId: number): Promise<boolean> => {
      // Static, always return true
      setParticipatingEvents((prev) => [...prev, eventId]);
      return true;
    },
    []
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
    async () => {
      // Static progress
      return {
        totalPoints: 0,
        completedCount: 0,
      };
    },
    []
  );

  /**
   * Get event participation details
   */
  const getEventDetails = useCallback(
    async () => {
      // Static
      return null;
    },
    []
  );

  /**
   * Update event score
   */
  const updateScore = useCallback(
    async (): Promise<boolean> => {
      // Static
      return true;
    },
    []
  );

  return {
    isLoading,
    error,
    events,
    participatingEvents,
    joinCtfEvent,
    isParticipating,
    loadEventProgress,
    getEventDetails,
    updateScore,
  };
}

// ===== CHALLENGES HOOK =====

/**
 * Hook for managing challenge completion and hints
 * Uses localStorage for data persistence
 */
export function useChallenges() {
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem("completed_challenges");
      if (stored) {
        const data: ChallengeCompletion[] = JSON.parse(stored);
        return new Set(data.map((item: ChallengeCompletion) => item.challenge_id));
      }
    } catch (error) {
      console.error("Error loading completed challenges:", error);
    }
    return new Set();
  });

  const [revealedHints, setRevealedHints] = useState<Record<number, string[]>>(() => {
    try {
      const storedHints = localStorage.getItem("revealed_hints");
      if (storedHints) {
        return JSON.parse(storedHints);
      }
    } catch (error) {
      console.error("Error loading revealed hints:", error);
    }
    return {};
  });

  const [challengeData, setChallengeData] = useState<Record<number, ChallengeCompletion>>(() => {
    try {
      const stored = localStorage.getItem("completed_challenges");
      if (stored) {
        const data: ChallengeCompletion[] = JSON.parse(stored);
        const dataMap: Record<number, ChallengeCompletion> = {};
        data.forEach((item: ChallengeCompletion) => {
          dataMap[item.challenge_id] = item;
        });
        return dataMap;
      }
    } catch (error) {
      console.error("Error loading challenge data:", error);
    }
    return {};
  });

  /**
   * Save completed challenges to localStorage
   */
  const saveCompletedChallenges = useCallback((data: ChallengeCompletion[]) => {
    localStorage.setItem("completed_challenges", JSON.stringify(data));
  }, []);

  /**
   * Save revealed hints to localStorage
   */
  const saveRevealedHints = useCallback((hints: Record<number, string[]>) => {
    localStorage.setItem("revealed_hints", JSON.stringify(hints));
  }, []);

  /**
   * Check if challenge is solved
   */
  const isSolved = useCallback(
    (challengeId: number): boolean => {
      return completedChallenges.has(challengeId);
    },
    [completedChallenges]
  );

  /**
   * Get challenge completion details
   */
  const getChallengeData = useCallback(
    (challengeId: number): ChallengeCompletion | null => {
      return challengeData[challengeId] || null;
    },
    [challengeData]
  );

  /**
   * Complete a challenge
   */
  const solveChallenge = useCallback(
    async (
      challengeId: number,
      eventId: number,
      points: number,
      timeSpent = 0,
      hintsUsed = 0
    ): Promise<boolean> => {
      try {
        const userId = 1; // Default user ID for static mode

        const completion: ChallengeCompletion = {
          id: Date.now(),
          challenge_id: challengeId,
          user_id: userId,
          event_id: eventId,
          time_spent: timeSpent,
          hints_used: hintsUsed,
          points_earned: points,
          completed_at: new Date().toISOString(),
        };

        const existing = Object.values(challengeData);
        const updated = [...existing, completion];

        saveCompletedChallenges(updated);

        setCompletedChallenges(
          (prev) => new Set([...prev, challengeId])
        );

        setChallengeData((prev) => ({
          ...prev,
          [challengeId]: completion,
        }));

        return true;
      } catch (error) {
        console.error("Error saving challenge completion:", error);
        return false;
      }
    },
    [challengeData, saveCompletedChallenges]
  );

  /**
   * Reveal a hint
   */
  const openHint = useCallback(
    (
      challengeId: number,
      hintIndex: number,
      availableHints: string[]
    ): string | null => {
      const hint = availableHints[hintIndex] || null;

      if (hint) {
        const updatedHints = {
          ...revealedHints,
          [challengeId]: [...(revealedHints[challengeId] || []), hint],
        };
        setRevealedHints(updatedHints);
        saveRevealedHints(updatedHints);
      }

      return hint;
    },
    [revealedHints, saveRevealedHints]
  );

  /**
   * Get revealed hints count
   */
  const getHintsUsed = useCallback(
    (challengeId: number): number => {
      return revealedHints[challengeId]?.length || 0;
    },
    [revealedHints]
  );

  /**
   * Get all revealed hints
   */
  const getHints = useCallback(
    (challengeId: number): string[] => {
      return revealedHints[challengeId] || [];
    },
    [revealedHints]
  );

  /**
   * Get completion time
   */
  const getTime = useCallback(
    (challengeId: number): number | null => {
      return challengeData[challengeId]?.time_spent || null;
    },
    [challengeData]
  );

  /**
   * Get points earned
   */
  const getPoints = useCallback(
    (challengeId: number): number | null => {
      return challengeData[challengeId]?.points_earned || null;
    },
    [challengeData]
  );

  return {
    isSolved,
    getChallengeData,
    solveChallenge,
    openHint,
    getHintsUsed,
    getHints,
    getTime,
    getPoints,
    completedChallenges,
  };
}

// ===== CHALLENGE SUBMISSION HOOK =====

/**
 * Hook for managing flag submission for individual challenges
 */
export function useChallengeSubmission(challengeId: number) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
  const [flagInput, setFlagInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load initial state on mount
  useEffect(() => {
    const loadState = async () => {
      setLoading(false);
    };
    loadState();
  }, []);

  /**
   * Submit flag for verification
   */
  const submitFlag = useCallback(
    async (flag: string) => {
      if (!flag.trim()) {
        setSubmissionResult({
          success: false,
          message: "❌ ফ্ল্যাগ ইনপুট করুন।",
        });
        setShowResult(true);
        return;
      }

      setIsSubmitting(true);
      setShowResult(false);

      try {
        // Get correct flag from data
        const challenge = data.challenges.find(c => c.id === challengeId);
        const correctFlag = challenge?.flag || "";

        // Check if flag is correct
        const isCorrect = flag.trim().toLowerCase() === correctFlag.trim().toLowerCase();

        // Update results
        setSubmissionResult({
          success: isCorrect,
          message: isCorrect
            ? "🎉 সঠিক! চমৎকার কাজ করেছো!"
            : "❌ ভুল। আবার চেষ্টা করো।",
          points: isCorrect ? (challenge?.points || 100) : undefined,
        });
        setShowResult(true);

        // Clear input if successful
        if (isCorrect) {
          setFlagInput("");
          setIsCompleted(true);
        }
      } catch (error) {
        console.error("Submission error:", error);
        setSubmissionResult({
          success: false,
          message: "❌ সাবমিশনে ত্রুটি। আবার চেষ্টা করুন।",
        });
        setShowResult(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [challengeId]
  );

  /**
   * Download resource
   */
  const downloadResource = useCallback(
    (resourceUrl: string, resourceName: string) => {
      // This is a simple implementation - you may want to track downloads in DB
      const link = document.createElement("a");
      link.href = resourceUrl;
      link.download = resourceName;
      link.click();
      return true;
    },
    []
  );

  /**
   * Load submission history
   */
  const loadHistory = useCallback(async () => {
    // Static, no history
  }, []);

  /**
   * Verify flag (helper)
   */
  const verifyFlag = useCallback(
    (flag: string) => {
      const challenge = data.challenges.find(c => c.id === challengeId);
      const correctFlag = challenge?.flag || "";
      return flag.trim().toLowerCase() === correctFlag.trim().toLowerCase();
    },
    [challengeId]
  );

  /**
   * Calculate score based on difficulty and submission count
   */
  const calculateScore = useCallback(
    (basePoints: number, hintsUsed = 0, difficulty = "মধ্যম") => {
      let score = basePoints;

      // Reduce points for hints used
      score -= hintsUsed * 10;

      // Apply difficulty multiplier
      const multipliers: Record<string, number> = {
        সহজ: 0.5,
        মধ্যম: 1,
        কঠিন: 1.5,
      };

      score *= multipliers[difficulty] || 1;

      return Math.max(Math.round(score), 10); // Minimum 10 points
    },
    []
  );

  return {
    // State
    isSubmitting,
    flagInput,
    setFlagInput,
    submissionResult,
    showResult,
    setShowResult,
    loading,

    // Methods
    submitFlag,
    downloadResource,
    loadHistory,
    verifyFlag,
    calculateScore,

    // Status
    isCompleted,
  };
}