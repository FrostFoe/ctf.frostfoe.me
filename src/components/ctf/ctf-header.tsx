"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CtfHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xs w-full">
      <div className="container-centered">
        <div className="flex h-12 sm:h-14 md:h-16 items-center justify-between py-1.5 sm:py-2 md:py-4 gap-2 sm:gap-3 md:gap-4">
          {/* Left side - Logo */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 min-w-0 shrink-0">
            <Image
              src="/flag-wave.gif"
              alt="এইচটিবি সিটিএফ"
              width={32}
              height={32}
              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 shrink-0"
            />
            <span className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
              এইচটিবি{" "}
              <span className="text-slate-400 hidden sm:inline">সিটিএফ</span>
            </span>
          </div>

          {/* Center - Icons */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 w-8 lg:h-9 lg:w-9"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 w-8 lg:h-9 lg:w-9"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Button>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0 ml-auto">
            <Button className="hidden lg:flex gap-1.5 bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-xs md:text-sm px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 h-8 sm:h-9">
              <svg
                className="w-3 h-3 md:w-4 md:h-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
              <span>তৈরি করুন</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-slate-800 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 hidden sm:flex"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
