"use client";

import ProductSettings from "./tabs/product-settings";
import UserSettings from "./tabs/user-settings";
import SecuritySettings from "./tabs/security-settings";
import CtfEvents from "./tabs/ctf-events";
import ChallengesTab from "./tabs/challenges";

export default function DashboardContent({ activeTab }: { activeTab: string }) {
  return (
    <div className="w-full min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        {activeTab === "product" && <ProductSettings />}
        {activeTab === "user" && <UserSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "ctf-events" && <CtfEvents />}
        {activeTab === "challenges" && <ChallengesTab />}
      </div>
    </div>
  );
}
