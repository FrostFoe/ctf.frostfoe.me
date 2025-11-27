/**
 * Admin Dashboard
 * Only accessible to users with admin role
 */

"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/user-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Users,
  BookOpen,
  Zap,
} from "lucide-react";
import data from "@/lib/data.json";

interface CTFEvent {
  id: number;
  title: string;
  slug: string;
  status: string;
  ctfType: string;
  totalChallenges?: number;
  playersCount?: number;
  startDate?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [events, setEvents] = useState<CTFEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalChallenges: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard");
      return;
    }
    loadDashboardData();
  }, [user, router]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Load events
      setEvents(data.events.slice(0, 5) || []);

      // Load actual stats
      const totalEvents = data.events.length;
      const activeEvents = data.events.filter(
        (e) => e.status === "ongoing"
      ).length;
      const totalChallenges = data.challenges.length;
      const totalUsers = data.users.length;

      setStats({
        totalEvents,
        activeEvents,
        totalChallenges,
        totalUsers,
      });
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-lime-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">অ্যাডমিন ড্যাশবোর্ড</h1>
          <p className="text-slate-400 mt-1">সিস্টেম পরিচালনা এবং মনিটরিং</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "মোট ইভেন্ট",
            value: stats.totalEvents,
            icon: Calendar,
            color: "bg-blue-900/20 text-blue-400",
          },
          {
            label: "সক্রিয় ইভেন্ট",
            value: stats.activeEvents,
            icon: Zap,
            color: "bg-green-900/20 text-green-400",
          },
          {
            label: "মোট চ্যালেঞ্জ",
            value: stats.totalChallenges,
            icon: BookOpen,
            color: "bg-purple-900/20 text-purple-400",
          },
          {
            label: "মোট ইউজার",
            value: stats.totalUsers,
            icon: Users,
            color: "bg-amber-900/20 text-amber-400",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Events */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">সম্প্রতি যুক্ত ইভেন্ট</h2>
          <Link
            href="/admin/events/new"
            className="flex items-center gap-2 px-4 py-2 bg-lime-400 text-slate-900 rounded-lg font-bold hover:bg-lime-500 transition-colors"
          >
            <Plus size={18} />
            নতুন ইভেন্ট
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                  নাম
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
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-slate-700 hover:bg-slate-900/30 transition-colors"
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {event.title}
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
                      onClick={() => {
                        // TODO: Implement delete with confirmation
                        console.log("Delete event:", event.id);
                      }}
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
      </div>
    </div>
  );
}
