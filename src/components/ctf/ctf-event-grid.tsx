"use client";

import CtfEventCard from "./ctf-event-card";

interface Event {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  badge: string;
  tags: string[];
  players: number;
}

interface CtfEventGridProps {
  events: Event[];
}

export default function CtfEventGrid({ events }: CtfEventGridProps) {
  if (events.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-400 text-base sm:text-lg">
          কোন ইভেন্ট পাওয়া যায়নি। একটি ভিন্ন অনুসন্ধান চেষ্টা করুন বা পরে আবার
          দেখুন!
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {events.map((event) => (
          <CtfEventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
