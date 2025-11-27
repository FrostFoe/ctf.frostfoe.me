"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import data from "@/lib/data.json";
import { Plus, Edit2, Trash2, Eye, ChevronDown } from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  points: number;
  eventId: number;
  [key: string]: any;
}

interface Event {
  id: number;
  title: string;
  slug: string;
  [key: string]: any;
}

export default function AdminChallengesPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setEvents(data.events || []);
      setChallenges(data.challenges || []);
      if (data.events && data.events.length > 0) {
        setSelectedEventId(data.events[0].id);
      }
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    alert("Delete functionality removed as backend is static.");
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEvent =
      selectedEventId === null || challenge.eventId === selectedEventId;
    return matchesSearch && matchesEvent;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "সহজ":
        return "bg-green-900/30 text-green-400";
      case "মধ্যম":
      case "মাঝারি":
        return "bg-yellow-900/30 text-yellow-400";
      case "কঠিন":
      case "মাঝারি থেকে কঠিন":
        return "bg-orange-900/30 text-orange-400";
      case "অসম্ভব":
        return "bg-red-900/30 text-red-400";
      default:
        return "bg-slate-700/30 text-slate-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">চ্যালেঞ্জ ম্যানেজমেন্ট</h1>
          <p className="text-slate-400 mt-1">সকল চ্যালেঞ্জ পরিচালনা করুন</p>
        </div>
        <Link
          href="/admin/challenges/new"
          className="flex items-center gap-2 px-4 py-2 bg-lime-400 text-slate-900 rounded-lg font-bold hover:bg-lime-500 transition-colors"
        >
          <Plus size={18} />
          নতুন চ্যালেঞ্জ
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1">
          <input
            type="text"
            placeholder="চ্যালেঞ্জ খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>
        <div className="relative">
          <select
            value={selectedEventId || ""}
            onChange={(e) =>
              setSelectedEventId(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full md:w-48 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-lime-400 appearance-none pr-10"
          >
            <option value="">সকল ইভেন্ট</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-3.5 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Challenges Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-lime-400 rounded-full animate-spin"></div>
          </div>
        ) : filteredChallenges.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400">
            <p className="text-xl mb-2">কোন চ্যালেঞ্জ নেই</p>
            <Link
              href="/admin/challenges/new"
              className="text-lime-400 hover:text-lime-300 underline"
            >
              নতুন চ্যালেঞ্জ তৈরি করুন
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
                    ক্যাটাগরি
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    অসুবিধা
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    পয়েন্ট
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    ইভেন্ট
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredChallenges.map((challenge) => {
                  const event = events.find((e) => e.id === challenge.eventId);
                  return (
                    <tr
                      key={challenge.id}
                      className="border-b border-slate-700 hover:bg-slate-900/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        {challenge.title}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {challenge.category}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded text-xs font-bold ${getDifficultyColor(challenge.difficulty)}`}
                        >
                          {challenge.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {challenge.points}
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {event?.title}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <Link
                          href={`/admin/challenges/${challenge.id}`}
                          className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                          title="এডিট"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(challenge.id)}
                          className="p-2 hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                          title="ডিলিট"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
