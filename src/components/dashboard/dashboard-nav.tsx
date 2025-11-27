"use client";

export default function DashboardNav({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const tabs = [
    { id: "product", label: "প্রোডাক্ট সেটিংস" },
    { id: "user", label: "ব্যবহারকারী সেটিংস" },
    { id: "security", label: "নিরাপত্তা সেটিংস" },
    { id: "ctf-events", label: "সিটিএফ ইভেন্টস" },
    { id: "challenges", label: "চ্যালেঞ্জেস" },
  ];

  return (
    <div className="w-full border-b border-slate-800 bg-slate-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-0">
        <div className="flex gap-8 sm:gap-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-0 py-4 text-sm font-medium transition-all relative group ${
                activeTab === tab.id
                  ? "text-slate-100"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-lime-400 to-lime-500" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
