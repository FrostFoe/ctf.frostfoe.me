/**
 * Flag Submission Form Component
 * Handles flag input and submission with feedback
 * Includes input validation and sanitization
 */

"use client";

import { useState, useEffect } from "react";
import {
  Check,
  X,
  Loader2,
  Copy,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { useChallengeSubmission } from "@/hooks/use-data";

interface FlagSubmissionFormProps {
  challengeId: number;
  eventId: number;
  timeSpent?: number;
  hintsUsed?: number;
  onSuccess?: (points: number) => void;
}

export function FlagSubmissionForm({
  challengeId,
  eventId,
  timeSpent = 0,
  hintsUsed = 0,
  onSuccess,
}: FlagSubmissionFormProps) {
  const {
    isSubmitting,
    flagInput,
    setFlagInput,
    submissionResult,
    showResult,
    setShowResult,
    isCompleted,
    submitFlag,
  } = useChallengeSubmission(challengeId, eventId);

  const [showFlag, setShowFlag] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [rateLimitMessage, setRateLimitMessage] = useState<string>("");

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (showResult && submissionResult?.success) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowResult(false);
          setFadeOut(false);
        }, 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showResult, submissionResult?.success, setShowResult]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setValidationError("");
    setRateLimitMessage("");

    if (isCompleted) {
      return;
    }

    // Submit flag directly
    await submitFlag(flagInput, timeSpent.toString(), hintsUsed);
    if (submissionResult?.success) {
      onSuccess?.(submissionResult.points || 0);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(flagInput);
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="w-full space-y-3">
        {/* Flag Input Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            ফ্ল্যাগ সাবমিট করুন
          </label>
          <div className="relative">
            <input
              type={showFlag ? "text" : "password"}
              value={flagInput}
              onChange={(e) => {
                setFlagInput(e.target.value);
                setValidationError(""); // Clear error on input change
              }}
              placeholder="flag{...} এ ফ্ল্যাগ লিখুন"
              disabled={isSubmitting || isCompleted}
              className={`w-full px-4 py-3 pr-24 bg-gray-900 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                validationError
                  ? "border-red-600 focus:border-red-600 focus:ring-red-600"
                  : "border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            {flagInput && (
              <div className="absolute right-3 top-3 flex gap-1">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200 transition-colors"
                  title="কপি করুন"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowFlag(!showFlag)}
                  className="p-2 hover:bg-gray-800 rounded text-gray-400 hover:text-gray-200 transition-colors"
                  title={showFlag ? "লুকান" : "দেখান"}
                >
                  {showFlag ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {validationError}
          </div>
        )}

        {/* Rate Limit Message */}
        {rateLimitMessage && (
          <div className="flex items-center gap-2 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg text-yellow-200 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {rateLimitMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            isSubmitting ||
            isCompleted ||
            !flagInput.trim() ||
            !!validationError ||
            !!rateLimitMessage
          }
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              সাবমিট হচ্ছে...
            </>
          ) : isCompleted ? (
            <>
              <Check className="w-4 h-4" />
              সমাধান সম্পন্ন
            </>
          ) : (
            "ফ্ল্যাগ সাবমিট করুন"
          )}
        </button>
      </form>

      {/* Result Message */}
      {showResult && submissionResult && (
        <div
          className={`p-4 rounded-lg border transition-all duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          } ${
            submissionResult.success
              ? "bg-green-900/30 border-green-700 text-green-200"
              : "bg-red-900/30 border-red-700 text-red-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {submissionResult.success ? (
              <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-medium">{submissionResult.message}</p>
              {submissionResult.points !== undefined &&
                submissionResult.success && (
                  <p className="text-sm mt-1 opacity-90">
                    🎉 {submissionResult.points} পয়েন্ট অর্জন করেছেন!
                  </p>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Completed Status */}
      {isCompleted && (
        <div className="p-4 rounded-lg border bg-green-900/20 border-green-700 text-green-200">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">
              আপনি এই চ্যালেঞ্জটি সফলভাবে সমাধান করেছেন ✓
            </span>
          </div>
        </div>
      )}

      {/* Hint about flag format */}
      <p className="text-xs text-gray-400">
        💡 টিপ: বেশিরভাগ ফ্ল্যাগ flag এর মধ্যে থাকে।
      </p>
    </div>
  );
}
