"use client";

import ChallengeCard from "./challenge-card";

interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  points: number;
  solves: number;
}

interface ChallengesGridProps {
  challenges: Challenge[];
}

export default function ChallengesGrid({ challenges }: ChallengesGridProps) {
  if (challenges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg
          className="w-16 h-16 text-slate-600 mb-4"
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
        <h3 className="text-lg font-semibold text-slate-300 mb-2">
          কোন চ্যালেঞ্জ খুঁজে পাওয়া যায়নি
        </h3>
        <p className="text-slate-500">
          আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          {...challenge}
          difficulty_color=""
          category_color=""
        />
      ))}
    </div>
  );
}
