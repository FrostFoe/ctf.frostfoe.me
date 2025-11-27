"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

interface EventData {
  title: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  ctfType: string;
  difficulty: string;
  skillLevel: string;
  location: string;
  format: string;
  hostedBy: string;
  teamSize: number;
  tags: string[];
  imageUrl: string;
  registrationUrl: string;
}

const initialFormData: EventData = {
  title: "",
  slug: "",
  description: "",
  startDate: "",
  endDate: "",
  ctfType: "jeopardy",
  difficulty: "মধ্যম",
  skillLevel: "মধ্যম",
  location: "",
  format: "অনলাইন",
  hostedBy: "",
  teamSize: 5,
  tags: [],
  imageUrl: "",
  registrationUrl: "",
};

export default function NewEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<EventData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (field: string, value: string | number | string[]) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(",").map((tag) => tag.trim());
    handleChange("tags", tags);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage("");

      if (!formData.title.trim()) {
        setMessage("❌ শিরোনাম প্রয়োজন");
        setIsSaving(false);
        return;
      }

      // Since this is static data, we just show a message
      setMessage("✅ ইভেন্ট স্থানীয়ভাবে তৈরি হয়েছে (স্ট্যাটিক ডেটা - পরিবর্তন সংরক্ষিত হয়নি)");

      setTimeout(() => {
        router.push("/admin/events");
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "ইভেন্ট তৈরি করতে ব্যর্থ";
      console.error("Failed to create event:", err);
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">নতুন ইভেন্ট তৈরি করুন</h1>
          <p className="text-slate-400 mt-1">একটি নতুন CTF ইভেন্ট যোগ করুন</p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`flex items-center gap-3 px-6 py-4 rounded-lg border ${
            message.includes("✅")
              ? "bg-green-900/30 border-green-700 text-green-400"
              : "bg-red-900/30 border-red-700 text-red-400"
          }`}
        >
          <AlertCircle size={20} />
          <p>{message}</p>
        </div>
      )}

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Basic Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">মৌলিক তথ্য</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                শিরোনাম *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                placeholder="ইভেন্টের নাম"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                স্লাগ
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                placeholder="event-slug"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              বর্ণনা
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={5}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              placeholder="ইভেন্টের বিবরণ"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                শুরু তারিখ
              </label>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                শেষ তারিখ
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              />
            </div>
          </div>
        </div>

        {/* CTF Details */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">CTF বিবরণ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ধরন
              </label>
              <select
                value={formData.ctfType}
                onChange={(e) => handleChange("ctfType", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-lime-400"
              >
                <option value="jeopardy">Jeopardy</option>
                <option value="series">Series</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ফরম্যাট
              </label>
              <input
                type="text"
                value={formData.format}
                onChange={(e) => handleChange("format", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                placeholder="অনলাইন, অফলাইন"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                অসুবিধা
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleChange("difficulty", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-lime-400"
              >
                <option value="সহজ">সহজ</option>
                <option value="মধ্যম">মধ্যম</option>
                <option value="কঠিন">কঠিন</option>
                <option value="অসম্ভব">অসম্ভব</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                দক্ষতা স্তর
              </label>
              <input
                type="text"
                value={formData.skillLevel}
                onChange={(e) => handleChange("skillLevel", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                placeholder="শিক্ষানবিস, মধ্যম, অগ্রসর"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                অবস্থান
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                placeholder="শহর, দেশ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                আয়োজক
              </label>
              <input
                type="text"
                value={formData.hostedBy}
                onChange={(e) => handleChange("hostedBy", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                placeholder="আয়োজক নাম"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                সর্বোচ্চ টিম সদস্য
              </label>
              <input
                type="number"
                value={formData.teamSize}
                onChange={(e) => handleChange("teamSize", parseInt(e.target.value))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ট্যাগ (কমা দিয়ে পৃথক করুন)
            </label>
            <input
              type="text"
              value={formData.tags.join(", ")}
              onChange={(e) => handleTagsChange(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              placeholder="ট্যাগ1, ট্যাগ2"
            />
          </div>
        </div>

        {/* URLs */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">লিংক এবং মিডিয়া</h2>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ছবির URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              রেজিস্ট্রেশন URL
            </label>
            <input
              type="url"
              value={formData.registrationUrl}
              onChange={(e) => handleChange("registrationUrl", e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-lime-400 text-slate-900 rounded-lg font-bold hover:bg-lime-500 disabled:opacity-50 transition-colors"
          >
            <Save size={18} />
            {isSaving ? "তৈরি করছি..." : "তৈরি করুন"}
          </button>

          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-slate-700 text-white rounded-lg font-bold hover:bg-slate-600 transition-colors"
          >
            বাতিল করুন
          </button>
        </div>
      </form>
    </div>
  );
}
