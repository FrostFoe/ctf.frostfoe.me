"use client";

import { useState } from "react";
import CtfHeader from "@/components/ctf/ctf-header";
import CtfTabs from "@/components/ctf/ctf-tabs";
import CtfSearch from "@/components/ctf/ctf-search";
import CtfEventGrid from "@/components/ctf/ctf-event-grid";

export default function CtfPage() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [searchQuery, setSearchQuery] = useState("");

  const events = {
    ongoing: [
      {
        id: 1,
        title: "CTF ট্রাই আউট",
        subtitle: "CTF ট্রাই আউট",
        date: "01 Jan 2024, 18:00 - 31 Dec, 18:00",
        image:
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
        badge: "সরাসরি",
        tags: ["FEATURED"],
        players: 4818,
      },
      {
        id: 2,
        title: "MCP ট্রাইআউট",
        subtitle: "MCP ট্রাইআউট",
        date: "24 Jul 2025, 18:00 - 30 Dec, 15:00",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f5ae4e8cf11?w=500&h=300&fit=crop",
        badge: "সরাসরি",
        tags: ["FEATURED", "MCP-ONLY"],
        players: 109,
      },
      {
        id: 3,
        title: "পনবাক্স এক্সিবিশন CTF",
        subtitle: "ক্যাপচার দ্য ফ্ল্যাগ",
        date: "11 Apr 2025, 14:00 - 12 Dec, 16:00",
        image:
          "https://images.unsplash.com/photo-1550439062-609e7e7dfa6a?w=500&h=300&fit=crop",
        badge: "সরাসরি",
        tags: [],
        players: 12,
      },
      {
        id: 4,
        title: "৫ম ক্যাপচার দ্য ফ্ল্যাগ - গ্রুপো BAL",
        subtitle: "হ্যাকার",
        date: "07 Nov 2025, 22:00 - 15 Nov, 01:00",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f5ae4e8cf11?w=500&h=300&fit=crop",
        badge: "সরাসরি",
        tags: ["FEATURED"],
        players: 50,
      },
      {
        id: 5,
        title: "SDCC CTF ২০২৫",
        subtitle: "",
        date: "07 Nov 2025, 22:00 - 10 Nov, 10:30",
        image:
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
        badge: "সরাসরি",
        tags: [],
        players: 43,
      },
      {
        id: 6,
        title: "FEMA FY26 সাইবারসিকিউরিটি রেডিনেস এক্সারসাইজ",
        subtitle: "",
        date: "10 Nov 2025, 00:00 - 15 Nov, 00:00",
        image:
          "https://images.unsplash.com/photo-1526374965328-7f5ae4e8cf11?w=500&h=300&fit=crop",
        badge: "সরাসরি",
        tags: [],
        players: 12,
      },
    ],
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
        <CtfTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <CtfSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <CtfEventGrid events={filteredEvents} />
      </div>
    </div>
  );
}
