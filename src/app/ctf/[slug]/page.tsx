"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CtfDetailHeader from "@/components/ctf/ctf-detail-header";
import CtfDetailInfo from "@/components/ctf/ctf-detail-info";
import CtfDetailAbout from "@/components/ctf/ctf-detail-about";
import CtfDetailSidebar from "@/components/ctf/ctf-detail-sidebar";
import CtfDetailFooter from "@/components/ctf/ctf-detail-footer";
import ctfEventsData from "@/data/ctf-events.json";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CtfDetailPage({ params }: PageProps) {
  const event = ctfEventsData.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <CtfDetailHeader event={event} />

      {/* Main Content */}
      <div className="container-centered py-8 sm:py-12">
        {/* Back Button */}
        <Link
          href="/ctf"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to Events</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CtfDetailInfo event={event} />
            <CtfDetailAbout event={event} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <CtfDetailSidebar event={event} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <CtfDetailFooter />
    </div>
  );
}
