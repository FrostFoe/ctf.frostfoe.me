"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "pentester",
    title: "Penetration Testers",
    content: [
      {
        title: "Training Plans",
        description:
          "Combine job role paths with more than 1,200 labs simulating the latest security vulnerabilities and vectors, with new scenarios added every week.",
        videoUrl:
          "https://demo.arcade.software/IckcAp46ffACx9Lf5Q6V?embed&show_copy_link=true",
      },
      {
        title: "Ranges",
        description:
          "Jump into full enterprise-scale networks with realistic pivoting, IDS evasion and exploitation techniques proving real-world offensive capability.",
        videoUrl:
          "https://demo.arcade.software/xXKVBHORBdCRgVW5AaxR?embed&show_copy_link=true",
      },
      {
        title: "Team Assessments",
        description:
          "Test and benchmark pentesting skills with pre-made or custom CTF events. Build and deploy your event in less than 10 minutes, choosing between 180+ scenarios.",
        videoUrl:
          "https://demo.arcade.software/4me5dRqNpxdNm3m5hkLr?embed&show_copy_link=true",
      },
    ],
  },
  {
    id: "operator",
    title: "Red Team Operators",
    content: [
      {
        title: "Training Plans",
        description:
          "Use 1,000+ courses and labs to progress from fundamentals to advanced adversary emulation while learning how to adopt new technologies in your engagement - including AI.",
        videoUrl:
          "https://demo.arcade.software/NSqveHBY35coQPAjnoh3?embed&show_copy_link=true",
      },
      {
        title: "Ranges",
        description:
          "Premium red team scenarios designed to provide an accurate adversary simulation against fully patched, enterprise technologies to replicate real-world cyber attackers' TTPs.",
        videoUrl:
          "https://demo.arcade.software/pSaj4Zfwerz9EIZCat0X?embed&show_copy_link=true",
      },
      {
        title: "Team Assessments",
        description:
          "Spin up custom red team assessments (jeopardy or AD chains) for cyber teams, with live leaderboards, time scoring, and post-event analytics that spotlight collective strengths or skill gaps.",
        videoUrl:
          "https://demo.arcade.software/FLrqcQ0QjHt4eA4DSGRw?embed&show_copy_link=true",
      },
    ],
  },
  {
    id: "developer",
    title: "Malware & Exploit Developers",
    content: [
      {
        title: "Training Plans",
        description:
          "Combine threat-informed courses with CVE scenarios and learn how to conduct penetration tests against modern and highly secure applications.",
        videoUrl:
          "https://demo.arcade.software/WeIaTWEu47l3mT41TUea?embed&show_copy_link=true",
      },
      {
        title: "Ranges",
        description:
          "Use cyber ranges to deploy malware and to observe the behavior from a defender's viewpoint. This is invaluable for red teams aiming to craft low-detection tools and sharp techniques.",
        videoUrl:
          "https://demo.arcade.software/NqYuo84H2QqrCaSX3icb?embed&show_copy_link=true",
      },
      {
        title: "Team Assessments",
        description:
          "Host custom events loaded with reverse engineering and full-pwn scenarios with latest exploit techniques – live leaderboards and analytics spotlight strengths and gaps across the team.",
        videoUrl:
          "https://demo.arcade.software/tSjChHusBWYrhy0BJdvc?embed&show_copy_link=true",
      },
    ],
  },
];

export default function UseCases() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [activeSubTab, setActiveSubTab] = useState(tabs[0].content[0].title);

  const currentTabContent = tabs.find((tab) => tab.id === activeTab)!;
  const currentSubTabContent = currentTabContent.content.find(
    (sub) => sub.title === activeSubTab,
  )!;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Reset sub-tab to the first item of the new tab
    const newTab = tabs.find((tab) => tab.id === tabId);
    if (newTab) {
      setActiveSubTab(newTab.content[0].title);
    }
  };

  return (
    <section className="w-full">
      <h2 className="mb-8 text-center text-3xl font-medium text-white md:text-5xl lg:text-6xl">
        How red teamers use Hack The Box
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "flex-1 rounded-lg border-2 p-4 text-center text-lg font-medium text-white transition-all",
                activeTab === tab.id
                  ? "border-red-500 bg-red-900/30"
                  : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50",
              )}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-2/3">
            <div className="aspect-video w-full">
              <iframe
                src={currentSubTabContent.videoUrl}
                title={currentSubTabContent.title}
                frameBorder="0"
                loading="lazy"
                allowFullScreen
                className="h-full w-full rounded-lg"
              ></iframe>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 lg:w-1/3">
            {currentTabContent.content.map((item) => (
              <Card
                key={item.title}
                onClick={() => setActiveSubTab(item.title)}
                className={cn(
                  "cursor-pointer bg-gray-800/50 p-4 transition-all hover:bg-gray-700/50",
                  activeSubTab === item.title
                    ? "border border-red-500"
                    : "border border-gray-700",
                )}
              >
                <CardTitle className="text-lg font-semibold text-white">
                  {item.title}
                </CardTitle>
                <CardDescription className="mt-2 text-gray-300">
                  {item.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
