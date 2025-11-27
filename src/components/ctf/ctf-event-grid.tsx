"use client";

import CtfEventCard from "./ctf-event-card";
import type { CTFEvent } from "@/lib/types";

interface CtfEventGridProps {
  events: CTFEvent[];
}

export default function CtfEventGrid({ events }: CtfEventGridProps) {
  if (events.length === 0) {
    return (
      <div className="py-8 sm:py-10 md:py-12 text-center ">
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg px-4">
          কোন ইভেন্ট পাওয়া যায়নি। একটি ভিন্ন অনুসন্ধান চেষ্টা করুন বা পরে আবার
          দেখুন!
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8 md:py-10 lg:py-12 w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {events.map((event) => (
          <CtfEventCard
            key={event.id}
            {...event}
            subtitle={event.subtitle || ""}
            date={event.date || event.startDate || ""}
            image={event.image || ""}
            badge={event.badge || ""}
            players={event.players || 0}
            type={event.ctfType || "single"}
            seriesChallenges={event.totalChallenges || 1}
          />
        ))}
      </div>
    </div>
  );
}
