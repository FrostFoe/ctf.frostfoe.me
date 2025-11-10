"use client";

// no runtime UI button needed here

interface CtfTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function CtfTabs({ activeTab, onTabChange }: CtfTabsProps) {
  const tabs = [
    { id: "ongoing", label: "চলমান" },
    { id: "upcoming", label: "আসন্ন" },
    { id: "joined", label: "যোগ দেওয়া হয়েছে" },
    { id: "past", label: "অতীত" },
  ];

  return (
    <div className="mt-6 sm:mt-8 border-b border-slate-700">
      <div className="flex gap-6 sm:gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-3 sm:pb-4 px-1 font-medium text-sm sm:text-base whitespace-nowrap transition-colors relative ${
              activeTab === tab.id
                ? "text-white"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
