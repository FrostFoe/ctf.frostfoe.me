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
    id: "operator",
    title: "Purple Team Operators",
    content: [
      {
        title: "Training Plans",
        description:
          "Chain red team TTP courses with detection engineering labs, guiding analysts from threat intel mapping to automated rule testing while the platform tracks progress real-time.",
        videoUrl:
          "https://demo.arcade.software/mTIuYgIBVtr7r69ibCrA?embed&show_copy_link=true",
      },
      {
        title: "Ranges",
        description:
          "Dedicated purple ranges drop operators into enterprise scale networks where live attacker actions stream into real SIEM/XDR tools and collaborate from attack emulation to OpSec refinement.",
        videoUrl:
          "https://demo.arcade.software/mN8MPXhh9EhxufIMTUPh?embed&show_copy_link=true",
      },
      {
        title: "Team Assessments",
        description:
          "Test and benchmark teams against customized attack chains with automated scoring on both exploitation and detection efficacy, with a post-event report that maps to recommended upskilling programs.",
        videoUrl:
          "https://demo.arcade.software/620aeHeTs3pSejvsMEfK?embed&show_copy_link=true",
      },
    ],
  },
  {
    id: "emulation",
    title: "Adversary Emulation Engineers",
    content: [
      {
        title: "Training Plans",
        description:
          "Combine advanced OpSec, custom C2 development and threat intel labs, so practitioners learn to emulate realistic APT campaigns in a safe environment and ensure readiness.",
        videoUrl:
          "https://demo.arcade.software/A4cUQzMVBPQsTfgjIcDE?embed&show_copy_link=true",
      },
      {
        title: "Ranges",
        description:
          "Jump into pre-built enterprise networks, actively generating live-fire logs as attacks occur. Simulate attacks with Atomic Red Team and implement predictive measures as real, iterative purple teams do.",
        videoUrl:
          "https://demo.arcade.software/mWTxD33UJ9tOPXxxN3KI?embed&show_copy_link=true",
      },
      {
        title: "Team Assessments",
        description:
          "Simulate a realistic cyber attack (ransomware outbreak or insider threat) executed in a sandbox environment. All event data are recorded into the SIEM. The team's task is to detect and respond.",
        videoUrl:
          "https://demo.arcade.software/KHPNva6DunBzi9i9PXt6?embed&show_copy_link=true",
      },
    ],
  },
  {
    id: "detection",
    title: "Detection Engineers",
    content: [
      {
        title: "Training Plans",
        description:
          "The detection engineering job role path guides analysts through advanced detection workflows and ATT&CK coverage, combined with more than 1,000+ hands-on labs.",
        videoUrl:
          "https://demo.arcade.software/0TNADdMkZmdJ0St67RNt?embed&show_copy_link=true",
      },
      {
        title: "Ranges",
        description:
          "Enter a cyber range like a real corporate network under attack. Access attacker tools and upon exploiting the targets pivot to the centralized logging. All targets forward security telemetry to the SIEM",
        videoUrl:
          "https://demo.arcade.software/ppkCNkXJu7974xM9D7cz?embed&show_copy_link=true",
      },
      {
        title: "Team Assessments",
        description:
          "Pre-execute a cyber attack and capture all alerts and logs in a SIEM. The team then enters the scenario with all incident data to experience the intensity of a real incident in a controlled setting.",
        videoUrl:
          "https://demo.arcade.software/9B8ZLuvz7XNu64CSTOR0?embed&show_copy_link=true",
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
    const newTab = tabs.find((tab) => tab.id === tabId);
    if (newTab) {
      setActiveSubTab(newTab.content[0].title);
    }
  };

  return (
    <section className="w-full">
      <h2 className="mb-8 text-center text-3xl font-medium text-white md:text-5xl lg:text-6xl">
        How purple teams use Hack The Box
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
                  ? "border-purple-500 bg-purple-900/30"
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
                    ? "border border-purple-500"
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
