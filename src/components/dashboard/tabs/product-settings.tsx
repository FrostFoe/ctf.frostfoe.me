"use client";

import { ChevronRight } from "lucide-react";
import AcademyCard from "../cards/academy-card";
import LabCard from "../cards/lab-card";
import CTFCard from "../cards/ctf-card";
import EnterpriseCard from "../cards/enterprise-card";
import JobsCard from "../cards/jobs-card";

export default function ProductSettings() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Welcome frostfoe1,
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Access the Hack The Box multiverse and develop yourself as a
          cybersecurity professional.
        </p>
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <AcademyCard />
        <LabCard />
      </div>

      {/* Secondary Cards */}
      <div className="space-y-4">
        <CTFCard />
        <EnterpriseCard />
      </div>

      {/* Jobs Banner */}
      <JobsCard />
    </div>
  );
}
