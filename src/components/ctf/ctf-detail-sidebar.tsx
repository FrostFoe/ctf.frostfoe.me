"use client";

import Image from "next/image";
import { Users, Zap, Globe, Users2, BookOpen } from "lucide-react";

interface CtfEvent {
  hostedBy: string;
  hostedByLogo: string;
  going: number;
  teams: number;
  playerAvatars: string[];
  format: string;
  type: string;
  location: string;
  teamSize: string;
  scenarios: string;
  [key: string]: unknown;
}

interface CtfDetailSidebarProps {
  event: CtfEvent;
}

export default function CtfDetailSidebar({ event }: CtfDetailSidebarProps) {
  return (
    <div className="w-full space-y-6">
      {/* Hosted By Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wide mb-4">
          আয়োজন করেছে
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-slate-700 rounded-lg overflow-hidden">
            <Image
              src={event.hostedByLogo}
              alt={event.hostedBy}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-bold text-lg">{event.hostedBy}</p>
            <p className="text-slate-400 text-sm">ইভেন্ট আয়োজক</p>
          </div>
        </div>
      </div>

      {/* Going Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wide mb-4">
          অংশগ্রহণকারী
        </h3>
        <div className="space-y-4">
          {/* Player Avatars */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-2">
              {event.playerAvatars.slice(0, 4).map((avatar, idx) => (
                <Image
                  key={idx}
                  src={avatar}
                  alt={`খেলোয়াড় ${idx + 1}`}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full border-2 border-slate-700 object-cover"
                />
              ))}
            </div>
            {event.playerAvatars.length > 4 && (
              <div className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-200">
                  +{event.playerAvatars.length - 4}
                </span>
              </div>
            )}
          </div>

          {/* Player Count */}
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="w-4 h-4 text-lime-400" />
            <span>
              <strong className="text-white">{event.going}</strong> জন খেলোয়াড়
              যোগ দিয়েছেন
            </span>
          </div>

          {/* Team Count */}
          <div className="flex items-center gap-2 text-slate-300">
            <Users2 className="w-4 h-4 text-lime-400" />
            <span>
              <strong className="text-white">{event.teams}</strong> টি দল
              যোগ দিয়েছে
            </span>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wide mb-4">
          স্পেসিফিকেশন
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Format */}
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-2">ফরম্যাট</p>
            <p className="text-white font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-lime-400" />
              {event.format}
            </p>
          </div>

          {/* Type */}
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-2">ধরন</p>
            <p className="text-white font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-lime-400" />
              {event.type}
            </p>
          </div>

          {/* Location */}
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-2">
              অবস্থান
            </p>
            <p className="text-white font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4 text-lime-400" />
              {event.location}
            </p>
          </div>

          {/* Team Size */}
          <div>
            <p className="text-slate-500 text-xs font-semibold mb-2">
              দলের আকার
            </p>
            <p className="text-white font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-lime-400" />
              {event.teamSize}
            </p>
          </div>
        </div>

        {/* Scenarios */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-slate-500 text-xs font-semibold mb-2">দৃশ্যপট</p>
          <p className="text-white font-semibold">{event.scenarios}</p>
        </div>
      </div>
    </div>
  );
}
