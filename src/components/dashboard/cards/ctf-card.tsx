"use client";

import { ChevronRight } from "lucide-react";

export default function CTFCard() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            HTB CTF
          </p>
          <h3 className="text-lg font-bold text-white">
            Play or host a hacking competition
          </h3>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
      </div>
    </div>
  );
}
