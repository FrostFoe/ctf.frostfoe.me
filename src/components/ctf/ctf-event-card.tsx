"use client";

import Image from "next/image";
import Link from "next/link";
import { EventStatusBadge } from "@/components/ui/event-status-badge";
import { Countdown } from "@/components/ui/countdown";
import { User } from "lucide-react";

interface CtfEventCardProps {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  badge: string;
  tags?: string[];
  players: number;
  status?: "upcoming" | "ongoing" | "ended" | "registration-closed";
  startDate?: string;
  startTime?: string;
  type?: "single" | "series";
  seriesChallenges?: number;
}

export default function CtfEventCard({
  slug,
  title,
  subtitle,
  date,
  image,
  badge,
  tags = [],
  players,
  status = "ongoing",
  startDate,
  startTime,
  type = "single",
  seriesChallenges = 1,
}: CtfEventCardProps) {
  // Generate avatar colors for players
  const avatarColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"];

  const targetDate =
    startDate && startTime ? `${startDate} ${startTime}` : date;
  
  // Ensure tags is always an array
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <Link href={`/ctf/${slug}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:border-slate-600 transition-all h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-32 sm:h-40 md:h-48 w-full overflow-hidden bg-slate-900 shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badge */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1.5 sm:gap-2 flex-wrap">
            <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 bg-red-600 text-white text-xs font-bold rounded whitespace-nowrap">
              {badge}
            </span>
            {/* CTF Type Badge */}
            <span
              className={`inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 text-white text-xs font-bold rounded whitespace-nowrap ${
                type === "series" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {type === "series" ? "Series" : "Single"}
            </span>
            {safeTags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 bg-slate-900/80 text-slate-200 text-xs font-semibold rounded border border-slate-700 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col gap-3 sm:gap-4">
          {/* Status Badge */}
          <div>
            <EventStatusBadge status={status} />
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-lime-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs text-slate-400 uppercase tracking-wide truncate">
              {subtitle}
            </p>
          )}

          {/* Countdown Timer */}
          {status === "upcoming" && (
            <div>
              <Countdown targetDate={targetDate} isUpcoming={true} />
            </div>
          )}

          {/* Date and Time */}
          <p className="text-xs sm:text-sm text-slate-400 line-clamp-1">
            {date}
          </p>

          {/* Players/Avatars or Series Info */}
          {type === "series" ? (
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-xs sm:text-sm text-lime-400 font-semibold">
                📋 {seriesChallenges} চ্যালেঞ্জ
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 mt-auto">
              <div className="flex -space-x-2">
                {Array.from({ length: Math.min(players > 0 ? 4 : 0, 4) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{
                        backgroundColor: avatarColors[i % avatarColors.length],
                      }}
                    >
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  ),
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 truncate">
                {players}{" "}
                <span className="text-slate-500 hidden sm:inline">
                  খেলোয়াড়
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
