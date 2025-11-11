"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function GuestLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleGuestLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInAnonymously();

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("অতিথি লগইনে ত্রুটি হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          অতিথি হিসেবে প্রবেশ করুন
        </h1>
        <p className="text-slate-400">অ্যাকাউন্ট তৈরি ছাড়াই অন্বেষণ করুন</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <button
        onClick={() => void handleGuestLogin()}
        disabled={loading}
        className="w-full bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? "লোড হচ্ছে..." : "অতিথি হিসেবে চালিয়ে যান"}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-400">
            অথবা
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/login"
          className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg transition-colors text-center"
        >
          লগইন করুন
        </Link>
        <Link
          href="/signup"
          className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg transition-colors text-center"
        >
          নতুন অ্যাকাউন্ট তৈরি করুন
        </Link>
      </div>
    </div>
  );
}
