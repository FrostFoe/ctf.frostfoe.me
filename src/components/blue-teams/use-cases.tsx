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
    id: "soc",
    title: "SOC Analysts",
    content: [
      {
        title: "Training Plans",
        description:
          "Threat-informed courses and realistic incident simulations covering core SOC operations (from monitoring to escalation) and critical tooling.",
        videoUrl:
          "https://demo.arcade.software/eozw1fPUXSHoCkORHPi6?embed&show_copy_link=true",
      },
      {
        title: "Ranges",
        description:
          "Live-fire blue team simulation designed to test SOC Analysts in triage and escalation, as well as foster collaboration with digital forensics and incident responders.",
        videoUrl:
          "https://demo.arcade.software/MVl4iArbXaX1qvDEm1Pj?embed&show_copy_link=true",
      },
      {
        title: "Team Assessments",
        description:
          "Test and benchmark SOC skills with pre-made or custom CTF events. Build and deploy your event in less than 10 minutes, choosing between 180+ scenarios.",
        videoUrl:
          "https://demo.arcade.software/POx7NmCv79ohPrSnnlDp?embed&show_copy_link=true",
      },
    ],
  },
  {
    id: "dfir",
    title: "Digital Forensics & Incident Responders",
    content: [
      {
        title: "Training Plans",
        description:
          "100+ incident investigation labs to boost DFIR capabilities, deeper understanding of security tools, the ability to prioritize during real investigations, and proficiency in technical analysis.",
        videoUrl:
          "https://demo.arcade.software/pvZEF8SjxpY6sn7dJp4Z?embed&show_copy_link=true",
      },
      {
        title: "Ranges",
        description:
          "Simulate a full breach scenario to practice forensic and response processes end-to-end. Rehearse major incident handling in a safe environment, identifying gaps in skills or playbooks before a real crisis hits.",
        videoUrl:
          "https://demo.arcade.software/8L8fGo9px15bEyZmttPD?embed&show_copy_link=true",
      },
      {
        title: "Team Assessments",
        description:
          "Test and benchmark DFIR skills with pre-made or custom CTF events. Build and deploy your event in less than 10 minutes, choosing between 180+ scenarios.",
        videoUrl:
          "https://demo.arcade.software/fMNj7PQKgSIy9mZiUsWJ?embed&show_copy_link=true",
      },
    ],
  },
  {
    id: "threat",
    title: "Threat Intelligence Analysts",
    content: [
      {
        title: "Training Plans",
        description:
          "Threat-informed courses and realistic incident simulations mapped to CVEs and TTPs allow analysts to gather adversarial requirements and quantify risk ahead of time.",
        videoUrl:
          "https://demo.arcade.software/yXq1osDi2hysSoiCTsU0?embed&show_copy_link=true",
      },
      {
        title: "Ranges",
        description:
          "Detection and OpSec cyber ranges can be used by analysts to emulate any adversary TTP and improve threat hunting operations or fine-tune detection rules.",
        videoUrl:
          "https://demo.arcade.software/fMnRTIqpoD2Qvw31fJXo?embed&show_copy_link=true",
      },
      {
        title: "Team Assessments",
        description:
          "Test and benchmark threat intelligence skills with pre-made or custom CTF events. Build and deploy your event in less than 10 minutes, choosing between 180+ scenarios.",
        videoUrl:
          "https://demo.arcade.software/yTZUeyVXrxZYklU3ONOA?embed&show_copy_link=true",
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
        How blue teamers use Hack The Box
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
                  ? "border-blue-500 bg-blue-900/30"
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
                    ? "border border-blue-500"
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
