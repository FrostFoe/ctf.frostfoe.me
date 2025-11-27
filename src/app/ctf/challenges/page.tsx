"use client";

import { useState, useMemo } from "react";
import ChallengesHeader from "@/components/ctf/challenges-header";
import ChallengesFilter from "@/components/ctf/challenges-filter";
import ChallengesGrid from "@/components/ctf/challenges-grid";
import CtfHeader from "@/components/ctf/ctf-header";
import CtfMainNav from "@/components/ctf/ctf-main-nav";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import data from "@/lib/data.json";

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("সব");
  const [selectedDifficulty, setSelectedDifficulty] = useState("সব");

  // Get all challenges from data
  const allChallenges = useMemo(() => {
    return data.challenges || [];
  }, []);

  // Filter challenges based on search and filters
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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <CtfHeader />

      <div className="container-centered">
        <Breadcrumb
          items={[
            { label: "হোম", href: "/" },
            { label: "সিটিএফ ইভেন্টস", href: "/ctf" },
            { label: "চ্যালেঞ্জেস" },
          ]}
        />

        <div className="mt-6 sm:mt-8">
          <CtfMainNav />
        </div>

        <div className="py-8 sm:py-12 space-y-8">
          <ChallengesHeader />

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
      </div>
    </div>
  );
}
