"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, Grid3x3, User, LogOut } from "lucide-react";
import { useUser } from "@/lib/context/user-context";

export default function DashboardHeader() {
  const { user, logout, isGuest } = useUser();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  const userEmail = user?.email || "ব্যবহারকারী";
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-500 rounded-md flex items-center justify-center font-bold text-slate-950">
            🎮
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            এইচটিবি{" "}
            <span className="text-slate-400 font-normal">অ্যাকাউন্ট</span>
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="সাহায্য"
          >
            <HelpCircle className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
          </button>
          <button
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="অ্যাপস"
          >
            <Grid3x3 className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
              aria-label="প্রোফাইল"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-500 rounded-md flex items-center justify-center font-bold text-slate-950 text-sm">
                {userInitial}
              </div>
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm font-medium text-white">{userEmail}</p>
                  {isGuest && (
                    <p className="text-xs text-lime-400 mt-1">অতিথি ব্যবহারকারী</p>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-800 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  লগআউট করুন
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
