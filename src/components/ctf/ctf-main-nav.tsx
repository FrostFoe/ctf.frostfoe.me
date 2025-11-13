"use client";

import { usePathname } from "next/navigation";

interface CtfMainNavProps {
  _activeSection?: string;
}

export default function CtfMainNav({
  _activeSection = "events",
}: CtfMainNavProps) {
  const pathname = usePathname();

  const isEvents = pathname === "/ctf" || pathname.startsWith("/ctf/[");
  const isChallenges = pathname.includes("/challenges");
  const isLeaderboard = pathname.includes("/leaderboard");

  const navItems = [
    {
      id: "events",
      label: "সিটিএফ ইভেন্টস",
      href: "/ctf",
    },
    {
      id: "challenges",
      label: "চ্যালেঞ্জেস",
      href: "/ctf/challenges",
    },
    {
      id: "leaderboard",
      label: "লিডারবোর্ড",
      href: "/ctf/leaderboard",
    },
  ];

  return (
    <div className="border-b border-slate-700 ">
      <div className="flex gap-6 sm:gap-8 overflow-x-auto">
        {navItems.map((item) => {
          const isActive =
            (item.id === "events" && isEvents) ||
            (item.id === "challenges" && isChallenges) ||
            (item.id === "leaderboard" && isLeaderboard);

          return (
            <a
              key={item.id}
              href={item.href}
              className={`pb-3 sm:pb-4 px-1 font-medium text-sm sm:text-base whitespace-nowrap transition-colors relative ${
                isActive ? "text-white" : "text-slate-400 hover:text-slate-300"
              }`}
            >
              {item.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
