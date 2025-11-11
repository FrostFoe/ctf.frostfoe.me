"use client";

import Image from "next/image";
import Link from "next/link";

interface CtfEventCardProps {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  badge: string;
  tags: string[];
  players: number;
}

export default function CtfEventCard({
  slug,
  title,
  subtitle,
  date,
  image,
  badge,
  tags,
  players,
}: CtfEventCardProps) {
  // Generate avatar colors for players
  const avatarColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"];

  return (
    <Link href={`/ctf/${slug}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur hover:border-slate-600 transition-all h-full">
        {/* Image Container */}
        <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-slate-900">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-red-600 text-white text-xs font-bold rounded">
              {badge}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-slate-900/80 text-slate-200 text-xs font-semibold rounded border border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-lime-400 transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mb-3 uppercase tracking-wide">
              {subtitle}
            </p>
          )}

          {/* Date and Time */}
          <p className="text-xs sm:text-sm text-slate-400 mb-4">{date}</p>

          {/* Players/Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {Array.from({ length: Math.min(players > 0 ? 4 : 0, 4) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      backgroundColor: avatarColors[i % avatarColors.length],
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ),
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              {players} <span className="text-slate-500">খেলোয়াড় যাচ্ছেন</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
