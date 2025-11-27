"use client";

import { useState } from "react";
import { useUser } from "@/lib/context/user-context";

export default function UserSettings() {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(
    user?.username ?? "",
  );
  const [displayName, setDisplayName] = useState(
    (user as any)?.display_name ?? user?.username ?? "",
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // In a real app, you'd call an API to update user metadata
      await new Promise((resolve) => setTimeout(resolve, 500)); // Dummy await
      setMessage("পরিবর্তনগুলি সংরক্ষণ করা হয়েছে!");
    } catch {
      setMessage("ত্রুটি: পরিবর্তনগুলি সংরক্ষণ করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          ব্যবহারকারী সেটিংস
        </h2>
        <p className="text-slate-400">
          আপনার ব্যবহারকারী পছন্দ এবং অ্যাকাউন্ট তথ্য পরিচালনা করুন।
        </p>
      </div>

      {message && (
        <div
          className={`px-4 py-2 rounded-lg ${
            message.includes("ত্রুটি")
              ? "bg-red-500/10 border border-red-500/50 text-red-400"
              : "bg-green-500/10 border border-green-500/50 text-green-400"
          }`}
        >
          {message}
        </div>
      )}

      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            ইমেল ঠিকানা
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-lime-400 transition-colors disabled:opacity-50"
            placeholder="your@email.com"
          />
          <p className="text-xs text-slate-500">
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            ব্যবহারকারীর নাম
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-lime-400 transition-colors disabled:opacity-50"
            placeholder="ব্যবহারকারীর নাম"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            প্রদর্শনের নাম
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-lime-400 transition-colors disabled:opacity-50"
            placeholder="প্রদর্শনের নাম"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => void handleSave()}
            disabled={loading}
            className="px-6 py-2 bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "সংরক্ষণ করছে..." : "পরিবর্তনগুলি সংরক্ষণ করুন"}
          </button>
          <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">
            বাতিল করুন
          </button>
        </div>
      </div>
    </div>
  );
}
