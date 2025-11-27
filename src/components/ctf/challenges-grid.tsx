"use client";

import ChallengeCard from "./challenge-card";

interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  points: number;
  solves?: number;
}

interface ChallengesGridProps {
  challenges: Challenge[];
}

export default function ChallengesGrid({ challenges }: ChallengesGridProps) {
  if (challenges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-10 md:py-12 text-center px-4 ">
        <svg
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-slate-600 mb-3 sm:mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-base sm:text-lg md:text-lg font-semibold text-slate-300 mb-1 sm:mb-2">
          কোন চ্যালেঞ্জ খুঁজে পাওয়া যায়নি
        </h3>
        <p className="text-xs sm:text-sm text-slate-500">
          আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full ">
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} {...challenge} solves={challenge.solves || 0} />
      ))}
    </div>
  );
}
