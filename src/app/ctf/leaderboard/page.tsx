"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trophy, TrendingUp, Medal, Star, User } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import CtfHeader from "@/components/ctf/ctf-header";
import CtfMainNav from "@/components/ctf/ctf-main-nav";
import data from "@/lib/db.json";

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  solved: number;
  country?: string;
  badge?: string;
  avatar?: string;
  timeSpent?: number;
}

interface CompletedChallenge {
  eventId: number;
  challengeId: number;
  pointsEarned: number;
  timeSpent: number;
  solvedAt: string;
  hintsUsed: number;
}

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<"points" | "solved">("points");
  const [selectedEvent, setSelectedEvent] = useState<number>(1);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    [],
  );

  // Load leaderboard strictly from `db.json`.
  // Preference order:
  // 1. `data.leaderboard` (explicit leaderboard entries)
  // 2. compute from `data.completed_challenges` grouped by user fields
  // 3. otherwise set an empty leaderboard
  useEffect(() => {
    try {
      // 1) Use explicit leaderboard if provided
      if (Array.isArray((data as any).leaderboard) && (data as any).leaderboard.length > 0) {
        const fromDb: LeaderboardEntry[] = (data as any).leaderboard.map((e: any, idx: number) => ({
          rank: e.rank ?? idx + 1,
          name: e.name ?? e.username ?? `Player ${idx + 1}`,
          points: e.points ?? e.totalPoints ?? 0,
          solved: e.solved ?? e.challenges ?? 0,
          country: e.country ?? "—",
          badge: e.badge,
          avatar: e.avatar ?? e.imageUrl ?? "",
        }));
        setLeaderboardData(fromDb);
        return;
      }

      // 2) Compute from completed_challenges in db.json
      const completed: any[] = Array.isArray((data as any).completed_challenges)
        ? (data as any).completed_challenges
        : [];

      const eventCompleted = completed.filter((c: any) => (c.eventId ?? c.event_id) === selectedEvent);

      if (eventCompleted.length === 0) {
        setLeaderboardData([]);
        return;
      }

      // Group by user identifier if present (userId / username), otherwise by a generated key
      const groups = new Map<string, any[]>();
      eventCompleted.forEach((c: any, idx: number) => {
        const userKey = c.userId ?? c.user_id ?? c.username ?? (`user_${idx}`);
        if (!groups.has(userKey)) groups.set(userKey, []);
        groups.get(userKey)!.push(c);
      });

      const computed: LeaderboardEntry[] = [];
      groups.forEach((arr, key) => {
        const totalPoints = arr.reduce((s: number, x: any) => s + (x.pointsEarned ?? x.points ?? 0), 0);
        const totalSolved = arr.length;
        const avatar = arr[0]?.avatar ?? arr[0]?.avatarUrl ?? arr[0]?.imageUrl ?? "";
        computed.push({
          rank: 0,
          name: key,
          points: totalPoints,
          solved: totalSolved,
          country: arr[0]?.country ?? "—",
          avatar,
        });
      });

      // Sort by points desc and assign ranks
      const sorted = computed.sort((a, b) => b.points - a.points).map((e, i) => ({ ...e, rank: i + 1 }));
      setLeaderboardData(sorted);
    } catch (error) {
      console.error("Error loading leaderboard data from db.json:", error);
      setLeaderboardData([]);
    }
  }, [selectedEvent]);

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (sortBy === "points") {
      return b.points - a.points;
    } else {
      return b.solved - a.solved;
    }
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <CtfHeader />

      <div className="container-centered">
        <Breadcrumb
          items={[
            { label: "হোম", href: "/" },
            { label: "সিটিএফ ইভেন্টস", href: "/ctf" },
            { label: "লিডারবোর্ড" },
          ]}
        />

        <div className="mt-6 sm:mt-8">
          <CtfMainNav />
        </div>

        {/* Header Section */}
        <div className="py-8 sm:py-12 ">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-lime-400/20 border border-lime-400/30 rounded-lg">
              <Trophy className="w-8 h-8 text-lime-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                লিডারবোর্ড
              </h1>
              <p className="text-slate-400 mt-2">
                শীর্ষ পারফর্মারদের সাথে প্রতিযোগিতা করুন
              </p>
            </div>
          </div>

          {/* Event Selector */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-slate-400 text-sm font-semibold mb-2">
                ইভেন্ট নির্বাচন করুন
              </label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:border-slate-600 focus:outline-none focus:border-lime-400"
              >
                {/* Events will be loaded from Supabase via useEffect */}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mb-8 ">
            <button
              onClick={() => setSortBy("points")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "points"
                  ? "bg-lime-400 text-slate-900"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              পয়েন্ট দ্বারা
            </button>
            <button
              onClick={() => setSortBy("solved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "solved"
                  ? "bg-lime-400 text-slate-900"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Medal className="w-4 h-4 inline mr-2" />
              সমাধান দ্বারা
            </button>
          </div>

          {/* Leaderboard Content */}
          <div>
            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4">
              {sortedData.map((entry, index) => (
                <div
                  key={entry.rank}
                  className={`bg-slate-800/30 border border-slate-700 rounded-lg p-4 ${
                    index < 3 ? "bg-slate-800/50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-lime-400 to-lime-600 flex items-center justify-center text-slate-900 font-bold text-sm">
                        {entry.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{entry.name}</p>
                        <p className="text-sm text-slate-400">
                          {entry.country ?? "—"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-bold text-lg ${
                          index < 3 ? "text-lime-400" : "text-white"
                        }`}
                      >
                        {entry.points.toLocaleString()} pts
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      {entry.badge ? (
                        <span className="text-2xl">{entry.badge}</span>
                      ) : (
                        <span className="text-lime-400 font-bold">
                          #{entry.rank}
                        </span>
                      )}
                    </div>
                    <span className="bg-slate-700/50 px-3 py-1 rounded-full text-slate-200">
                      {entry.solved} সমাধান
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-900/50">
                      <th className="px-4 sm:px-6 py-4 text-left font-bold text-slate-300">
                        র‍্যাঙ্ক
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left font-bold text-slate-300">
                        খেলোয়াড়
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left font-bold text-slate-300">
                        দেশ
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-right font-bold text-slate-300">
                        পয়েন্ট
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-right font-bold text-slate-300">
                        সমাধান
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((entry, index) => (
                      <tr
                        key={entry.rank}
                        className={`border-b border-slate-700/50 transition-colors hover:bg-slate-700/30 ${
                          index < 3 ? "bg-slate-800/20" : ""
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-2">
                            {entry.badge ? (
                              <span className="text-xl">{entry.badge}</span>
                            ) : (
                              <span className="text-lime-400 font-bold">
                                #{entry.rank}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            {entry.avatar ? (
                              <Image
                                src={entry.avatar}
                                alt={entry.name}
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                                <User className="w-5 h-5 text-slate-400" />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-white">
                                {entry.name}
                              </p>
                              {index < 3 && (
                                <div className="flex items-center gap-1 mt-0.5">
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  <span className="text-xs text-yellow-400">
                                    শীর্ষ খেলোয়াড়
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-slate-400">
                          {entry.country ?? "—"}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <span
                            className={`font-bold ${
                              index < 3 ? "text-lime-400" : "text-white"
                            }`}
                          >
                            {entry.points.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <span className="bg-slate-700/50 px-3 py-1 rounded-full text-slate-200">
                            {entry.solved}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                মোট অংশগ্রহণকারী
              </p>
              <p className="text-3xl font-bold text-lime-400">4,218</p>
              <p className="text-slate-500 text-xs mt-2">সক্রিয় খেলোয়াড়</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                গড় স্কোর
              </p>
              <p className="text-3xl font-bold text-blue-400">2,456</p>
              <p className="text-slate-500 text-xs mt-2">সব খেলোয়াড়</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm font-semibold uppercase mb-2">
                সর্বোচ্চ স্কোর
              </p>
              <p className="text-3xl font-bold text-yellow-400">4,850</p>
              <p className="text-slate-500 text-xs mt-2">বর্তমান বিজয়ী</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
