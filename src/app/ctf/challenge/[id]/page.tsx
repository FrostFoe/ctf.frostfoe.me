"use client";

import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Download,
  Heart,
  Share2,
  ArrowRight,
  BookOpen,
  Clock,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlagSubmissionForm } from "@/components/challenge/flag-submission-form";
import { ChallengeResources } from "@/components/challenge/challenge-resources";
import { ChallengeStatusCard } from "@/components/challenge/challenge-status-card";
import { ctfData } from "@/lib/ctf-data-loader";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ChallengeDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const challenge = ctfData.challenges.find((c) => c.id === parseInt(id));

  if (!challenge) {
    notFound();
  }

  // Real-time localStorage listener
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ctf_completed_challenges" && e.newValue) {
        try {
          const completedIds = JSON.parse(e.newValue);
          setIsCompleted(completedIds.includes(parseInt(id)));
        } catch (err) {
          console.error("Failed to parse completed challenges:", err);
        }
      }
    };

    // Check initial status
    const storedCompleted = localStorage.getItem("ctf_completed_challenges");
    if (storedCompleted) {
      try {
        const completedIds = JSON.parse(storedCompleted);
        setIsCompleted(completedIds.includes(parseInt(id)));
      } catch (err) {
        console.error("Failed to parse completed challenges:", err);
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [id]);

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  // Handle hint reveal
  const revealHint = (hintIndex: number) => {
    if (!revealedHints.includes(hintIndex)) {
      setRevealedHints([...revealedHints, hintIndex]);
      setHintsUsed(revealedHints.length + 1);
    }
  };

  // Find parent event/series info
  const parentEvent = ctfData.events.find((e) => {
    if (challenge.seriesId) {
      return e.slug === challenge.seriesId.replace("-series", "");
    }
    return e.id === challenge.eventId;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "সহজ":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "মধ্যম":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "মাঝারি":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "কঠিন":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "মাঝারি থেকে কঠিন":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "অসম্ভব":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
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
      case "ওয়েব নিরাপত্তা":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "অ্যাক্সেস কন্ট্রোল":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getDifficultyWidth = (difficulty: string) => {
    switch (difficulty) {
      case "সহজ":
        return "25%";
      case "মধ্যম":
        return "50%";
      case "মাঝারি":
        return "50%";
      case "কঠিন":
        return "75%";
      case "মাঝারি থেকে কঠিন":
        return "75%";
      case "অসম্ভব":
        return "100%";
      default:
        return "50%";
    }
  };

  const isSeries = !!challenge.seriesId && challenge.seriesId !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container-centered py-3 sm:py-4">
          <Link
            href={
              isSeries && parentEvent
                ? `/ctf/${parentEvent.slug}`
                : "/ctf/challenges"
            }
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>
              {isSeries && parentEvent
                ? `${parentEvent.title} এ ফিরুন`
                : "চ্যালেঞ্জে ফিরুন"}
            </span>
          </Link>
        </div>
      </header>

      {/* Series Context Banner */}
      {isSeries && parentEvent && (
        <div className="border-b border-slate-800 bg-blue-900/20 border-blue-800/50">
          <div className="container-centered py-2 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-bold px-2 py-1 rounded bg-blue-900/50 text-blue-300">
                  সিরিজের অংশ
                </span>
                <span className="text-xs sm:text-sm text-blue-300">
                  {parentEvent.title} - চ্যালেঞ্জ #{challenge.seriesOrder}
                </span>
              </div>
              <p className="text-xs text-blue-400/70">
                অসুবিধা: {parentEvent.difficulty} • দক্ষতা: {parentEvent.skillLevel}
              </p>
            </div>
            <Link
              href={`/ctf/${parentEvent.slug}`}
              className="text-blue-400 hover:text-blue-300 w-fit"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Single Event Context Banner */}
      {!isSeries && parentEvent && (
        <div className="border-b border-slate-800 bg-purple-900/20 border-purple-800/50">
          <div className="container-centered py-2 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-bold px-2 py-1 rounded bg-purple-900/50 text-purple-300">
                  {parentEvent.ctfType === "series" ? "সিরিজ ইভেন্ট" : "একক চ্যালেঞ্জ"}
                </span>
                <span className="text-xs sm:text-sm text-purple-300">
                  {parentEvent.title}
                </span>
              </div>
              <p className="text-xs text-purple-400/70">
                ফর্ম্যাট: {parentEvent.format} • দল সাইজ: {parentEvent.teamSize}
              </p>
            </div>
            <Link
              href={`/ctf/${parentEvent.slug}`}
              className="text-purple-400 hover:text-purple-300 w-fit"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container-centered py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Title Section */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                    {challenge.title}
                  </h1>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <Badge
                      variant="outline"
                      className={`border text-xs sm:text-sm ${getCategoryColor(challenge.category)}`}
                    >
                      {challenge.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`border text-xs sm:text-sm ${getDifficultyColor(challenge.difficulty)}`}
                    >
                      {challenge.difficulty}
                    </Badge>
                    {isSeries && (
                      <Badge className="bg-blue-900/40 text-blue-300 border border-blue-800 text-xs sm:text-sm">
                        সিরিজ চ্যালেঞ্জ
                      </Badge>
                    )}
                  </div>
                  {challenge.author && (
                    <p className="text-xs sm:text-sm text-slate-400">
                      লেখক:{" "}
                      <span className="text-slate-300 font-medium">
                        {challenge.author}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
                  চ্যালেঞ্জ বর্ণনা
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            </div>

            {/* Hints Section */}
            {challenge.hints && challenge.hints.length > 0 && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  ইঙ্গিত ({revealedHints.length}/{challenge.hints.length})
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {challenge.hints.map((hint, index) => (
                    <div key={index} className="space-y-2">
                      {revealedHints.includes(index) ? (
                        <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <span className="text-green-400 font-bold text-xs flex-shrink-0 bg-green-900/30 px-2 py-1 rounded">
                            {index + 1} ✓
                          </span>
                          <p className="text-green-100 text-xs sm:text-sm">
                            {hint}
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => revealHint(index)}
                          className="w-full flex items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg hover:border-amber-500/40 hover:bg-amber-500/10 transition-all text-left group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400 font-bold text-xs flex-shrink-0 bg-amber-900/30 px-2 py-1 rounded group-hover:bg-amber-900/50">
                              {index + 1}
                            </span>
                            <span className="text-amber-300/70 text-xs sm:text-sm">
                              এই ইঙ্গিত প্রকাশ করুন
                            </span>
                          </div>
                          <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3 sm:mt-4">
                  📝 প্রতিটি ইঙ্গিত ব্যবহার প্রাপ্ত পয়েন্ট কমায়
                </p>
              </div>
            )}

            {/* Tags Section */}
            {challenge.tags && challenge.tags.length > 0 && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  দক্ষতা ট্যাগ
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs rounded-full bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-slate-500 hover:bg-slate-700 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Challenge Scenario */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                চ্যালেঞ্জ পরিস্থিতি
              </h2>
              <div className="space-y-3 sm:space-y-4 text-slate-300 text-sm sm:text-base">
                <p>এই চ্যালেঞ্জে আপনাকে নিম্নোক্ত কাজগুলি সম্পূর্ণ করতে হবে:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>প্রথম ফ্ল্যাগ খুঁজে বের করুন</li>
                  <li>সিস্টেমের দুর্বলতা চিহ্নিত করুন</li>
                  <li>শেষ পর্যায়ের ফ্ল্যাগ অর্জন করুন</li>
                </ul>
                <p className="pt-2 sm:pt-4">
                  সতর্কতা: এই চ্যালেঞ্জটি আপনার সমস্ত প্রযুক্তিগত দক্ষতা পরীক্ষা
                  করবে।
                </p>
              </div>
            </div>

            {/* Event Rules Card */}
            {parentEvent && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                  ইভেন্ট নিয়ম ও তথ্য
                </h2>
                <div className="space-y-4">
                  <div className="p-3 sm:p-4 bg-slate-700/20 rounded-lg border border-slate-700">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                      সাধারণ নিয়ম
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {parentEvent.rules}
                    </p>
                  </div>
                  {parentEvent.prizes && parentEvent.prizes.length > 0 && (
                    <div className="p-3 sm:p-4 bg-slate-700/20 rounded-lg border border-slate-700">
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                        পুরস্কার
                      </p>
                      <ul className="space-y-1">
                        {parentEvent.prizes.map((prize, idx) => (
                          <li key={idx} className="text-slate-300 text-xs sm:text-sm flex items-center gap-2">
                            <span className="text-amber-400">★</span> {prize}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 bg-slate-700/20 rounded-lg border border-slate-700">
                      <p className="text-slate-400 text-xs font-semibold uppercase mb-1">
                        ফর্ম্যাট
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {parentEvent.format}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-700/20 rounded-lg border border-slate-700">
                      <p className="text-slate-400 text-xs font-semibold uppercase mb-1">
                        টিম সাইজ
                      </p>
                      <p className="text-white font-semibold text-sm">
                        {parentEvent.teamSize}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resources */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                সম্পদ
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-700/20 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-lime-400/20 rounded flex items-center justify-center shrink-0">
                      <span className="text-lime-400 text-xs sm:text-sm font-bold">
                        📁
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs sm:text-sm">
                        {challenge.title}.zip
                      </p>
                      <p className="text-slate-400 text-xs">কিছু MB</p>
                    </div>
                  </div>
                  <Button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    ডাউনলোড
                  </Button>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                কাজ
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-4 p-3 sm:p-4 bg-slate-700/20 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-lime-400/20 border border-lime-400/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lime-400 text-xs font-bold">1</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                      প্রথম ফ্ল্যাগ খুঁজে বের করুন
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      সিস্টেমের মধ্যে প্রথম পর্যায়ের ফ্ল্যাগটি অন্বেষণ করুন এবং
                      খুঁজে বের করুন।
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-700 text-xs whitespace-nowrap"
                  >
                    ইঙ্গিত
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Timer Card */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 sm:p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
                  সময় ব্যয়
                </p>
              </div>
              <p className="text-3xl font-bold text-blue-300 font-mono">
                {formatTime(timeSpent)}
              </p>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="w-full px-3 py-2 text-sm font-medium bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {isTimerRunning ? "⏸ পজ করুন" : "▶ চালু করুন"}
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Points */}
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                  পয়েন্ট
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-lime-400">
                  {challenge.points}
                </p>
              </div>

              {/* Solves */}
              <div className="border-t border-slate-700 pt-3 sm:pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                  সমাধান সংখ্যা
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {challenge.solves}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  খেলোয়াড় এটি সমাধান করেছেন
                </p>
              </div>

              {/* Success Rate */}
              <div className="border-t border-slate-700 pt-3 sm:pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                  সাফল্যের হার
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {challenge.successRate}
                </p>
              </div>

              {/* Difficulty Stats */}
              <div className="border-t border-slate-700 pt-3 sm:pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2 sm:mb-3">
                  অসুবিধা
                </p>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-lime-400 to-lime-500 h-2 rounded-full transition-all"
                    style={{ width: getDifficultyWidth(challenge.difficulty) }}
                  />
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  {challenge.difficulty}
                </p>
              </div>

              {/* Category */}
              <div className="border-t border-slate-700 pt-3 sm:pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                  ক্যাটাগরি
                </p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  {challenge.category}
                </p>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-700 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                <Button className="w-full bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-sm sm:text-base py-2 sm:py-2.5">
                  চ্যালেঞ্জ শুরু করুন
                </Button>
                <div className="flex gap-1.5 sm:gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-1 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 h-9 sm:h-10"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-1 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 h-9 sm:h-10"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Flag Submission Card */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white">
                ফ্ল্যাগ সাবমিশন
              </h3>
              <FlagSubmissionForm
                challengeId={challenge.id}
                eventId={parentEvent?.id || 1}
                timeSpent={Math.floor(timeSpent / 60)}
                hintsUsed={hintsUsed}
              />
            </div>

            {/* Challenge Status Card */}
            <ChallengeStatusCard
              challengeId={challenge.id}
              basePoints={challenge.points || 100}
            />

            {/* Challenge Resources */}
            {challenge.resources && challenge.resources.length > 0 && (
              <ChallengeResources
                challengeId={challenge.id}
                resources={challenge.resources}
              />
            )}

            {/* Requirements Card */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
              <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">
                প্রয়োজনীয়তা
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-lime-400 rounded-full flex-shrink-0"></span>
                  {challenge.category} পরিচিতি
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-lime-400 rounded-full flex-shrink-0"></span>
                  বিশ্লেষণমূলক চিন্তাভাবনা
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-lime-400 rounded-full flex-shrink-0"></span>
                  সমস্যা সমাধানের দক্ষতা
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4">আরও তথ্য</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">তৈরি</span>
                  <span className="text-white font-semibold">
                    {challenge.createdAt}
                  </span>
                </div>
                {challenge.author && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">লেখক</span>
                    <span className="text-white font-semibold">
                      {challenge.author}
                    </span>
                  </div>
                )}
                {isSeries && challenge.seriesOrder && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">সিরিজ ক্রম</span>
                    <span className="text-white font-semibold">
                      #{challenge.seriesOrder}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
