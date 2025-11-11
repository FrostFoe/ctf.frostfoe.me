"use client";

import { ArrowRight } from "lucide-react";

export default function AcademyCard() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-linear-to-br from-lime-950/40 to-lime-900/20 border border-lime-900/50 hover:border-lime-700/80 transition-all duration-300 p-6 sm:p-8">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">
              এইচটিবি একাডেমি
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              শিখুন এবং প্রত্যয়িত হন
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              আমাদের অনলাইন লার্নিং পাথের মাধ্যমে সাইবারসিকিউরিটিতে আপনার যাত্রা
              শুরু করুন বা এগিয়ে যান এবং আপনার দক্ষতার প্রমাণ দিতে ইন্ডাস্ট্রি
              সার্টিফিকেশন অর্জন করুন।
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between pt-4">
          <button className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold rounded-lg transition-all duration-300 text-sm sm:text-base group/btn">
            শেখা শুরু করুন
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
