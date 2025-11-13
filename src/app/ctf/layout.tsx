"use client";

import { CTFSidebar } from "@/components/ctf/ctf-sidebar";
import type { ReactNode } from "react";
import { useState } from "react";

export default function CTFLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <CTFSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 transition-all duration-300 md:ml-64">
        {children}
      </main>
    </div>
  );
}
