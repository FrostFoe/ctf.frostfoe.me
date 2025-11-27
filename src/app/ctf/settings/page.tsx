"use client";

import { useState } from "react";
import { Bell, Shield, Lock, Palette, Globe, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CtfHeader from "@/components/ctf/ctf-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface SettingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    darkMode: true,
    language: "bengali",
    privacy: "friends",
    twoFactorEnabled: false,
  });

  const sections: SettingSection[] = [
    {
      id: "account",
      title: "অ্যাকাউন্ট",
      icon: <Shield className="w-5 h-5" />,
      description: "প্রোফাইল এবং অ্যাকাউন্ট সেটিংস",
    },
    {
      id: "notifications",
      title: "বিজ্ঞপ্তি",
      icon: <Bell className="w-5 h-5" />,
      description: "আপনার বিজ্ঞপ্তি পছন্দ পরিচালনা করুন",
    },
    {
      id: "privacy",
      title: "গোপনীয়তা ও নিরাপত্তা",
      icon: <Lock className="w-5 h-5" />,
      description: "গোপনীয়তা এবং নিরাপত্তা নিয়ন্ত্রণ",
    },
    {
      id: "appearance",
      title: "চেহারা",
      icon: <Palette className="w-5 h-5" />,
      description: "থিম এবং প্রদর্শন সেটিংস",
    },
    {
      id: "language",
      title: "ভাষা ও অঞ্চল",
      icon: <Globe className="w-5 h-5" />,
      description: "ভাষা এবং আঞ্চলিক পছন্দ",
    },
  ];

  const toggleSetting = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key as keyof typeof prev]: !prev[key as keyof typeof prev],
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <CtfHeader />

      <div className="container-centered">
        <Breadcrumb
          items={[
            { label: "হোম", href: "/" },
            { label: "সিটিএফ", href: "/ctf" },
            { label: "সেটিংস" },
          ]}
        />

        <div className="mt-6 sm:mt-8 mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            সেটিংস
          </h1>
          <p className="text-slate-400">
            আপনার অ্যাকাউন্ট এবং পছন্দ পরিচালনা করুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 sm:py-4 rounded-lg transition-all ${
                    activeSection === section.id
                      ? "bg-lime-400/20 border border-lime-400/30 text-lime-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <span className="font-medium text-sm sm:text-base">
                      {section.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            {/* Account Settings */}
            {activeSection === "account" && (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                    অ্যাকাউন্ট সেটিংস
                  </h2>

                  <div className="space-y-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        ইমেইল
                      </label>
                      <input
                        type="email"
                        value="user@example.com"
                        disabled
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-400"
                      />
                      <p className="text-xs text-slate-500 mt-2">
                        আপনার ইমেইল পরিবর্তন করতে সাপোর্টে যোগাযোগ করুন
                      </p>
                    </div>

                    {/* Username */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        ব্যবহারকারীর নাম
                      </label>
                      <input
                        type="text"
                        value="security_hacker"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        পাসওয়ার্ড
                      </label>
                      <Button
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:text-white w-full sm:w-auto"
                      >
                        পাসওয়ার্ড পরিবর্তন করুন
                      </Button>
                    </div>

                    {/* Two Factor Authentication */}
                    <div className="border-t border-slate-700 pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-white mb-1">
                            দুই-ফ্যাক্টর প্রমাণীকরণ
                          </h3>
                          <p className="text-sm text-slate-400">
                            আপনার অ্যাকাউন্টে অতিরিক্ত নিরাপত্তা স্তর যোগ করুন
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:text-white"
                        >
                          {settings.twoFactorEnabled
                            ? "অক্ষম করুন"
                            : "সক্ষম করুন"}
                        </Button>
                      </div>
                    </div>

                    {/* Delete Account */}
                    <div className="border-t border-slate-700 pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-red-400 mb-1">
                            অ্যাকাউন্ট মুছে ফেলুন
                          </h3>
                          <p className="text-sm text-slate-400">
                            স্থায়ীভাবে আপনার অ্যাকাউন্ট এবং সমস্ত ডেটা মুছে
                            ফেলুন
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-red-600 text-red-400 hover:text-red-300 hover:bg-red-950"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          মুছুন
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === "notifications" && (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                    বিজ্ঞপ্তি সেটিংস
                  </h2>

                  <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-700 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">
                          ইমেইল বিজ্ঞপ্তি
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                          গুরুত্বপূর্ণ আপডেটের জন্য ইমেইল পান
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={() => toggleSetting("emailNotifications")}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-700 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">
                          পুশ বিজ্ঞপ্তি
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                          আপনার ডিভাইসে তাৎক্ষণিক বিজ্ঞপ্তি পান
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={() => toggleSetting("pushNotifications")}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>

                    {/* Weekly Digest */}
                    <div className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-700 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">
                          সাপ্তাহিক সংক্ষেপ
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                          আপনার কার্যকলাপের সাপ্তাহিক সংক্ষেপ পান
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.weeklyDigest}
                        onChange={() => toggleSetting("weeklyDigest")}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>

                    {/* Challenge Updates */}
                    <div className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-700 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">
                          চ্যালেঞ্জ আপডেট
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                          নতুন চ্যালেঞ্জ এবং ইভেন্ট সম্পর্কে সতর্ক হন
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Security */}
            {activeSection === "privacy" && (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                    গোপনীয়তা ও নিরাপত্তা
                  </h2>

                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div>
                      <h3 className="font-semibold text-white mb-4">
                        প্রোফাইল দৃশ্যমানতা
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            value: "public",
                            label: "সর্বজনীন",
                            desc: "সবাই আপনার প্রোফাইল দেখতে পারে",
                          },
                          {
                            value: "friends",
                            label: "বন্ধুদের কাছে",
                            desc: "শুধুমাত্র বন্ধুরা আপনার প্রোফাইল দেখতে পারে",
                          },
                          {
                            value: "private",
                            label: "ব্যক্তিগত",
                            desc: "কেউ আপনার প্রোফাইল দেখতে পারে না",
                          },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-700/30"
                          >
                            <input
                              type="radio"
                              name="privacy"
                              value={option.value}
                              checked={settings.privacy === option.value}
                              onChange={() =>
                                handleSelectChange("privacy", option.value)
                              }
                              className="w-4 h-4"
                            />
                            <div>
                              <p className="font-medium text-white">
                                {option.label}
                              </p>
                              <p className="text-xs text-slate-400">
                                {option.desc}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="border-t border-slate-700 pt-6">
                      <h3 className="font-semibold text-white mb-4">
                        সক্রিয় সেশন
                      </h3>
                      <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">
                              এই ডিভাইস (বর্তমান)
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              Chrome • Windows • 192.168.1.1
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 bg-lime-400/20 text-lime-300 rounded">
                            সক্রিয়
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === "appearance" && (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                    চেহারা সেটিংস
                  </h2>

                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <h3 className="font-semibold text-white mb-4">থিম</h3>
                      <div className="space-y-3">
                        {[
                          { value: "dark", label: "ডার্ক", icon: "🌙" },
                          { value: "light", label: "হালকা", icon: "☀️" },
                          { value: "auto", label: "স্বয়ংক্রিয়", icon: "⚙️" },
                        ].map((theme) => (
                          <label
                            key={theme.value}
                            className="flex items-center gap-3 p-4 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-700/30"
                          >
                            <input
                              type="radio"
                              name="theme"
                              value={theme.value}
                              defaultChecked={theme.value === "dark"}
                              className="w-4 h-4"
                            />
                            <span className="text-lg">{theme.icon}</span>
                            <span className="font-medium text-white">
                              {theme.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div className="border-t border-slate-700 pt-6">
                      <h3 className="font-semibold text-white mb-4">
                        অ্যাক্সেন্ট রঙ
                      </h3>
                      <div className="flex gap-3">
                        {["lime", "cyan", "purple", "orange"].map((color) => (
                          <button
                            key={color}
                            className={`w-10 h-10 rounded-lg border-2 transition-all ${
                              color === "lime"
                                ? "border-lime-400 scale-110"
                                : "border-slate-600 hover:border-slate-500"
                            }`}
                            style={{
                              backgroundColor: `var(--color-${color}-500)`,
                              opacity: 0.7,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Language & Region */}
            {activeSection === "language" && (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                    ভাষা ও অঞ্চল
                  </h2>

                  <div className="space-y-6">
                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        ভাষা
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          handleSelectChange("language", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                      >
                        <option value="bengali">বাংলা</option>
                        <option value="english">English</option>
                        <option value="hindi">हिंदी</option>
                      </select>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        সময় অঞ্চল
                      </label>
                      <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white">
                        <option>এশিয়া/ঢাকা (UTC+6)</option>
                        <option>এশিয়া/কলকাতা (UTC+5:30)</option>
                        <option>UTC</option>
                      </select>
                    </div>

                    {/* Date Format */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        তারিখ বিন্যাস
                      </label>
                      <select className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex gap-3 sm:gap-4">
          <Button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold">
            পরিবর্তন সংরক্ষণ করুন
          </Button>
          <Button variant="outline" className="border-slate-600">
            বাতিল করুন
          </Button>
        </div>
      </div>
    </div>
  );
}
