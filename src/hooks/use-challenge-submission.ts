/**
 * useChallengeSubmission Hook - Supabase Version
 * Manages flag submission, verification, and challenge completion
 * Now uses Supabase database instead of localStorage
 */

import { useState, useCallback, useEffect } from "react";
import {
  submitChallenge,
  completedChallenge,
  getUserChallengeSubmissions,
  isChallengeCompleted,
} from "@/lib/supabase/ctf-service";
import { useUser } from "@/lib/context/user-context";

export interface SubmissionResult {
  success: boolean;
  message: string;
  points?: number;
  error?: string;
}

export interface Submission {
  flag: string;
  is_correct: boolean;
  submitted_at: string;
}

export function useChallengeSubmission(challengeId: number, eventId: number) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
  const [flagInput, setFlagInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState<Submission[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load initial state on mount
  useEffect(() => {
    const loadState = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // Check if already completed
        const completed = await isChallengeCompleted(
          user.id,
          challengeId,
          eventId
        );
        setIsCompleted(completed);

        // Load submission history
        const history = await getUserChallengeSubmissions(
          user.id,
          challengeId,
          eventId
        );
        setSubmissionHistory(history || []);
      } catch (error) {
        console.error("Failed to load state:", error);
      } finally {
        setLoading(false);
      }
    };

    loadState();
  }, [user?.id, challengeId, eventId]);

  /**
   * Submit flag for verification
   */
  const submitFlag = useCallback(
    async (flag: string, correctFlag: string, timeSpent = 0, hintsUsed = 0) => {
      if (!flag.trim()) {
        setSubmissionResult({
          success: false,
          message: "❌ ফ্ল্যাগ ইনপুট করুন।",
        });
        setShowResult(true);
        return;
      }

      if (!user?.id) {
        setSubmissionResult({
          success: false,
          message: "❌ ব্যবহারকারী প্রমাণীকরণ প্রয়োজন।",
        });
        setShowResult(true);
        return;
      }

      setIsSubmitting(true);
      setShowResult(false);

      try {
        // Check if flag is correct
        const isCorrect =
          flag.trim().toLowerCase() === correctFlag.trim().toLowerCase();

        // Submit to database
        await submitChallenge(user.id, challengeId, eventId, flag, isCorrect);

        // If correct, mark as completed
        if (isCorrect) {
          await completedChallenge(
            user.id,
            challengeId,
            eventId,
            100, // Points (you may want to calculate this)
            timeSpent,
            hintsUsed
          );
          setIsCompleted(true);
        }

        // Update results
        setSubmissionResult({
          success: isCorrect,
          message: isCorrect
            ? "🎉 সঠিক! চমৎকার কাজ করেছো!"
            : "❌ ভুল। আবার চেষ্টা করো।",
          points: isCorrect ? 100 : undefined,
        });
        setShowResult(true);

        // Clear input if successful
        if (isCorrect) {
          setFlagInput("");
        }

        // Reload history
        const history = await getUserChallengeSubmissions(
          user.id,
          challengeId,
          eventId
        );
        setSubmissionHistory(history || []);
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
    [user?.id, challengeId, eventId]
  );

  /**
   * Download resource (placeholder - implement based on your needs)
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
    if (!user?.id) return;

    try {
      const history = await getUserChallengeSubmissions(
        user.id,
        challengeId,
        eventId
      );
      setSubmissionHistory(history || []);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  }, [user?.id, challengeId, eventId]);

  /**
   * Verify flag (helper)
   */
  const verifyFlag = useCallback(
    (flag: string, correctFlag: string) => {
      return flag.trim().toLowerCase() === correctFlag.trim().toLowerCase();
    },
    []
  );

  /**
   * Calculate score based on difficulty and submission count
   */
  const calculateScore = useCallback(
    (basePoints: number, timeSpent = 0, hintsUsed = 0, difficulty = "মধ্যম") => {
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

      // Reduce for attempts (based on submission history)
      const attemptPenalty = Math.min(submissionHistory.length * 5, 50);
      score -= attemptPenalty;

      return Math.max(Math.round(score), 10); // Minimum 10 points
    },
    [submissionHistory.length]
  );

  return {
    // State
    isSubmitting,
    flagInput,
    setFlagInput,
    submissionResult,
    showResult,
    setShowResult,
    submissionHistory,
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
