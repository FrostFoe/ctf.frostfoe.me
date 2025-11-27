"use client";

type EventStatus = "upcoming" | "ongoing" | "ended" | "registration-closed";

interface EventStatusBadgeProps {
  status: EventStatus;
}

const statusConfig: Record<
  EventStatus,
  { label: string; bgColor: string; textColor: string }
> = {
  upcoming: {
    label: "শীঘ্রই আসছে",
    bgColor: "bg-blue-900/30",
    textColor: "text-blue-300",
  },
  ongoing: {
    label: "চলমান",
    bgColor: "bg-lime-900/30",
    textColor: "text-lime-300",
  },
  "registration-closed": {
    label: "নিবন্ধন বন্ধ",
    bgColor: "bg-orange-900/30",
    textColor: "text-orange-300",
  },
  ended: {
    label: "শেষ হয়েছে",
    bgColor: "bg-slate-800/50",
    textColor: "text-slate-400",
  },
};

export function EventStatusBadge({ status }: EventStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}
    >
      {config.label}
    </span>
  );
}
