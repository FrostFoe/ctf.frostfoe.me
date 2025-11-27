"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/context/user-context";
import {
  BarChart3,
  Users,
  Zap,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (isLoading) {
      // Wait for user context to load
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }

    // Redirect non-admin users
    if (user && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-lime-400 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-400 font-bold">আপনার এই পেজে এক্সেস নেই</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-lime-400 text-slate-900 rounded-lg font-bold hover:bg-lime-500 transition-colors"
          >
            ড্যাশবোর্ডে যান
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      name: "ড্যাশবোর্ড",
      href: "/admin",
      icon: BarChart3,
    },
    {
      name: "ইভেন্ট",
      href: "/admin/events",
      icon: Zap,
    },
    {
      name: "চ্যালেঞ্জ",
      href: "/admin/challenges",
      icon: BookOpen,
    },
    {
      name: "ইউজার",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "সেটিংস",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    // Clear user session and redirect
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-700 transition-all duration-300 z-40 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="h-16 border-b border-slate-700 flex items-center justify-between px-4">
          {isSidebarOpen && (
            <h1 className="font-bold text-lg text-lime-400">Admin Panel</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group"
              >
                <Icon size={20} className="flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-4 left-4 right-4 border-t border-slate-700 pt-4">
          {isSidebarOpen && (
            <div className="mb-4 text-xs">
              <p className="text-slate-400 mb-1">লগইনড ইউজার</p>
              <p className="text-white font-bold truncate">{user.username || user.id}</p>
              <p className="text-lime-400 text-xs font-semibold">অ্যাডমিন</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>লগ আউট</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <div className="h-16 border-b border-slate-700 bg-slate-900/50 backdrop-blur flex items-center px-6">
          <h2 className="text-white font-bold text-lg">CTF Admin Panel</h2>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
