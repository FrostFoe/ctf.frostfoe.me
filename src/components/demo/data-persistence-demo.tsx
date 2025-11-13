/**
 * CTF Platform - Data Persistence Demo Component
 * Shows how to use the persistent storage system in action
 */

"use client";

import { useState, useEffect } from "react";
import {
  getOrInitializeUserProfile,
  getOrInitializeUserStats,
  logActivity,
  completeChallengeFull,
  getAllAchievements,
  getUnlockedAchievements,
  getRecentActivities,
  updateUserStats,
} from "@/lib/user-data";
import { createNewTeam, getPublicTeams, searchTeams } from "@/lib/team-service";
import type { UserProfile, UserStats, Achievement, RecentActivity } from "@/lib/storage";

/**
 * Demo Component - Shows all persistent data features
 */
export default function DataPersistenceDemo() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [publicTeams, setPublicTeams] = useState<any[]>([]);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      // 1. Load user profile
      const userProfile = getOrInitializeUserProfile();
      setProfile(userProfile);

      // 2. Load user stats
      const userStats = getOrInitializeUserStats();
      setStats(userStats);

      // 3. Load achievements
      const allAchievements = getAllAchievements();
      setAchievements(allAchievements);

      // 4. Load recent activities
      const recentActivities = getRecentActivities(5);
      setActivities(recentActivities);

      // 5. Load public teams
      const teams = getPublicTeams();
      setPublicTeams(teams.slice(0, 5));
    };

    loadData();
  }, []);

  // Demo: Complete a challenge
  const handleCompleteChallenge = () => {
    const success = completeChallengeFull(
      1, // challengeId
      1, // eventId
      100, // points
      30, // timeSpent in minutes
      0, // hintsUsed
    );

    if (success) {
      // Update displayed stats
      const updatedStats = getOrInitializeUserStats();
      setStats(updatedStats);

      // Update activities
      const updatedActivities = getRecentActivities(5);
      setActivities(updatedActivities);

      alert("✅ চ্যালেঞ্জ সমাধান হয়েছে! ডেটা লোকালস্টোরেজে সংরক্ষিত হয়েছে।");
    }
  };

  // Demo: Create a team
  const handleCreateTeam = () => {
    if (!profile) return;

    const team = createNewTeam(
      "ডেমো টিম",
      "এটি একটি ডেমো টিম যা localStorage এ সংরক্ষিত",
      profile.id,
      profile.username,
      profile.avatar,
      true,
    );

    if (team) {
      alert(`✅ টিম তৈরি হয়েছে!\nটিম নাম: ${team.name}\nজয়েন কোড: ${team.joinCode}`);
      setPublicTeams((prev) => [...prev, team]);
    }
  };

  // Demo: Log activity
  const handleLogActivity = () => {
    logActivity(
      "challenge_solved",
      "ডেমো কার্যকলাপ",
      "এটি একটি টেস্ট কার্যকলাপ যা localStorage এ সংরক্ষিত হয়েছে",
    );

    const updatedActivities = getRecentActivities(5);
    setActivities(updatedActivities);

    alert("✅ কার্যকলাপ লগ করা হয়েছে!");
  };

  // Demo: Update stats
  const handleUpdateStats = () => {
    if (!stats) return;

    updateUserStats({
      totalPoints: stats.totalPoints + 50,
      challengesSolved: stats.challengesSolved + 1,
    });

    const updatedStats = getOrInitializeUserStats();
    setStats(updatedStats);

    alert("✅ স্ট্যাটিস্টিক্স আপডেট হয়েছে!");
  };

  if (!profile || !stats) {
    return <div className="p-4 text-slate-400">ডেটা লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">
            📊 CTF Platform - ডেটা Persistence ডেমো
          </h1>
          <p className="text-slate-400">
            localStorage এবং JSON ডেটা ম্যানেজমেন্ট সিস্টেম
          </p>
        </div>

        {/* User Profile Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">👤 ব্যবহারকারী প্রোফাইল</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-slate-400">
                <span className="font-bold">নাম:</span> {profile.displayName}
              </p>
              <p className="text-slate-400">
                <span className="font-bold">ইউজারনেম:</span> @{profile.username}
              </p>
              <p className="text-slate-400">
                <span className="font-bold">ইমেইল:</span> {profile.email}
              </p>
              <p className="text-slate-400">
                <span className="font-bold">যোগদান তারিখ:</span> {profile.joinDate}
              </p>
            </div>
            <div className="bg-slate-900/50 rounded p-4">
              <p className="text-slate-500 text-sm mb-2">স্টোরেজ অবস্থান:</p>
              <p className="text-slate-300 font-mono text-sm break-all">
                localStorage.getItem('ctf_user_profile')
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">📈 পরিসংখ্যান</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/20 rounded p-4">
              <p className="text-slate-400 text-sm">মোট পয়েন্ট</p>
              <p className="text-3xl font-bold text-blue-400">{stats.totalPoints}</p>
            </div>
            <div className="bg-green-500/20 rounded p-4">
              <p className="text-slate-400 text-sm">সমাধান করা</p>
              <p className="text-3xl font-bold text-green-400">{stats.challengesSolved}</p>
            </div>
            <div className="bg-yellow-500/20 rounded p-4">
              <p className="text-slate-400 text-sm">র‍্যাঙ্কিং</p>
              <p className="text-3xl font-bold text-yellow-400">#{stats.ranking}</p>
            </div>
            <div className="bg-purple-500/20 rounded p-4">
              <p className="text-slate-400 text-sm">সাফল্যের হার</p>
              <p className="text-3xl font-bold text-purple-400">{stats.solveRate}</p>
            </div>
          </div>
          <button
            onClick={handleUpdateStats}
            className="w-full bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold py-2 rounded"
          >
            ✨ স্ট্যাটিস্টিক্স আপডেট করুন (50 পয়েন্ট যোগ করুন)
          </button>
        </div>

        {/* Demo Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Complete Challenge Demo */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">🎯 চ্যালেঞ্জ সমাধন করুন</h3>
            <p className="text-slate-400 text-sm mb-4">
              একটি চ্যালেঞ্জ সমাধন করুন এবং পয়েন্ট অর্জন করুন। ডেটা localStorage এ সংরক্ষিত হবে।
            </p>
            <button
              onClick={handleCompleteChallenge}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
            >
              চ্যালেঞ্জ সমাধন (100 পয়েন্ট)
            </button>
          </div>

          {/* Create Team Demo */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">👥 টিম তৈরি করুন</h3>
            <p className="text-slate-400 text-sm mb-4">
              একটি নতুন টিম তৈরি করুন এবং সদস্য যোগ করুন। টিম ডেটা localStorage এ থাকবে।
            </p>
            <button
              onClick={handleCreateTeam}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded"
            >
              টিম তৈরি করুন
            </button>
          </div>

          {/* Log Activity Demo */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">📝 কার্যকলাপ লগ করুন</h3>
            <p className="text-slate-400 text-sm mb-4">
              একটি কার্যকলাপ লগ করুন এবং আপনার ইতিহাস ট্র্যাক করুন। সব ক্রিয়াকলাপ সংরক্ষিত থাকে।
            </p>
            <button
              onClick={handleLogActivity}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
            >
              কার্যকলাপ লগ করুন
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">🏆 অর্জনগুলি</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.slice(0, 6).map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded border ${
                  achievement.unlockedAt
                    ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                    : "bg-slate-900/50 border-slate-700 text-slate-400 opacity-50"
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <p className="text-sm font-bold">{achievement.name}</p>
                <p className="text-xs opacity-75 mt-1">
                  {achievement.unlockedAt ? "আনলক করা হয়েছে" : "আনলক হয়নি"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">⚡ সাম্প্রতিক কার্যকলাপ</h2>
          <div className="space-y-3">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-slate-900/50 rounded p-4 border border-slate-700"
                >
                  <p className="text-white font-bold">{activity.title}</p>
                  <p className="text-slate-400 text-sm">{activity.description}</p>
                  <p className="text-slate-500 text-xs mt-2">{activity.timestamp}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-400">কোন কার্যকলাপ নেই</p>
            )}
          </div>
        </div>

        {/* Storage Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">💾 স্টোরেজ তথ্য</h2>
          <div className="space-y-3 text-slate-400">
            <p>✅ <span className="font-bold">ব্যবহারকারী প্রোফাইল</span> → localStorage</p>
            <p>✅ <span className="font-bold">পরিসংখ্যান</span> → localStorage</p>
            <p>✅ <span className="font-bold">অর্জনগুলি</span> → localStorage</p>
            <p>✅ <span className="font-bold">কার্যকলাপ</span> → localStorage (শেষ 100)</p>
            <p>✅ <span className="font-bold">সম্পূর্ণ চ্যালেঞ্জ</span> → localStorage</p>
            <p>✅ <span className="font-bold">টিম</span> → localStorage</p>
            <p>✅ <span className="font-bold">সেটিংস</span> → localStorage</p>
            <div className="mt-4 p-4 bg-blue-500/20 rounded border border-blue-500">
              <p className="text-sm">
                💡 <span className="font-bold">টিপ:</span> ব্রাউজার ডেভেলপার টুলস খুলুন (F12)
                এবং Application ট্যাবে যান। localStorage এ সমস্ত ডেটা দেখুন।
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>🚀 এই ডেমো সমস্ত persistent data storage features দেখায়</p>
          <p className="mt-2">
            STORAGE_GUIDE.md এবং IMPLEMENTATION_SUMMARY.md ফাইল দেখুন সম্পূর্ণ ডকুমেন্টেশনের জন্য
          </p>
        </div>
      </div>
    </div>
  );
}
