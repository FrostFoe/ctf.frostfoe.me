"use client";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import DashboardContent from "@/components/dashboard/dashboard-content";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("product");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <DashboardHeader />
      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <DashboardContent activeTab={activeTab} />
    </div>
  );
}
