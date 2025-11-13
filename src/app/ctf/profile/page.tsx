"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Trophy,
  Award,
  Zap,
  BarChart3,
  Calendar,
  Flag,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CtfHeader from "@/components/ctf/ctf-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  getOrInitializeUserProfile,
  getOrInitializeUserStats,
  getUnlockedAchievements,
  getAllAchievements,
  getRecentActivities,
  updateUserProfile,
  checkAndUnlockAchievements,
} from "@/lib/user-data";
import type { Achievement, RecentActivity, UserProfile, UserStats } from "@/lib/storage";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Real-time localStorage listener for stats updates
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "ctf_user_stats" ||
        e.key === "ctf_completed_challenges" ||
        e.key === "ctf_achievements"
      ) {
        // Reload stats on storage change
        const userStats = getOrInitializeUserStats();
        const allAchievements = getAllAchievements();
        const activities = getRecentActivities(10);

        setStats(userStats);
        setAchievements(allAchievements);
        setRecentActivities(activities);
        checkAndUnlockAchievements();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    // Load data from persistent storage
    const profile = getOrInitializeUserProfile();
    const userStats = getOrInitializeUserStats();
    const unlockedAchievements = getUnlockedAchievements();
    const allAchievements = getAllAchievements();
    const activities = getRecentActivities(10);

    setUserProfile(profile);
    setStats(userStats);
    // Show all achievements with unlock status
    setAchievements(allAchievements);
    setRecentActivities(activities);
    checkAndUnlockAchievements();
    setIsLoading(false);
  }, []);

  if (isLoading || !userProfile || !stats) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <CtfHeader />
        <div className="text-slate-400">প্রোফাইল লোড হচ্ছে...</div>
      </div>
    );
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
      case "rare":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "epic":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "legendary":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <CtfHeader />

      <div className="container-centered">
        <Breadcrumb
          items={[
            { label: "হোম", href: "/" },
            { label: "সিটিএফ", href: "/ctf" },
            { label: "আমার প্রোফাইল" },
          ]}
        />

        {/* Profile Header */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 border border-slate-700 rounded-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Image
                  src={userProfile.avatar}
                  alt={userProfile.displayName}
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-lime-400"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-3 sm:space-y-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {userProfile.displayName}
                  </h1>
                  <p className="text-slate-400 text-sm">
                    @{userProfile.username}
                  </p>
                </div>

                <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
                  {userProfile.bio}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400 pt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    যোগদান: {userProfile.joinDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📍 {userProfile.country}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold">
                    প্রোফাইল সম্পাদনা করুন
                  </Button>
                  <Button variant="outline" className="border-slate-600">
                    শেয়ার করুন
                  </Button>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6 self-start w-full sm:w-auto">
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">
                      বর্তমান র‍্যাঙ্ক
                    </p>
                    <p className="text-3xl sm:text-4xl font-bold text-lime-400">
                      #{stats.ranking}
                    </p>
                  </div>
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-slate-400 text-xs font-bold uppercase">
                      মোট পয়েন্ট
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      {stats.totalPoints}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-8 border-b border-slate-700 overflow-x-auto">
          {[
            { id: "overview", label: "সারসংক্ষেপ" },
            { id: "achievements", label: "অর্জনগুলি" },
            { id: "activity", label: "কার্যকলাপ" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-lime-400 text-lime-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8 mb-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6 sm:space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400" />
                    <p className="text-xs sm:text-sm text-slate-400 font-bold">
                      সমাধান করা
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stats.challengesSolved}
                  </p>
                </div>

                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                    <p className="text-xs sm:text-sm text-slate-400 font-bold">
                      বর্তমান স্ট্রীক
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stats.currentStreak} দিন
                  </p>
                </div>

                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    <p className="text-xs sm:text-sm text-slate-400 font-bold">
                      ইভেন্টস
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stats.eventParticipations}
                  </p>
                </div>

                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    <p className="text-xs sm:text-sm text-slate-400 font-bold">
                      সাফল্যের হার
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {stats.solveRate}
                  </p>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">
                  দক্ষতা বিতরণ
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { category: "ওয়েব", solved: 8, total: 10 },
                    { category: "ক্রিপ্টোগ্রাফি", solved: 6, total: 8 },
                    { category: "ফরেনসিক্স", solved: 5, total: 7 },
                    { category: "রিভার্স ইঞ্জিনিয়ারিং", solved: 4, total: 6 },
                  ].map((skill) => (
                    <div key={skill.category}>
                      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                        <span className="text-sm font-medium text-slate-300">
                          {skill.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {skill.solved}/{skill.total}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-lime-400 to-lime-500 h-2 rounded-full"
                          style={{
                            width: `${(skill.solved / skill.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement) => {
                  const isUnlocked = achievement.unlockedAt !== "";
                  return (
                    <div
                      key={achievement.id}
                      className={`border rounded-lg p-4 sm:p-6 space-y-2 sm:space-y-3 transition-opacity ${
                        isUnlocked
                          ? getRarityColor(achievement.rarity)
                          : "bg-slate-900/50 text-slate-500 border-slate-700 opacity-50"
                      }`}
                    >
                      <div
                        className={`text-4xl sm:text-5xl text-center mb-2 sm:mb-3 ${
                          !isUnlocked ? "opacity-50 grayscale" : ""
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <h3 className="font-bold text-center text-sm sm:text-base">
                        {achievement.name}
                      </h3>
                      <p className="text-xs text-center opacity-90">
                        {achievement.description}
                      </p>
                      {isUnlocked ? (
                        <p className="text-xs text-center opacity-75 pt-2 border-t border-current/20">
                          {achievement.unlockedAt}
                        </p>
                      ) : (
                        <p className="text-xs text-center opacity-75 pt-2 border-t border-current/20">
                          আনলক হয়নি
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 sm:p-6 flex gap-4 sm:gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-lime-400/20 rounded-full flex items-center justify-center">
                      {activity.type === "challenge_solved" && (
                        <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-lime-400" />
                      )}
                      {activity.type === "rank_achieved" && (
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                      )}
                      {activity.type === "event_joined" && (
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                      )}
                      {activity.type === "team_created" && (
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      {activity.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      {activity.description}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2">
                      {activity.timestamp}
                    </p>
                  </div>

                  <ChevronRight className="flex-shrink-0 w-5 h-5 text-slate-600 hidden sm:block" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
