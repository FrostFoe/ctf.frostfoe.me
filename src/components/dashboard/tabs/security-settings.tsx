"use client";

import { Lock, Smartphone } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          নিরাপত্তা সেটিংস
        </h2>
        <p className="text-slate-400">
          এই উন্নত সেটিংস দিয়ে আপনার অ্যাকাউন্ট সুরক্ষিত রাখুন।
        </p>
      </div>

      {/* Password Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-lime-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">পাসওয়ার্ড</h3>
            <p className="text-sm text-slate-400 mb-4">
              আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে নিয়মিত আপনার পাসওয়ার্ড আপডেট করুন।
            </p>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">
              পাসওয়ার্ড পরিবর্তন করুন
            </button>
          </div>
        </div>
      </div>

      {/* 2FA Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-lime-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              দুই-ফ্যাক্টর প্রমাণীকরণ
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              আপনার অ্যাকাউন্টে 2FA দিয়ে একটি অতিরিক্ত নিরাপত্তা স্তর যোগ করুন।
            </p>
            <button className="px-4 py-2 bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold rounded-lg transition-colors">
              2FA সক্রিয় করুন
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">সক্রিয় সেশন</h3>
        <div className="space-y-2 text-sm text-slate-400">
          <div className="flex justify-between items-center py-2 border-b border-slate-700">
            <span>বর্তমান ডিভাইস</span>
            <span className="text-lime-400">সক্রিয়</span>
          </div>
          <button className="text-sm text-red-400 hover:text-red-300 font-medium mt-4">
            অন্যান্য সমস্ত সেশন থেকে সাইন আউট করুন
          </button>
        </div>
      </div>
    </div>
  );
}
