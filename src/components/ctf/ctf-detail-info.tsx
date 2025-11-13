"use client";

import { Button } from "@/components/ui/button";
import { Share2, LogIn } from "lucide-react";

interface CtfEvent {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  [key: string]: unknown;
}

interface CtfDetailInfoProps {
  event: CtfEvent;
  onSignUp?: () => void;
}

export default function CtfDetailInfo({ event, onSignUp }: CtfDetailInfoProps) {
  return (
    <div className="w-full bg-slate-800/30 border-t border-b border-slate-700 py-8 px-4 sm:px-6 md:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
          {/* Dates Section */}
          <div className="space-y-6">
            {/* Start Date */}
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-2">
                শুরুর তারিখ
              </p>
              <p className="text-white text-lg md:text-xl font-semibold">
                {event.startDate}
              </p>
              <p className="text-slate-300 text-sm">{event.startTime}</p>
            </div>

            {/* End Date */}
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-2">
                শেষ তারিখ
              </p>
              <p className="text-white text-lg md:text-xl font-semibold">
                {event.endDate}
              </p>
              <p className="text-slate-300 text-sm">{event.endTime}</p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3 h-full justify-center md:justify-end md:items-start pt-0 md:pt-1">
            {/* Sign Up Button */}
            <Button
              onClick={onSignUp}
              className="flex-1 sm:flex-none px-8 py-3 bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
              নিবন্ধন করুন
            </Button>

            {/* Share Button */}
            <Button
              variant="outline"
              className="flex-1 sm:flex-none px-8 py-3 bg-slate-700/50 hover:bg-slate-600 text-white border border-slate-600 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
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
