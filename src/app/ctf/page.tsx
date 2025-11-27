"use client";

import { useState } from "react";
import CtfHeader from "@/components/ctf/ctf-header";
import CtfTabs from "@/components/ctf/ctf-tabs";
import CtfSearch from "@/components/ctf/ctf-search";
import CtfEventGrid from "@/components/ctf/ctf-event-grid";
import CtfMainNav from "@/components/ctf/ctf-main-nav";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useCtfData } from "@/hooks/use-data";

export default function CtfPage() {
  const { events: allEvents } = useCtfData();
  const [activeTab, setActiveTab] = useState("ongoing");
  const [searchQuery, setSearchQuery] = useState("");

  const events = {
    ongoing: allEvents.filter((e) => e.status === "ongoing"),
    upcoming: allEvents.filter((e) => e.status === "upcoming"),
    joined: [] as typeof allEvents,
    past: allEvents.filter((e) => e.status === "ended"),
  };

  const filteredEvents = events[activeTab as keyof typeof events].filter(
    (event) => event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <CtfHeader />

      <div className="container-centered">
        <Breadcrumb
          items={[{ label: "হোম", href: "/" }, { label: "সিটিএফ ইভেন্টস" }]}
        />

        <div className="mt-6 sm:mt-8">
          <CtfMainNav _activeSection="events" />
        </div>

        <CtfTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <CtfSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <CtfEventGrid events={filteredEvents as any} />
      </div>
    </div>
  );
}
