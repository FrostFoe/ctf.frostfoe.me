"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChallengesFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

export default function ChallengesFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
}: ChallengesFilterProps) {
  const categories = [
    "সব",
    "ওয়েব",
    "ক্রিপ্টোগ্রাফি",
    "ফরেনসিক্স",
    "রিভার্স ইঞ্জিনিয়ারিং",
    "পাওয়্যন্স",
    "মিসক",
  ];

  const difficulties = ["সব", "সহজ", "মধ্যম", "কঠিন", "অসম্ভব"];

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
        <Input
          placeholder="চ্যালেঞ্জ খুঁজুন..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 sm:pl-10 py-2 sm:py-2.5 text-sm sm:text-base bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        <div className="space-y-2 sm:space-y-2.5">
          <label className="text-xs sm:text-sm font-medium text-slate-300">
            ক্যাটাগরি
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(cat)}
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 ${
                  selectedCategory === cat
                    ? "bg-lime-400 text-slate-900 hover:bg-lime-500"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-200"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2 sm:space-y-2.5">
          <label className="text-xs sm:text-sm font-medium text-slate-300">
            অসুবিধা
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {difficulties.map((diff) => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => onDifficultyChange(diff)}
                className={`text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 ${
                  selectedDifficulty === diff
                    ? "bg-lime-400 text-slate-900 hover:bg-lime-500"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-200"
                }`}
              >
                {diff}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
