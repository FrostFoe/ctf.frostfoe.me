"use client";

import { HelpCircle, Grid3x3, User } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-500 rounded-md flex items-center justify-center font-bold text-slate-950">
            🎮
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            এইচটিবি <span className="text-slate-400 font-normal">অ্যাকাউন্ট</span>
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="সাহায্য"
          >
            <HelpCircle className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
          </button>
          <button
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="অ্যাপস"
          >
            <Grid3x3 className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
          </button>
          <button
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="প্রোফাইল"
          >
            <User className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-500 rounded-md flex items-center justify-center font-bold text-slate-950 text-sm">
            🎮
          </div>
        </div>
      </div>
    </header>
  );
}
