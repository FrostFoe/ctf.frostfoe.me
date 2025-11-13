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
    <div className="space-y-4 md:ml-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
        <Input
          placeholder="চ্যালেঞ্জ খুঁজুন..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">ক্যাটাগরি</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(cat)}
                className={`${
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">অসুবিধা</label>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((diff) => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => onDifficultyChange(diff)}
                className={`${
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
