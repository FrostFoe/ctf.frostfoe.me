"use client";

import CtfEventCard from "./ctf-event-card";

interface Event {
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

interface CtfEventGridProps {
  events: Event[];
}

export default function CtfEventGrid({ events }: CtfEventGridProps) {
  if (events.length === 0) {
    return (
      <div className="py-8 sm:py-10 md:py-12 text-center md:ml-4 md:mr-4">
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg px-4">
          কোন ইভেন্ট পাওয়া যায়নি। একটি ভিন্ন অনুসন্ধান চেষ্টা করুন বা পরে আবার
          দেখুন!
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8 md:py-10 lg:py-12 w-full md:ml-4 md:mr-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {events.map((event) => (
          <CtfEventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
