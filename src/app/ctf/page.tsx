"use client";

import { useState } from "react";
import CtfHeader from "@/components/ctf/ctf-header";
import CtfTabs from "@/components/ctf/ctf-tabs";
import CtfSearch from "@/components/ctf/ctf-search";
import CtfEventGrid from "@/components/ctf/ctf-event-grid";
import CtfMainNav from "@/components/ctf/ctf-main-nav";
import ctfData from "@/data/ctf-data.json";

export default function CtfPage() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [searchQuery, setSearchQuery] = useState("");

  const events = {
    ongoing: ctfData.events,
    upcoming: [],
    joined: [],
    past: [],
  };

  const filteredEvents = events[activeTab as keyof typeof events].filter(
    (event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <CtfHeader />

      <div className="container-centered">
        <div className="mt-6 sm:mt-8">
          <CtfMainNav activeSection="events" />
        </div>

        <CtfTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <CtfSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <CtfEventGrid events={filteredEvents} />
      </div>
    </div>
  );
}
