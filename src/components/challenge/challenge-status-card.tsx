/**
 * Challenge Status Card Component
 * Displays challenge completion status and statistics
 */

"use client";

import { Check, Clock, Zap, Trophy } from "lucide-react";
import { useChallengeSubmission } from "@/hooks/use-challenge-submission";
import { formatTimestampBn } from "@/lib/ctf-utils";

interface ChallengeStatusCardProps {
  challengeId: number;
  basePoints?: number;
}

export function ChallengeStatusCard({
  challengeId,
  basePoints = 100,
}: ChallengeStatusCardProps) {
  const { isCompleted, stats } = useChallengeSubmission(challengeId, 1);

  if (!isCompleted || !stats) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Completion Status */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-green-900/10 border border-green-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
            <Check className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-green-200">সফলভাবে সমাধান</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* Points Earned */}
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <div>
              <p className="text-gray-400 text-xs">পয়েন্ট</p>
              <p className="font-bold text-white">{stats.pointsEarned || basePoints}</p>
            </div>
          </div>

          {/* Time Spent */}
          {stats.timeSpent && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-gray-400 text-xs">সময়</p>
                <p className="font-bold text-white">{stats.timeSpent} মিনিট</p>
              </div>
            </div>
          )}

          {/* Hints Used */}
          {stats.hintsUsed !== undefined && (
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-gray-400 text-xs">হিন্ট ব্যবহৃত</p>
                <p className="font-bold text-white">{stats.hintsUsed}</p>
              </div>
            </div>
          )}

          {/* Completion Date */}
          {stats.completionDate && (
            <div>
              <p className="text-gray-400 text-xs">সম্পন্ন</p>
              <p className="font-bold text-white text-sm">
                {formatTimestampBn(stats.completionDate)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Points Breakdown */}
      {stats.hintsUsed !== undefined && (
        <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
          <p className="text-xs font-medium text-gray-400 mb-2">পয়েন্ট বিশ্লেষণ</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>ভিত্তি পয়েন্ট:</span>
              <span className="text-white">+ {basePoints}</span>
            </div>
            {stats.hintsUsed > 0 && (
              <div className="flex justify-between text-red-300">
                <span>হিন্ট পেনাল্টি:</span>
                <span className="text-red-400">- {stats.hintsUsed * 10}</span>
              </div>
            )}
            {stats.timeSpent && stats.timeSpent < 30 && (
              <div className="flex justify-between text-green-300">
                <span>দ্রুত সমাধান বোনাস:</span>
                <span className="text-green-400">+ 5</span>
              </div>
            )}
            <div className="border-t border-gray-700 pt-1 mt-1 flex justify-between font-semibold text-gray-100">
              <span>মোট:</span>
              <span className="text-yellow-300">{stats.pointsEarned || basePoints}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
