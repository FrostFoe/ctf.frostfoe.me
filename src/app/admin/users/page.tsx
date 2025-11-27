"use client";

import { useEffect, useState } from "react";
import { Trash2, Shield, User } from "lucide-react";

interface UserProfile {
  id: number;
  username: string;
  email?: string;
  bio?: string;
  role: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/users");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ব্যবহারকারী লোড করতে ব্যর্থ");
      }

      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("আপনি কি এই ব্যবহারকারী ডিলিট করতে চান?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ব্যবহারকারী ডিলিট করতে ব্যর্থ");
      }

      setUsers(users.filter((u) => u.id !== id));
      alert("ব্যবহারকারী সফলভাবে ডিলিট হয়েছে");
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert(
        err instanceof Error ? err.message : "ব্যবহারকারী ডিলিট করতে ব্যর্থ"
      );
    }
  };

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "ভূমিকা আপডেট করতে ব্যর্থ");
      }

      setUsers(
        users.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      alert("ভূমিকা আপডেট হয়েছে");
    } catch (err) {
      console.error("Failed to update role:", err);
      alert(
        err instanceof Error ? err.message : "ভূমিকা আপডেট করতে ব্যর্থ"
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-900/30 text-red-400";
      case "organizer":
        return "bg-blue-900/30 text-blue-400";
      case "user":
      default:
        return "bg-slate-700/30 text-slate-300";
    }
  };

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    organizers: users.filter((u) => u.role === "organizer").length,
    regular: users.filter((u) => u.role === "user").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">ব্যবহারকারী ম্যানেজমেন্ট</h1>
        <p className="text-slate-400 mt-1">সকল ব্যবহারকারী পরিচালনা করুন</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">মোট ব্যবহারকারী</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
            </div>
            <User size={32} className="text-lime-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">প্রশাসক</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.admins}</p>
            </div>
            <Shield size={32} className="text-red-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">আয়োজক</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.organizers}</p>
            </div>
            <Shield size={32} className="text-blue-400" />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">সাধারণ ব্যবহারকারী</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.regular}</p>
            </div>
            <User size={32} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1">
          <input
            type="text"
            placeholder="ব্যবহারকারী খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full md:w-48 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-lime-400"
        >
          <option value="">সকল ভূমিকা</option>
          <option value="admin">প্রশাসক</option>
          <option value="organizer">আয়োজক</option>
          <option value="user">সাধারণ ব্যবহারকারী</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-lime-400 rounded-full animate-spin"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex items-center justify-center h-96 text-slate-400">
            <p className="text-xl">কোন ব্যবহারকারী পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    ব্যবহারকারীনাম
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    ইমেইল
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    ভূমিকা
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    যোগদান তারিখ
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">
                    অ্যাকশন
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-700 hover:bg-slate-900/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {user.email || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded text-xs font-bold border-0 focus:outline-none cursor-pointer ${getRoleBadgeColor(user.role)}`}
                      >
                        <option value="user">সাধারণ ব্যবহারকারী</option>
                        <option value="organizer">আয়োজক</option>
                        <option value="admin">প্রশাসক</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">
                      {new Date(user.created_at).toLocaleDateString("bn-BD")}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                        title="ডিলিট"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
