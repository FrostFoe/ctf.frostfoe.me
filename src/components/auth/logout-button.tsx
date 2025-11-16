/**
 * Logout Button Component
 */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function LogoutButton({
  className = "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
  children = "লগআউট",
}: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        await new Promise(resolve => setTimeout(resolve, 100));
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} className={className} disabled={isLoading}>
      {isLoading ? "লগআউট হচ্ছে..." : children}
    </button>
  );
}
