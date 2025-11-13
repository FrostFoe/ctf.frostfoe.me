/**
 * useChallengeSubmission Hook
 * Manages flag submission, verification, and challenge completion
 */

import { useState, useCallback } from "react";
import {
  submitFlagAndUpdate,
  verifyFlag,
  trackResourceDownload,
  logSubmissionAttempt,
  calculateChallengeScore,
  getSubmissionHistory,
  getChallengeStats,
} from "@/lib/challenge-submission";
import { isChallengeCompleted } from "@/lib/storage";

export interface SubmissionResult {
  success: boolean;
  message: string;
  points?: number;
  error?: string;
}

export function useChallengeSubmission(challengeId: number, eventId: number) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
  const [flagInput, setFlagInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState<any>(null);

  // Load submission history on mount
  const loadHistory = useCallback(() => {
    const history = getSubmissionHistory(challengeId);
    setSubmissionHistory(history);
  }, [challengeId]);

  /**
   * Submit flag for verification
   */
  const submitFlag = useCallback(
    async (flag: string, timeSpent = 0, hintsUsed = 0) => {
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
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Log submission attempt
        const isCorrect = verifyFlag(challengeId, flag);
        logSubmissionAttempt(challengeId, flag, isCorrect);

        // Submit and update
        const result = submitFlagAndUpdate(
          challengeId,
          eventId,
          flag,
          timeSpent,
          hintsUsed,
        );

        setSubmissionResult(result);
        setShowResult(true);

        // Clear input if successful
        if (result.success) {
          setFlagInput("");
          loadHistory();
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
    [challengeId, eventId, loadHistory],
  );

  /**
   * Download resource
   */
  const downloadResource = useCallback(
    (resourceName: string, sizeBytes = 0) => {
      const result = trackResourceDownload(
        challengeId,
        resourceName,
        sizeBytes,
      );
      return result.downloadUrl;
    },
    [challengeId],
  );

  /**
   * Check if challenge is completed
   */
  const isCompleted = isChallengeCompleted(challengeId);

  /**
   * Get current challenge stats
   */
  const stats = getChallengeStats(challengeId);

  return {
    // State
    isSubmitting,
    flagInput,
    setFlagInput,
    submissionResult,
    showResult,
    setShowResult,
    submissionHistory,

    // Methods
    submitFlag,
    downloadResource,
    loadHistory,
    verifyFlag: (flag: string) => verifyFlag(challengeId, flag),
    calculateScore: (
      timeSpent: number,
      hintsUsed: number,
      difficulty?: string,
      solveCount?: number,
    ) =>
      calculateChallengeScore(
        100,
        timeSpent,
        hintsUsed,
        difficulty,
        solveCount,
      ),

    // Status
    isCompleted,
    stats,
  };
}
