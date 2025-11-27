"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import data from "@/lib/data.json";
import { ArrowLeft, Save, AlertCircle, Plus, Trash2 } from "lucide-react";

interface ChallengeData {
  id: number;
  title: string;
  category: string;
  description: string;
  difficulty: string;
  points: number;
  eventId: number;
  imageUrl?: string;
  hints?: string[];
  resources?: string[];
  flag?: string;
  dockerImage?: string;
  maxAttempts?: number;
  [key: string]: any;
}

interface Event {
  id: number;
  title: string;
}

export default function EditChallengePage() {
  const router = useRouter();
  const params = useParams();
  const challengeId = params.id as string;

  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<ChallengeData | null>(null);

  useEffect(() => {
    loadData();
  }, [challengeId]);

  const loadData = () => {
    try {
      setIsLoading(true);
      const challengeData = data.challenges.find(c => c.id === Number(challengeId));
      const eventsData = data.events;

      if (challengeData) {
        setChallenge(challengeData);
        setFormData(challengeData);
      }
      setEvents(eventsData || []);
    } catch (err) {
      console.error("Failed to load data:", err);
      setMessage("চ্যালেঞ্জ লোড করতে ব্যর্থ");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleHintAdd = () => {
    if (formData) {
      const hints = formData.hints || [];
      setFormData({
        ...formData,
        hints: [...hints, ""],
      });
    }
  };

  const handleHintChange = (index: number, value: string) => {
    if (formData && formData.hints) {
      const hints = [...formData.hints];
      hints[index] = value;
      setFormData({
        ...formData,
        hints,
      });
    }
  };

  const handleHintRemove = (index: number) => {
    if (formData && formData.hints) {
      const hints = formData.hints.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        hints,
      });
    }
  };

  const handleResourceAdd = () => {
    if (formData) {
      const resources = formData.resources || [];
      setFormData({
        ...formData,
        resources: [...resources, ""],
      });
    }
  };

  const handleResourceChange = (index: number, value: string) => {
    if (formData && formData.resources) {
      const resources = [...formData.resources];
      resources[index] = value;
      setFormData({
        ...formData,
        resources,
      });
    }
  };

  const handleResourceRemove = (index: number) => {
    if (formData && formData.resources) {
      const resources = formData.resources.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        resources,
      });
    }
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      setIsSaving(true);
      setMessage("");

      // Since this is static data, we just update the local state
      setMessage("✅ চ্যালেঞ্জ স্থানীয়ভাবে আপডেট হয়েছে (স্ট্যাটিক ডেটা - পরিবর্তন সংরক্ষিত হয়নি)");
      setChallenge(formData);

      setTimeout(() => {
        router.push("/admin/challenges");
      }, 1500);
    } catch (err: any) {
      console.error("Failed to save challenge:", err);
      setMessage(`❌ ${err.message || "চ্যালেঞ্জ সংরক্ষণ করতে ব্যর্থ"}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-lime-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center h-96 text-red-400">
        <p>চ্যালেঞ্জ পাওয়া যায়নি</p>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-white">চ্যালেঞ্জ এডিট করুন</h1>
          <p className="text-slate-400 mt-1">{formData.title}</p>
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
                শিরোনাম
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                ইভেন্ট
              </label>
              <select
                value={formData.eventId}
                onChange={(e) =>
                  handleChange("eventId", parseInt(e.target.value))
                }
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-lime-400"
              >
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
                placeholder="ওয়েব, ক্রিপ্টো, ইত্যাদি"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
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
                value={formData.maxAttempts || 999}
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ছবির URL
            </label>
            <input
              type="url"
              value={formData.imageUrl || ""}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
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

          {formData.hints && formData.hints.length > 0 ? (
            <div className="space-y-3">
              {formData.hints.map((hint, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={hint}
                    onChange={(e) => handleHintChange(index, e.target.value)}
                    placeholder={`ইঙ্গিত ${index + 1}`}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
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

          {formData.resources && formData.resources.length > 0 ? (
            <div className="space-y-3">
              {formData.resources.map((resource, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resource}
                    onChange={(e) => handleResourceChange(index, e.target.value)}
                    placeholder={`সম্পদ URL ${index + 1}`}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
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
              value={formData.flag || ""}
              onChange={(e) => handleChange("flag", e.target.value)}
              placeholder="flag{...}"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
            />
            <p className="text-slate-500 text-sm mt-2">
              আসল ফ্ল্যাগ এখানে রাখুন - এটি প্রকাশ্যে দৃশ্যমান হবে না
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Docker ইমেজ
            </label>
            <input
              type="text"
              value={formData.dockerImage || ""}
              onChange={(e) => handleChange("dockerImage", e.target.value)}
              placeholder="username/image:tag"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-lime-400"
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
            {isSaving ? "সংরক্ষণ করছি..." : "সংরক্ষণ করুন"}
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
