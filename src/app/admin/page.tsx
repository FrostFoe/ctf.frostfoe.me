/**
 * Admin Dashboard
 * Only accessible to users with admin role
 */

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser, useIsAdmin } from "@/lib/context/user-context";
import { logoutAction } from "@/lib/actions/auth";

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/");
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-white">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">অ্যাডমিন ড্যাশবোর্ড</h1>
          <p className="text-slate-400">সিস্টেম ব্যবস্থাপনা এবং নিয়ন্ত্রণ</p>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">ব্যবহারকারী তথ্য</h2>
          <div className="space-y-2 text-slate-300">
            <p>
              <span className="font-semibold">ইউজারনেম:</span> {user?.username}
            </p>
            <p>
              <span className="font-semibold">আইডি:</span> {user?.id}
            </p>
            <p>
              <span className="font-semibold">ভূমিকা:</span>{" "}
              <span className="text-lime-400 font-bold">{user?.role}</span>
            </p>
            <p>
              <span className="font-semibold">তৈরির সময়:</span>{" "}
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString("bn-BD")
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">সিস্টেম তথ্য</h2>
          <div className="space-y-2 text-slate-300">
            <p>
              <span className="font-semibold">প্ল্যাটফর্ম:</span> Next.js 16 +
              Supabase
            </p>
            <p>
              <span className="font-semibold">প্রমাণীকরণ:</span> কাস্টম (প্লেইনটেক্সট
              পাসওয়ার্ড)
            </p>
            <p>
              <span className="font-semibold">ডাটাবেস:</span> Supabase PostgreSQL
            </p>
            <p>
              <span className="font-semibold">সেশন:</span> HTTP-only কুকি
            </p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">দ্রুত ক্রিয়া</h2>
          <button
            onClick={() => logoutAction()}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            লগআউট করুন
          </button>
        </div>
      </div>
    </div>
  );
}
