"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  Plus,
  User,
  MessageSquare,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CtfHeader from "@/components/ctf/ctf-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import data from "@/lib/db.json";

interface Team {
  id: number;
  name: string;
  description: string;
  avatar: string;
  members: number;
  maxMembers: number;
  ranking: number;
  totalPoints: number;
  createdDate: string;
  owner: string;
  ownerAvatar: string;
  status: "active" | "inactive";
  eventParticipations: number;
  challenges: number;
  isJoined: boolean;
}

export default function TeamsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const teams: Team[] = (data.teams || []).map((t: any, i: number) => ({
    id: t.id ?? i + 1,
    name: t.name ?? t.title ?? `Team ${i + 1}`,
    description: t.description ?? t.desc ?? "",
    avatar: t.avatar ?? t.imageUrl ?? (t.logo ? t.logo : "https://placehold.co/96x96.png"),
    members: t.members ?? t.membersCount ?? 0,
    maxMembers: t.maxMembers ?? t.teamSize ?? 5,
    ranking: t.ranking ?? 0,
    totalPoints: t.totalPoints ?? t.points ?? 0,
    createdDate: t.createdAt ?? t.createdDate ?? "",
    owner: t.owner ?? t.host ?? "",
    ownerAvatar: t.ownerAvatar ?? t.hostAvatar ?? "https://placehold.co/48x48.png",
    status: t.status ?? "active",
    eventParticipations: t.eventParticipations ?? 0,
    challenges: t.challenges ?? 0,
    isJoined: t.isJoined ?? false,
  }));

  const filteredTeams = teams.filter((team) => {
    const matchesSearch = team.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (activeTab === "my") return matchesSearch && team.isJoined;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <CtfHeader />

      <div className="container-centered">
        <Breadcrumb
          items={[
            { label: "হোম", href: "/" },
            { label: "সিটিএফ", href: "/ctf" },
            { label: "টিমস" },
          ]}
        />

        {/* Header Section */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                টিমস
              </h1>
              <p className="text-slate-400">
                সেরা দলগুলির সাথে যোগাযোগ করুন এবং একসাথে চ্যালেঞ্জ সমাধান করুন
              </p>
            </div>
            <Button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              টিম তৈরি করুন
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="টিম খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-lime-400 focus:outline-none text-sm sm:text-base"
            />
            <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-8 border-b border-slate-700 overflow-x-auto">
          {[
            { id: "all", label: "সব টিমস" },
            { id: "my", label: "আমার টিমস" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-lime-400 text-lime-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="group bg-slate-800/30 border border-slate-700 rounded-lg hover:border-slate-600 transition-all overflow-hidden"
            >
              {/* Team Header */}
              <div className="relative h-24 sm:h-32 bg-gradient-to-r from-slate-700 to-slate-800 overflow-hidden">
                {team.avatar ? (
                  <Image
                    src={team.avatar}
                    alt={team.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-600 flex items-center justify-center text-white text-2xl font-bold">
                    {team.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Team Content */}
              <div className="p-4 sm:p-6">
                {/* Team Info */}
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 -mt-6 sm:-mt-10 relative z-10">
                  {team.avatar ? (
                    <Image
                      src={team.avatar}
                      alt={team.name}
                      width={60}
                      height={60}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-4 border-slate-800"
                    />
                  ) : (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-4 border-slate-800 bg-slate-700 flex items-center justify-center">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">
                      {team.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {team.ownerAvatar ? (
                        <Image
                          src={team.ownerAvatar}
                          alt={team.owner}
                          width={20}
                          height={20}
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center">
                          <User className="w-3 h-3 text-slate-400" />
                        </div>
                      )}
                      <span className="text-xs sm:text-sm text-slate-400">
                        {team.owner}
                      </span>
                    </div>
                  </div>
                  {team.isJoined && (
                    <Badge className="bg-lime-400/20 text-lime-300 border border-lime-400/30 text-xs">
                      যোগ দেওয়া
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-2">
                  {team.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs">
                  <div className="bg-slate-900/50 rounded-lg p-2 sm:p-3">
                    <p className="text-slate-400 mb-1">সদস্য</p>
                    <p className="font-bold text-white">
                      {team.members}/{team.maxMembers}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-2 sm:p-3">
                    <p className="text-slate-400 mb-1">র‍্যাঙ্কিং</p>
                    <p className="font-bold text-white">#{team.ranking}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-2 sm:p-3">
                    <p className="text-slate-400 mb-1">পয়েন্ট</p>
                    <p className="font-bold text-lime-400">
                      {team.totalPoints}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-2 sm:p-3">
                    <p className="text-slate-400 mb-1">চ্যালেঞ্জ</p>
                    <p className="font-bold text-white">{team.challenges}</p>
                  </div>
                </div>

                {/* Member Avatars */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-xs text-slate-400 mb-2">সদস্যরা</p>
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(team.members, 5) }).map(
                      (_, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center"
                        >
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        </div>
                      ),
                    )}
                    {team.members > 5 && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                        +{team.members - 5}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3">
                  {team.isJoined ? (
                    <>
                      <Button className="flex-1 bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-xs sm:text-sm py-1.5 sm:py-2">
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        দেখুন
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-600 text-slate-400 hover:text-white text-xs sm:text-sm py-1.5 sm:py-2"
                      >
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="flex-1 bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-xs sm:text-sm py-1.5 sm:py-2">
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        যোগ দিন
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-600 text-slate-400 hover:text-white text-xs sm:text-sm py-1.5 sm:py-2"
                      >
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-400 hover:text-white text-xs sm:text-sm py-1.5 sm:py-2"
                  >
                    <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <Users className="w-16 h-16 sm:w-20 sm:h-20 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              কোন টিম পাওয়া যায়নি
            </h3>
            <p className="text-slate-400 mb-6">
              আপনার অনুসন্ধানের সাথে মেলে এমন কোন টিম নেই
            </p>
            <Button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold">
              <Plus className="w-4 h-4 mr-2" />
              নতুন টিম তৈরি করুন
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
