"use client";

import Image from "next/image";
import { Users, Zap, Globe, Users2, BookOpen, User } from "lucide-react";

interface CtfEvent {
  hostedBy?: string;
  hostedByLogo?: string;
  hosted_by?: string;
  hosted_by_logo?: string;
  going?: number;
  teams?: number;
  playerAvatars?: string[];
  player_avatars?: string[];
  format?: string;
  type?: string;
  location?: string;
  teamSize?: string | number;
  team_size?: string;
  scenarios?: string;
  [key: string]: unknown;
}

interface CtfDetailSidebarProps {
  event: CtfEvent;
}

export default function CtfDetailSidebar({ event }: CtfDetailSidebarProps) {
  // Support both camelCase (from transformed data) and snake_case (fallback)
  const safePlayerAvatars = Array.isArray(event.playerAvatars || event.player_avatars) 
    ? (event.playerAvatars || event.player_avatars || [])
    : [];
  const hostedBy = event.hostedBy || event.hosted_by || "Unknown";
  const hostedByLogo = event.hostedByLogo || event.hosted_by_logo;
  const format = event.format || "N/A";
  const type = event.type || "N/A";
  const location = event.location || "N/A";
  const teamSize = event.teamSize || event.team_size || "N/A";
  const scenarios = event.scenarios || "N/A";
  return (
    <div className="w-full space-y-4 sm:space-y-5 md:space-y-6">
      {/* Hosted By Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 md:p-6">
        <h3 className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wide mb-3 sm:mb-4">
          আয়োজন করেছে
        </h3>
        <div className="flex flex-col items-start gap-3 sm:gap-4">
          <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
            {hostedByLogo ? (
              <Image
                src={hostedByLogo}
                alt={hostedBy}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
            )}
          </div>
          <div>
            <p className="text-white font-bold text-base sm:text-lg">
              {hostedBy}
            </p>
            <p className="text-slate-400 text-xs sm:text-sm">ইভেন্ট আয়োজক</p>
          </div>
        </div>
      </div>

      {/* Going Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 md:p-6">
        <h3 className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wide mb-3 sm:mb-4">
          অংশগ্রহণকারী
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {/* Player Avatars */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3 overflow-x-auto pb-1">
            <div className="flex -space-x-2">
              {safePlayerAvatars.slice(0, 4).map((avatar, idx) =>
                avatar ? (
                  <Image
                    key={idx}
                    src={avatar}
                    alt={`খেলোয়াড় ${idx + 1}`}
                    width={36}
                    height={36}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-slate-700 object-cover"
                  />
                ) : (
                  <div
                    key={idx}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-slate-700 bg-slate-700 flex items-center justify-center"
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  </div>
                ),
              )}
            </div>
            {safePlayerAvatars.length > 4 && (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-200">
                  +{safePlayerAvatars.length - 4}
                </span>
              </div>
            )}
          </div>

          {/* Player Count */}
          <div className="flex items-center gap-2 text-slate-300 text-sm sm:text-base">
            <Users className="w-4 h-4 text-lime-400 shrink-0" />
            <span>
              <strong className="text-white">{event.going || 0}</strong> জন খেলোয়াড়
              যোগ দিয়েছেন
            </span>
          </div>

          {/* Team Count */}
          <div className="flex items-center gap-2 text-slate-300 text-sm sm:text-base">
            <Users2 className="w-4 h-4 text-lime-400 shrink-0" />
            <span>
              <strong className="text-white">{event.teams || 0}</strong> টি দল যোগ
              দিয়েছে
            </span>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 md:p-6">
        <h3 className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wide mb-3 sm:mb-4">
          স্পেসিফিকেশন
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {/* Format */}
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-2">ফরম্যাট</p>
            <p className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400 shrink-0" />
              <span className="truncate">{format}</span>
            </p>
          </div>

          {/* Type */}
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-2">ধরন</p>
            <p className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400 shrink-0" />
              <span className="truncate">{type}</span>
            </p>
          </div>

          {/* Location */}
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-2">অবস্থান</p>
            <p className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400 shrink-0" />
              <span className="truncate">{location}</span>
            </p>
          </div>

          {/* Team Size */}
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-2">
              দলের আকার
            </p>
            <p className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime-400 shrink-0" />
              <span className="truncate">{teamSize}</span>
            </p>
          </div>
        </div>

        {/* Scenarios */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700">
          <p className="text-slate-500 text-xs font-semibold mb-2">দৃশ্যপট</p>
          <p className="text-white font-semibold text-sm sm:text-base">
            {scenarios}
          </p>
        </div>
      </div>
    </div>
  );
}
