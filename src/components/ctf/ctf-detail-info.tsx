"use client";

import { Button } from "@/components/ui/button";
import { Share2, LogIn } from "lucide-react";

interface CtfEvent {
  title: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  start_date?: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  [key: string]: unknown;
}

interface CtfDetailInfoProps {
  event: CtfEvent;
  onSignUp?: () => void;
}

export default function CtfDetailInfo({ event, onSignUp }: CtfDetailInfoProps) {
  // Support both camelCase (from transformed data) and snake_case (fallback)
  const startDate = event.startDate || event.start_date || "N/A";
  const startTime = event.startTime || event.start_time || "N/A";
  const endDate = event.endDate || event.end_date || "N/A";
  const endTime = event.endTime || event.end_time || "N/A";
  return (
    <div className="w-full bg-slate-800/30 border-t border-b border-slate-700 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6">
      <div className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
          {/* Dates Section */}
          <div className="space-y-4 sm:space-y-6">
            {/* Start Date */}
            <div>
              <p className="text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                শুরুর তারিখ
              </p>
              <p className="text-white text-base sm:text-lg md:text-xl font-semibold">
                {startDate}
              </p>
              <p className="text-slate-300 text-xs sm:text-sm">
                {startTime}
              </p>
            </div>

            {/* End Date */}
            <div>
              <p className="text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1 sm:mb-2">
                শেষ তারিখ
              </p>
              <p className="text-white text-base sm:text-lg md:text-xl font-semibold">
                {endDate}
              </p>
              <p className="text-slate-300 text-xs sm:text-sm">
                {endTime}
              </p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Sign Up Button */}
            <Button
              onClick={onSignUp}
              className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-sm sm:text-base rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
              নিবন্ধন করুন
            </Button>

            {/* Share Button */}
            <Button
              variant="outline"
              className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-slate-700/50 hover:bg-slate-600 text-white border border-slate-600 font-semibold text-sm sm:text-base rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              শেয়ার করুন
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-slate-700 via-slate-600 to-slate-700" />
      </div>
    </div>
  );
}
