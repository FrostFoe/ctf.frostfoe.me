"use client";

import { useEffect, useState, useCallback } from "react";
import { Clock } from "lucide-react";

interface CountdownProps {
  targetDate: string; // Format: "DD Mon YYYY HH:mm GMT"
  isUpcoming: boolean;
}

export function Countdown({ targetDate, isUpcoming }: CountdownProps) {
  const parseDate = (dateStr: string) => {
    return new Date(dateStr);
  };

  const calculateTimeLeft = useCallback(() => {
    const target = parseDate(targetDate);
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      return "শুরু হয়েছে";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<string>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  if (!isUpcoming) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-blue-300 bg-blue-900/20 border border-blue-800/50 rounded px-2 sm:px-3 py-1 sm:py-1.5 whitespace-nowrap">
      <Clock size={14} className="shrink-0" />
      <span className="truncate">{timeLeft}</span>
    </div>
  );
}
