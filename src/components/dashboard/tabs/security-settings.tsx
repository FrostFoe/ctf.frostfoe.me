"use client";

import { Lock, Smartphone } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Security Settings
        </h2>
        <p className="text-slate-400">
          Keep your account secure with these advanced settings.
        </p>
      </div>

      {/* Password Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-lime-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">Password</h3>
            <p className="text-sm text-slate-400 mb-4">
              Update your password regularly to keep your account secure.
            </p>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* 2FA Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Smartphone className="w-5 h-5 text-lime-400 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              Two-Factor Authentication
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Add an extra layer of security to your account with 2FA.
            </p>
            <button className="px-4 py-2 bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold rounded-lg transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Active Sessions</h3>
        <div className="space-y-2 text-sm text-slate-400">
          <div className="flex justify-between items-center py-2 border-b border-slate-700">
            <span>Current Device</span>
            <span className="text-lime-400">Active</span>
          </div>
          <button className="text-sm text-red-400 hover:text-red-300 font-medium mt-4">
            Sign Out All Other Sessions
          </button>
        </div>
      </div>
    </div>
  );
}
