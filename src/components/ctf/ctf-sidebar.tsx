"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Trophy,
  Zap,
  Users,
  User,
  Settings,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "হোম", href: "/" },
  { icon: Trophy, label: "ইভেন্টস", href: "/ctf" },
  { icon: Zap, label: "চ্যালেঞ্জ", href: "/ctf/challenges" },
  { icon: Trophy, label: "লিডারবোর্ড", href: "/ctf/leaderboard" },
  { icon: Users, label: "টিমস", href: "/ctf/teams" },
  { icon: User, label: "প্রোফাইল", href: "/ctf/profile" },
  { icon: Settings, label: "সেটিংস", href: "/ctf/settings" },
];

interface CTFSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function CTFSidebar({ isOpen, toggleSidebar }: CTFSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 z-40 md:hidden p-3 bg-lime-400 text-slate-900 rounded-full shadow-lg hover:bg-lime-500 transition-colors"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-lime-400">
            সিটিএফ প্ল্যাটফর্ম
          </h1>
          <p className="text-xs text-slate-400 mt-1">নিরাপত্তা চ্যালেঞ্জ</p>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-lime-400/20 text-lime-400 border border-lime-400/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-800/30">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">সমাধান করা</span>
              <span className="text-lime-400 font-bold">12/25</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">র‍্যাঙ্ক</span>
              <span className="text-lime-400 font-.bold">#42</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
