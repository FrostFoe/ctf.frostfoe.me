"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import data from "@/lib/data.json";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";

interface Event {
  id: number;
  title: string;
  slug: string;
  status: string;
  ctfType: string;
  totalChallenges?: number;
  startDate?: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      setEvents(data.events || []);
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    alert("Delete functionality removed as backend is static.");
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">ইভেন্ট ম্যানেজমেন্ট</h1>
          <p className="text-slate-400 mt-1">সকল CTF ইভেন্ট পরিচালনা করুন</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 px-4 py-2 bg-lime-400 text-slate-900 rounded-lg font-bold hover:bg-lime-500 transition-colors"
        >
          <Plus size={18} />
          নতুন ইভেন্ট
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="ইভেন্ট খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
        />
      </div>

      {/* Events Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-lime-400 rounded-full animate-spin"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400">
            <p className="text-xl mb-2">কোন ইভেন্ট নেই</p>
            <Link
              href="/admin/events/new"
              className="text-lime-400 hover:text-lime-300 underline"
            >
              নতুন ইভেন্ট তৈরি করুন
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    নাম
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    স্ট্যাটাস
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    টাইপ
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    চ্যালেঞ্জ
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-slate-700 hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">
                      {event.slug}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          event.status === "ongoing"
                            ? "bg-green-900/30 text-green-400"
                            : event.status === "upcoming"
                              ? "bg-blue-900/30 text-blue-400"
                              : "bg-red-900/30 text-red-400"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {event.ctfType || "jeopardy"}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {event.totalChallenges || 0}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="এডিট"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete()}
                        className="p-2 hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                        title="ডিলিট"
                      >
                        <Trash2 size={18} />
                      </button>
                      <Link
                        href={`/ctf/${event.slug}`}
                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="ভিউ"
                      >
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
