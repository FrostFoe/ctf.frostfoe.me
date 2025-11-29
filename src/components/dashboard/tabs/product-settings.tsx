"use client";

// ChevronRight not used
import { useUser } from "@/hooks/user-context";
import AcademyCard from "../cards/academy-card";
import LabCard from "../cards/lab-card";
import CTFCard from "../cards/ctf-card";
import EnterpriseCard from "../cards/enterprise-card";
import JobsCard from "../cards/jobs-card";

export default function ProductSettings() {
  const { user, isLoading } = useUser();
  const username = user?.username ?? "ব্যবহারকারী";
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          {isLoading ? "লোড হচ্ছে..." : `স্বাগতম ${username},`}
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          হ্যাক দ্য বক্স মাল্টিভার্স অ্যাক্সেস করুন এবং একজন সাইবারসিকিউরিটি
          পেশাদার হিসাবে নিজেকে বিকাশ করুন।
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
