"use client";

import { Search } from "lucide-react";

interface CtfSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CtfSearch({
  searchQuery,
  onSearchChange,
}: CtfSearchProps) {
  return (
    <div className="my-6 sm:my-8">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="সরাসরি ক্যাপচার দ্য ফ্ল্যাগ ইভেন্ট অনুসন্ধান করুন"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg pl-10 pr-4 py-2 sm:py-3 text-sm focus:outline-none focus:border-slate-600 transition-colors"
        />
      </div>
    </div>
  );
}
