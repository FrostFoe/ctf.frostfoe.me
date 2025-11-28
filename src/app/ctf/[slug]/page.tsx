import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CtfDetailHeader from "@/components/ctf/ctf-detail-header";
import CtfDetailInfo from "@/components/ctf/ctf-detail-info";
import CtfDetailAbout from "@/components/ctf/ctf-detail-about";
import CtfDetailSidebar from "@/components/ctf/ctf-detail-sidebar";
import CtfDetailFooter from "@/components/ctf/ctf-detail-footer";
import CtfSeriesChallenges from "@/components/ctf/ctf-series-challenges";
import data from "@/lib/db.json";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CtfDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const events = data.events;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  // Get challenges for this event
  const challenges = data.challenges.filter((c) => c.eventId === event.id);
  const seriesChallenges =
    (event.ctfType === "series")
      ? challenges
      : [];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <CtfDetailHeader event={event} />

      {/* Main Content */}
      <div className="container-centered py-6 sm:py-8 md:py-10 lg:py-12">
        {/* Back Button */}
        <Link
          href="/ctf"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <CtfDetailInfo event={event} />

            {/* Series Challenges Section */}
            {(event.ctfType === "series") && seriesChallenges.length > 0 && (
              <CtfSeriesChallenges
                challenges={seriesChallenges}
                totalChallenges={event.totalChallenges || 0}
                completedChallenges={0}
              />
            )}

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
