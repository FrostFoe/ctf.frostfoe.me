"use client";

import Image from "next/image";

interface CtfEvent {
  id: number;
  slug: string;
  title: string;
  image: string;
  badge: string;
  tags?: string[];
  [key: string]: unknown;
}

interface CtfDetailHeaderProps {
  event: CtfEvent;
}

export default function CtfDetailHeader({ event }: CtfDetailHeaderProps) {
  // Ensure tags is always an array
  const safeTags = Array.isArray(event.tags) ? event.tags : [];

  return (
    <div className="relative w-full h-80 sm:h-96 md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={event.image}
        alt={event.title}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-900" />

      {/* Content - Dark Card in Center */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-slate-900/90 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            {/* HTB Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-slate-900">⬜</span>
              </div>
              <span className="text-sm font-bold text-slate-400">
                এইচটিবি সিটিএফ
              </span>
            </div>

            {/* Close Button Area - Can be implemented */}
            <div className="w-6 h-6" />
          </div>

          {/* Title and Image Container */}
          <div className="flex items-center justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {event.title}
              </h1>
              <div className="w-24 h-0.5 bg-lime-400" />
            </div>

            {/* Illustration/Icon Area */}
            <div className="hidden md:flex shrink-0">
              <Image
                src="/images/learning-paths-asset.webp"
                alt="সিটিএফ আইকন"
                width={150}
                height={150}
                className="w-32 h-32 object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badge and Tags - Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-1.5 sm:gap-2 flex-wrap justify-end">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded bg-red-600 text-white">
          {event.badge}
        </span>
        {safeTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded border border-slate-700 bg-slate-900/80 text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
