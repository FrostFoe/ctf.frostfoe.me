import { useState } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, Grid3x3, LogOut } from "lucide-react";
import { useUser } from "@/hooks/user-context";

export default function DashboardHeader() {
  const { user } = useUser();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
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
      setIsLoggingOut(false);
    }
  };

  const userDisplay = user?.username ?? "ব্যবহারকারী";
  const userInitial = userDisplay.charAt(0).toUpperCase();

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/50 backdrop-blur-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-lime-400 to-lime-500 rounded-md flex items-center justify-center font-bold text-slate-950">
            🎮
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            এইচটিবি{" "}
            <span className="text-slate-400 font-normal">অ্যাকাউন্ট</span>
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="সাহায্য"
          >
            <HelpCircle className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
          </button>
          <button
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="অ্যাপস"
          >
            <Grid3x3 className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
              aria-label="প্রোফাইল"
            >
              <div className="w-8 h-8 bg-linear-to-br from-lime-400 to-lime-500 rounded-md flex items-center justify-center font-bold text-slate-950 text-sm">
                {userInitial}
              </div>
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-slate-700">
                  <p className="text-sm font-medium text-white">{userDisplay}</p>
                </div>

                <button
                  onClick={() => void handleLogout()}
                  disabled={isLoggingOut}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-800 flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {isLoggingOut ? "লগআউট হচ্ছে..." : "লগআউট করুন"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
