"use client";

import { useState } from "react";
import { Settings, Save, AlertCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "FrostFoe CTF",
    siteDescription: "Capture The Flag Platform",
    maintenanceMode: false,
    enableRegistration: true,
    enablePublicLeaderboard: true,
    maxTeamSize: 5,
    defaultPointsPerChallenge: 100,
    pointsDecayEnabled: true,
    pointsDecayRate: 0.1,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Simulate saving to database
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSaveMessage("সেটিংস সফলভাবে সংরক্ষণ হয়েছে");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch {
      setSaveMessage("সেটিংস সংরক্ষণ করতে ব্যর্থ");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">সেটিংস</h1>
        <p className="text-slate-400 mt-1">প্ল্যাটফর্ম সেটিংস কনফিগার করুন</p>
      </div>

      {/* Success/Error Message */}
      {saveMessage && (
        <div
          className={`flex items-center gap-3 px-6 py-4 rounded-lg border ${
            saveMessage.includes("সফল")
              ? "bg-green-900/30 border-green-700 text-green-400"
              : "bg-red-900/30 border-red-700 text-red-400"
          }`}
        >
          <AlertCircle size={20} />
          <p>{saveMessage}</p>
        </div>
      )}

      {/* General Settings Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings size={24} className="text-lime-400" />
          <h2 className="text-2xl font-bold text-white">সাধারণ সেটিংস</h2>
        </div>

        {/* Site Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            সাইট নাম
          </label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleChange("siteName", e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>

        {/* Site Description */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            সাইট বর্ণনা
          </label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) => handleChange("siteDescription", e.target.value)}
            rows={4}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>

        {/* Maintenance Mode */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) =>
                handleChange("maintenanceMode", e.target.checked)
              }
              className="w-5 h-5 rounded accent-lime-400"
            />
            <span className="text-slate-300 font-medium">
              রক্ষণাবেক্ষণ মোড সক্রিয় করুন
            </span>
          </label>
          <p className="text-slate-500 text-sm mt-2 ml-8">
            সক্রিয় করলে শুধুমাত্র প্রশাসকরা সাইট অ্যাক্সেস করতে পারবেন
          </p>
        </div>

        {/* Enable Registration */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableRegistration}
              onChange={(e) =>
                handleChange("enableRegistration", e.target.checked)
              }
              className="w-5 h-5 rounded accent-lime-400"
            />
            <span className="text-slate-300 font-medium">
              রেজিস্ট্রেশন সক্রিয় করুন
            </span>
          </label>
          <p className="text-slate-500 text-sm mt-2 ml-8">
            নতুন ব্যবহারকারীদের নিবন্ধন করার অনুমতি দিন
          </p>
        </div>

        {/* Public Leaderboard */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enablePublicLeaderboard}
              onChange={(e) =>
                handleChange("enablePublicLeaderboard", e.target.checked)
              }
              className="w-5 h-5 rounded accent-lime-400"
            />
            <span className="text-slate-300 font-medium">
              সর্বজনীন লিডারবোর্ড সক্রিয় করুন
            </span>
          </label>
          <p className="text-slate-500 text-sm mt-2 ml-8">
            অপ্রমাণীকৃত ব্যবহারকারীরা লিডারবোর্ড দেখতে পারবেন
          </p>
        </div>
      </div>

      {/* Challenge Settings */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white">চ্যালেঞ্জ সেটিংস</h2>

        {/* Max Team Size */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            সর্বোচ্চ টিম সদস্য সংখ্যা
          </label>
          <input
            type="number"
            min="1"
            value={settings.maxTeamSize}
            onChange={(e) =>
              handleChange("maxTeamSize", parseInt(e.target.value))
            }
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>

        {/* Default Points */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            চ্যালেঞ্জের ডিফল্ট পয়েন্ট
          </label>
          <input
            type="number"
            min="1"
            value={settings.defaultPointsPerChallenge}
            onChange={(e) =>
              handleChange("defaultPointsPerChallenge", parseInt(e.target.value))
            }
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>

        {/* Points Decay */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.pointsDecayEnabled}
              onChange={(e) =>
                handleChange("pointsDecayEnabled", e.target.checked)
              }
              className="w-5 h-5 rounded accent-lime-400"
            />
            <span className="text-slate-300 font-medium">
              পয়েন্ট হ্রাস সক্রিয় করুন
            </span>
          </label>
          <p className="text-slate-500 text-sm mt-2 ml-8">
            বেশি সময় ধরে চ্যালেঞ্জ সমাধান করলে কম পয়েন্ট পান
          </p>

          {settings.pointsDecayEnabled && (
            <div className="mt-4 ml-8">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                হ্রাসের হার ({settings.pointsDecayRate})
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.pointsDecayRate}
                onChange={(e) =>
                  handleChange("pointsDecayRate", parseFloat(e.target.value))
                }
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold text-red-400">বিপদ অঞ্চল</h2>
        <p className="text-slate-300">এই অ্যাকশনগুলি পূর্ববর্তী করা যাবে না</p>

        <button className="px-6 py-3 bg-red-900/50 text-red-400 border border-red-700 rounded-lg hover:bg-red-900/70 transition-colors font-medium">
          সকল ডেটা রিসেট করুন
        </button>

        <button className="px-6 py-3 bg-red-900/50 text-red-400 border border-red-700 rounded-lg hover:bg-red-900/70 transition-colors font-medium">
          ডাটাবেস ব্যাকআপ সংরক্ষণ করুন
        </button>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-lime-400 text-slate-900 rounded-lg font-bold hover:bg-lime-500 disabled:opacity-50 transition-colors"
        >
          <Save size={18} />
          {isSaving ? "সংরক্ষণ করছি..." : "সংরক্ষণ করুন"}
        </button>
      </div>
    </div>
  );
}
