"use client";

import { useState } from "react";
import CtfEventGrid from "@/components/ctf/ctf-event-grid";
import CtfTabs from "@/components/ctf/ctf-tabs";
import CtfSearch from "@/components/ctf/ctf-search";
import { useCtfData } from "@/hooks/use-data";

export default function CtfEvents() {
  const { events: allEvents } = useCtfData();
  const [activeTab, setActiveTab] = useState("ongoing");
  const [searchQuery, setSearchQuery] = useState("");

  const events = {
    ongoing: allEvents.filter((e) => e.status === "ongoing"),
    upcoming: allEvents.filter((e) => e.status === "upcoming"),
    joined: [],
    past: allEvents.filter((e) => e.status === "ended"),
  };

  const filteredEvents = events[activeTab as keyof typeof events].filter(
    (event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">সিটিএফ ইভেন্টস</h2>
        <p className="text-slate-400">
          সিটিএফ প্রতিযোগিতায় অংশগ্রহণ করুন এবং আপনার দক্ষতা পরীক্ষা করুন
        </p>
      </div>

      <CtfTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <CtfSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <CtfEventGrid events={filteredEvents} />
    </div>
  );
}
