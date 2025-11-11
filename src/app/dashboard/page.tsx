"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import DashboardContent from "@/components/dashboard/dashboard-content";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("product");
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
      } else if (data.user.is_anonymous) {
        setIsGuest(true);
      }
      setLoading(false);
    };

    void getUser();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
        <p className="text-white">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {isGuest && (
        <div className="bg-blue-600/20 border-b border-blue-500/50 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-blue-200 text-sm">
              আপনি অতিথি হিসেবে ব্যবহার করছেন। সম্পূর্ণ বৈশিষ্ট্য আনলক করতে{" "}
              <Link href="/login" className="font-bold hover:underline">
                লগইন করুন
              </Link>{" "}
              বা{" "}
              <Link href="/signup" className="font-bold hover:underline">
                অ্যাকাউন্ট তৈরি করুন
              </Link>
            </p>
          </div>
        </div>
      )}
      <DashboardHeader />
      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <DashboardContent activeTab={activeTab} />
    </div>
  );
}
