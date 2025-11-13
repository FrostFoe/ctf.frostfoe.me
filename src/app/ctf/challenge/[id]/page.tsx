"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Download, Heart, Share2, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ctfData from "@/data/ctf-data.json";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ChallengeDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const challenge = ctfData.challenges.find((c) => c.id === parseInt(id));

  if (!challenge) {
    notFound();
  }

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
        <div className="container-centered py-4">
          <Link
            href={isSeries && parentEvent ? `/ctf/${parentEvent.slug}` : "/ctf/challenges"}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">
              {isSeries && parentEvent ? `${parentEvent.title} এ ফিরুন` : "চ্যালেঞ্জে ফিরুন"}
            </span>
          </Link>
        </div>
      </header>

      {/* Series Context Banner */}
      {isSeries && parentEvent && (
        <div className="border-b border-slate-800 bg-blue-900/20 border-blue-800/50">
          <div className="container-centered py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-1 rounded bg-blue-900/50 text-blue-300">
                সিরিজের অংশ
              </span>
              <span className="text-sm text-blue-300">
                {parentEvent.title} - চ্যালেঞ্জ #{challenge.seriesOrder}
              </span>
            </div>
            <Link href={`/ctf/${parentEvent.slug}`} className="text-blue-400 hover:text-blue-300">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container-centered py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    {challenge.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="outline"
                      className={`border ${getCategoryColor(challenge.category)}`}
                    >
                      {challenge.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`border ${getDifficultyColor(challenge.difficulty)}`}
                    >
                      {challenge.difficulty}
                    </Badge>
                    {isSeries && (
                      <Badge className="bg-blue-900/40 text-blue-300 border border-blue-800">
                        সিরিজ চ্যালেঞ্জ
                      </Badge>
                    )}
                  </div>
                  {challenge.author && (
                    <p className="text-sm text-slate-400">
                      লেখক: <span className="text-slate-300 font-medium">{challenge.author}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2 className="text-lg font-bold text-white mb-3">চ্যালেঞ্জ বর্ণনা</h2>
                <p className="text-slate-300 leading-relaxed">{challenge.description}</p>
              </div>
            </div>

            {/* Hints Section */}
            {challenge.hints && challenge.hints.length > 0 && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-amber-400">💡</span>
                  ইঙ্গিত
                </h2>
                <div className="space-y-3">
                  {challenge.hints.map((hint, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg hover:border-amber-500/40 transition-colors"
                    >
                      <span className="text-amber-400 font-bold text-sm flex-shrink-0 bg-amber-900/30 px-2 py-1 rounded">
                        {index + 1}
                      </span>
                      <p className="text-amber-100 text-sm">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Section */}
            {challenge.tags && challenge.tags.length > 0 && (
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  দক্ষতা ট্যাগ
                </h3>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs rounded-full bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-slate-500 hover:bg-slate-700 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Challenge Scenario */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h2 className="text-lg font-bold text-white mb-4">চ্যালেঞ্জ পরিস্থিতি</h2>
              <div className="space-y-4 text-slate-300">
                <p>এই চ্যালেঞ্জে আপনাকে নিম্নোক্ত কাজগুলি সম্পূর্ণ করতে হবে:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>প্রথম ফ্ল্যাগ খুঁজে বের করুন</li>
                  <li>সিস্টেমের দুর্বলতা চিহ্নিত করুন</li>
                  <li>শেষ পর্যায়ের ফ্ল্যাগ অর্জন করুন</li>
                </ul>
                <p className="pt-4">
                  সতর্কতা: এই চ্যালেঞ্জটি আপনার সমস্ত প্রযুক্তিগত দক্ষতা পরীক্ষা করবে।
                </p>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h2 className="text-lg font-bold text-white mb-4">সম্পদ</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lime-400/20 rounded flex items-center justify-center">
                      <span className="text-lime-400 text-sm font-bold">📁</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{challenge.title}.zip</p>
                      <p className="text-slate-400 text-sm">কিছু MB</p>
                    </div>
                  </div>
                  <Button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold">
                    <Download className="w-4 h-4 mr-2" />
                    ডাউনলোড
                  </Button>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h2 className="text-lg font-bold text-white mb-4">কাজ</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-slate-700/20 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-lime-400/20 border border-lime-400/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lime-400 text-xs font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">প্রথম ফ্ল্যাগ খুঁজে বের করুন</h3>
                    <p className="text-slate-400 text-sm">
                      সিস্টেমের মধ্যে প্রথম পর্যায়ের ফ্ল্যাগটি অন্বেষণ করুন এবং খুঁজে বের করুন।
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-700">
                    ইঙ্গিত
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Info Card */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 space-y-6">
              {/* Points */}
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  পয়েন্ট
                </p>
                <p className="text-4xl font-bold text-lime-400">{challenge.points}</p>
              </div>

              {/* Solves */}
              <div className="border-t border-slate-700 pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  সমাধান সংখ্যা
                </p>
                <p className="text-2xl font-bold text-white">{challenge.solves}</p>
                <p className="text-slate-400 text-sm mt-1">খেলোয়াড় এটি সমাধান করেছেন</p>
              </div>

              {/* Success Rate */}
              <div className="border-t border-slate-700 pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  সাফল্যের হার
                </p>
                <p className="text-xl font-bold text-white">{challenge.successRate}</p>
              </div>

              {/* Difficulty Stats */}
              <div className="border-t border-slate-700 pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3">
                  অসুবিধা
                </p>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-lime-400 to-lime-500 h-2 rounded-full transition-all"
                    style={{ width: getDifficultyWidth(challenge.difficulty) }}
                  />
                </div>
                <p className="text-slate-300 text-sm mt-2">{challenge.difficulty}</p>
              </div>

              {/* Category */}
              <div className="border-t border-slate-700 pt-4">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  ক্যাটাগরি
                </p>
                <p className="text-white font-semibold">{challenge.category}</p>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-700 pt-4 space-y-3">
                <Button className="w-full bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold">
                  চ্যালেঞ্জ শুরু করুন
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-1 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex-1 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Flag Submission Card */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">ফ্ল্যাগ সাবমিশন</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="flag{your_answer_here}"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-lime-400 focus:outline-none transition-colors text-sm"
                />
                <Button className="w-full bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold">
                  সাবমিট করুন
                </Button>
              </div>
              <p className="text-xs text-slate-400 text-center">সঠিক ফ্ল্যাগ জমা দিয়ে পয়েন্ট অর্জন করুন</p>
            </div>

            {/* Requirements Card */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4">প্রয়োজনীয়তা</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full"></span>
                  {challenge.category} পরিচিতি
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full"></span>
                  বিশ্লেষণমূলক চিন্তাভাবনা
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full"></span>
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
                  <span className="text-white font-semibold">{challenge.createdAt}</span>
                </div>
                {challenge.author && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">লেখক</span>
                    <span className="text-white font-semibold">{challenge.author}</span>
                  </div>
                )}
                {isSeries && challenge.seriesOrder && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">সিরিজ ক্রম</span>
                    <span className="text-white font-semibold">#{challenge.seriesOrder}</span>
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