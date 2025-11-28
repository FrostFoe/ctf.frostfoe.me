"use client";

import { useState, useMemo } from "react";
import ChallengesFilter from "@/components/ctf/challenges-filter";
import ChallengesGrid from "@/components/ctf/challenges-grid";
import data from "@/lib/db.json";

export default function ChallengesTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("সব");
  const [selectedDifficulty, setSelectedDifficulty] = useState("সব");

  // Get all challenges from data
  const allChallenges = useMemo(() => {
    return data.challenges || [];
  }, []);

  const filteredChallenges = useMemo(() => {
    return allChallenges.filter((challenge) => {
      const matchesSearch = challenge.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "সব" || challenge.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "সব" ||
        challenge.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [allChallenges, searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">চ্যালেঞ্জেস</h2>
        <p className="text-slate-400">
          সিকিউরিটি চ্যালেঞ্জ এবং হ্যাকিং প্রতিযোগিতায় অংশগ্রহণ করুন
        </p>
      </div>

      <ChallengesFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
      />

      <ChallengesGrid challenges={filteredChallenges} />
    </div>
  );
}
