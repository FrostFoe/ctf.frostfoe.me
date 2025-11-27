"use client";

import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";

interface Challenge {
  id: number;
  seriesOrder?: number | null;
  title: string;
  difficulty: string;
  points: number;
  isCompleted?: boolean;
}

interface CtfSeriesChallengesProps {
  challenges: Challenge[];
  totalChallenges: number;
  completedChallenges: number;
}

export default function CtfSeriesChallenges({
  challenges,
  totalChallenges,
  completedChallenges,
}: CtfSeriesChallengesProps) {
  const difficultyColors: Record<string, string> = {
    সহজ: "bg-green-900/20 text-green-300 border border-green-800",
    মাঝারি: "bg-yellow-900/20 text-yellow-300 border border-yellow-800",
    "মাঝারি থেকে কঠিন":
      "bg-orange-900/20 text-orange-300 border border-orange-800",
    কঠিন: "bg-red-900/20 text-red-300 border border-red-800",
  };

  const getProgressPercentage = () => {
    return totalChallenges > 0
      ? (completedChallenges / totalChallenges) * 100
      : 0;
  };

  const filteredChallenges = challenges.filter((c) => c.seriesOrder);
  const sortedChallenges = filteredChallenges.sort(
    (a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0),
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-bold text-white">
            সিরিজ অগ্রগতি
          </h3>
          <span className="text-xs sm:text-sm text-slate-400 whitespace-nowrap">
            {completedChallenges} / {totalChallenges}
          </span>
        </div>

        <div className="w-full bg-slate-700 rounded-full h-2.5 sm:h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-lime-400 to-lime-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        <p className="text-xs text-slate-400">
          {Math.round(getProgressPercentage())}% সম্পন্ন
        </p>
      </div>

      {/* Challenges List */}
      <div className="space-y-2 sm:space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-white">
          চ্যালেঞ্জ সমূহ
        </h3>

        {sortedChallenges.length === 0 ? (
          <p className="text-slate-400 text-xs sm:text-sm">
            কোন চ্যালেঞ্জ পাওয়া যায়নি
          </p>
        ) : (
          <div className="space-y-1.5 sm:space-y-2">
            {sortedChallenges.map((challenge) => (
              <Link key={challenge.id} href={`/ctf/challenge/${challenge.id}`}>
                <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all group cursor-pointer">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                    {challenge.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400" />
                    ) : (
                      <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 group-hover:text-slate-400" />
                    )}
                  </div>

                  {/* Challenge Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                      <span className="text-xs text-slate-400 font-mono bg-slate-900 px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
                        #{challenge.seriesOrder}
                      </span>
                      <h4 className="font-semibold text-white group-hover:text-lime-400 transition-colors truncate text-sm sm:text-base">
                        {challenge.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span
                        className={`inline-block text-xs px-1.5 sm:px-2 py-0.5 rounded ${
                          difficultyColors[challenge.difficulty] ||
                          "bg-slate-900 text-slate-300 border border-slate-700"
                        }`}
                      >
                        {challenge.difficulty}
                      </span>
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {challenge.points} পয়েন্ট
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    {challenge.isCompleted ? (
                      <span className="text-xs font-bold text-lime-400 bg-lime-400/10 px-1.5 sm:px-2 py-1 rounded border border-lime-800 whitespace-nowrap">
                        সমাধান করা
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400 bg-slate-900 px-1.5 sm:px-2 py-1 rounded border border-slate-700 whitespace-nowrap">
                        অমীমাংসিত
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Series Completion Info */}
      {completedChallenges === totalChallenges && totalChallenges > 0 && (
        <div className="p-3 sm:p-4 bg-lime-900/20 border border-lime-800 rounded-lg">
          <p className="text-lime-300 text-xs sm:text-sm font-semibold">
            ✨ অভিনন্দন! আপনি এই সিরিজ সম্পন্ন করেছেন।
          </p>
        </div>
      )}
    </div>
  );
}
