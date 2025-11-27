"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import data from "@/lib/data.json";
import { ArrowLeft, Save, AlertCircle, Plus, Trash2 } from "lucide-react";

interface Event {
  id: number;
  title: string;
}

interface ChallengeData {
  title: string;
  category: string;
  description: string;
  difficulty: string;
  points: number;
  eventId: number;
  imageUrl: string;
  hints: string[];
  resources: string[];
  flag: string;
  dockerImage: string;
  maxAttempts: number;
}

const initialFormData: ChallengeData = {
  title: "",
  category: "",
  description: "",
  difficulty: "মধ্যম",
  points: 100,
  eventId: 0,
  imageUrl: "",
  hints: [],
  resources: [],
  flag: "",
  dockerImage: "",
  maxAttempts: 999,
};

export default function NewChallengePage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState<ChallengeData>(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadEvents = useCallback(() => {
    try {
      const eventsData = data.events;
      setEvents(eventsData || []);
      if (eventsData && eventsData.length > 0) {
        setFormData((prev) => ({
          ...prev,
          eventId: eventsData[0].id,
        }));
      }
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleHintAdd = () => {
    setFormData({
      ...formData,
      hints: [...formData.hints, ""],
    });
  };

  const handleHintChange = (index: number, value: string) => {
    const hints = [...formData.hints];
    hints[index] = value;
    setFormData({
      ...formData,
      hints,
    });
  };

  const handleHintRemove = (index: number) => {
    const hints = formData.hints.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      hints,
    });
  };

  const handleResourceAdd = () => {
    setFormData({
      ...formData,
      resources: [...formData.resources, ""],
    });
  };

  const handleResourceChange = (index: number, value: string) => {
    const resources = [...formData.resources];
    resources[index] = value;
    setFormData({
      ...formData,
      resources,
    });
  };

  const handleResourceRemove = (index: number) => {
    const resources = formData.resources.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      resources,
    });
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

      if (formData.eventId === 0) {
        setMessage("❌ একটি ইভেন্ট নির্বাচন করুন");
        setIsSaving(false);
        return;
      }

      // Since this is static data, we just show a message
      setMessage("✅ চ্যালেঞ্জ স্থানীয়ভাবে তৈরি হয়েছে (স্ট্যাটিক ডেটা - পরিবর্তন সংরক্ষিত হয়নি)");

      setTimeout(() => {
        router.push("/admin/challenges");
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "চ্যালেঞ্জ তৈরি করতে ব্যর্থ";
      console.error("Failed to create challenge:", err);
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
          <h1 className="text-3xl font-bold text-white">নতুন চ্যালেঞ্জ তৈরি করুন</h1>
          <p className="text-slate-400 mt-1">একটি নতুন চ্যালেঞ্জ যোগ করুন</p>
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
                placeholder="চ্যালেঞ্জের নাম"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ইভেন্ট *
              </label>
              <select
                value={formData.eventId}
                onChange={(e) =>
                  handleChange("eventId", parseInt(e.target.value))
                }
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-lime-400"
              >
                <option value="0">একটি ইভেন্ট নির্বাচন করুন</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ক্যাটাগরি
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                placeholder="ওয়েব, ক্রিপ্টো, বিন্যাস"
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
                পয়েন্ট
              </label>
              <input
                type="number"
                min="0"
                value={formData.points}
                onChange={(e) => handleChange("points", parseInt(e.target.value))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                সর্বোচ্চ প্রচেষ্টা
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxAttempts}
                onChange={(e) =>
                  handleChange("maxAttempts", parseInt(e.target.value))
                }
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
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
              placeholder="চ্যালেঞ্জের বিবরণ"
            />
          </div>

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
        </div>

        {/* Hints */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">ইঙ্গিত</h2>
            <button
              onClick={handleHintAdd}
              className="flex items-center gap-2 px-3 py-2 bg-lime-400 text-slate-900 rounded-lg font-bold hover:bg-lime-500 transition-colors text-sm"
            >
              <Plus size={16} />
              যোগ করুন
            </button>
          </div>

          {formData.hints.length > 0 ? (
            <div className="space-y-3">
              {formData.hints.map((hint, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={hint}
                    onChange={(e) => handleHintChange(index, e.target.value)}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                    placeholder={`ইঙ্গিত ${index + 1}`}
                  />
                  <button
                    onClick={() => handleHintRemove(index)}
                    className="p-2 hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">কোন ইঙ্গিত নেই</p>
          )}
        </div>

        {/* Resources */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">সংস্থানসমূহ</h2>
            <button
              onClick={handleResourceAdd}
              className="flex items-center gap-2 px-3 py-2 bg-lime-400 text-slate-900 rounded-lg font-bold hover:bg-lime-500 transition-colors text-sm"
            >
              <Plus size={16} />
              যোগ করুন
            </button>
          </div>

          {formData.resources.length > 0 ? (
            <div className="space-y-3">
              {formData.resources.map((resource, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resource}
                    onChange={(e) => handleResourceChange(index, e.target.value)}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
                    placeholder={`সম্পদ URL ${index + 1}`}
                  />
                  <button
                    onClick={() => handleResourceRemove(index)}
                    className="p-2 hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">কোন সম্পদ নেই</p>
          )}
        </div>

        {/* Flag & Docker */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">উন্নত সেটিংস</h2>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ফ্ল্যাগ
            </label>
            <input
              type="text"
              value={formData.flag}
              onChange={(e) => handleChange("flag", e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              placeholder="flag{...}"
            />
            <p className="text-slate-500 text-sm mt-2">
              আসল ফ্ল্যাগ এখানে রাখুন
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Docker ইমেজ
            </label>
            <input
              type="text"
              value={formData.dockerImage}
              onChange={(e) => handleChange("dockerImage", e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              placeholder="username/image:tag"
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
