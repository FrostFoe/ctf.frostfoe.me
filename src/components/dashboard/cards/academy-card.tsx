"use client";

import { ArrowRight } from "lucide-react";

export default function AcademyCard() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-lime-950/40 to-lime-900/20 border border-lime-900/50 hover:border-lime-700/80 transition-all duration-300 p-6 sm:p-8">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">
              HTB Academy
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Learn and get certified
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Begin or advance your journey in cybersecurity with our online
              learning paths and earn industry certifications to prove your
              expertise.
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between pt-4">
          <button className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold rounded-lg transition-all duration-300 text-sm sm:text-base group/btn">
            Start learning
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>

          {/* Decorative Icon */}
          <div className="text-5xl sm:text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
            📚
          </div>
        </div>
      </div>
    </div>
  );
}
