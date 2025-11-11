"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Flag } from "lucide-react";
import Link from "next/link";

interface ChallengeCardProps {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  points: number;
  solves: number;
  difficulty_color: string;
  category_color: string;
}

export default function ChallengeCard({
  id,
  title,
  category,
  difficulty,
  description,
  points,
  solves,
  difficulty_color,
  category_color,
}: ChallengeCardProps) {
  const getDifficultyBg = (diff: string) => {
    switch (diff) {
      case "সহজ":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "মধ্যম":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "কঠিন":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "অসম্ভব":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getCategoryBg = (cat: string) => {
    switch (cat) {
      case "ওয়েব":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "ক্রিপ্টোগ্রাফি":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "ফরেনসিক্স":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "রিভার্স ইঞ্জিনিয়ারিং":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      case "পাওয়্যন্স":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-linear-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-lime-400/50 transition-all duration-300 h-full flex flex-col">
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-lime-400/0 to-lime-400/0 group-hover:from-lime-400/5 group-hover:to-lime-400/10 transition-all duration-300" />

      <div className="relative p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400 shrink-0 mt-0.5" />
            <div className="text-right text-sm sm:text-base md:text-lg font-bold text-lime-400 whitespace-nowrap">
              {points} pts
            </div>
          </div>

          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-lime-400 transition-colors line-clamp-2 wrap-break-word">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 wrap-break-word">{description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <Badge
            variant="outline"
            className={`border text-xs sm:text-sm ${getCategoryBg(category)}`}
          >
            {category}
          </Badge>
          <Badge
            variant="outline"
            className={`border text-xs sm:text-sm ${getDifficultyBg(difficulty)}`}
          >
            {difficulty}
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400 pt-2 mt-auto border-t border-slate-700">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 shrink-0" />
            <span className="truncate">{solves} সমাধান</span>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 shrink-0" />
            <span className="truncate">{Math.round(100 / solves)}%</span>
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/ctf/challenge/${id}`} className="mt-3 sm:mt-4">
          <Button className="w-full bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold transition-all group-hover:shadow-lg group-hover:shadow-lime-400/20 text-xs sm:text-sm py-1.5 sm:py-2">
            সমাধান করুন
          </Button>
        </Link>
      </div>
    </Card>
  );
}
