"use client";

export default function UserSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">User Settings</h2>
        <p className="text-slate-400">
          Manage your user preferences and account information.
        </p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition-colors"
            placeholder="username"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Display Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-lime-400 transition-colors"
            placeholder="Display Name"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button className="px-6 py-2 bg-lime-400 hover:bg-lime-500 text-slate-950 font-bold rounded-lg transition-colors">
            Save Changes
          </button>
          <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
