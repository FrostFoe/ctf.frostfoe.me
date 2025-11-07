"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const domainTabs = [
  { id: "red", title: "Red Teams" },
  { id: "blue", title: "Blue Teams" },
  { id: "purple", title: "Purple Approach" },
];

const domainContent = {
  red: {
    href: "https://www.hackthebox.com/red-teams",
    bgImage: PlaceHolderImages.find((img) => img.id === "red-team-bg")!.imageUrl,
    description:
      "Test and grow your skills in all penetration testing and adversarial domains, from information gathering to documentation and reporting.",
    features: [
      "Industry-recognized certifications",
      "Corporate red team scenarios",
      "Hands-on penetration testing labs",
      "MITRE ATT&CK framework mapping",
    ],
  },
  blue: {
    href: "https://www.hackthebox.com/blue-teams",
    bgImage: PlaceHolderImages.find((img) => img.id === "blue-team-bg")!.imageUrl,
    description:
      "Stay connected to the threat landscape and learn how to detect techniques, tactics, and procedures used by real adversaries.",
    features: [
      "Market-connected courses",
      "Gamified blue team assessments",
      "Hands-on investigation labs",
      "NIST/NICE framework mapping",
    ],
  },
  purple: {
    href: "https://www.hackthebox.com/purple-teams",
    bgImage: PlaceHolderImages.find((img) => img.id === "purple-team-bg")!.imageUrl,
    description:
      "Master offensive strategies to enable effective defensive operations. For modern, 360° cyber professionals and organizations.",
    features: [
      "CVE-based vulnerable labs",
      "Real-time attack/defense simulation",
      "Realistic enterprise scenarios",
      "Extensive mapping and reporting",
    ],
  },
};

export default function HeroDomains() {
  const [activeTab, setActiveTab] = useState("purple");
  const activeContent = domainContent[activeTab as keyof typeof domainContent];
  const checkIcon = PlaceHolderImages.find((img) => img.id === "check-icon")!;

  return (
    <section className="w-full max-w-7xl py-12">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="w-full xl:w-1/2 flex flex-col">
            <h3 className="text-white text-4xl font-bold mb-8">
              Solutions for all <br /> cybersecurity domains.
            </h3>
            <div className="flex flex-col gap-4">
              {domainTabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "rounded-lg border cursor-pointer transition-colors bg-gray-800",
                    {
                      "border-gray-700": activeTab !== tab.id,
                      "border-lime-400": activeTab === tab.id,
                    },
                  )}
                >
                  <div className="p-6">
                    <h4
                      className={cn("text-3xl font-bold transition-colors", {
                        "text-gray-500": activeTab !== tab.id,
                        "text-white": activeTab === tab.id,
                      })}
                    >
                      {tab.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <div className="h-full">
              <a href={activeContent.href} className="block h-full">
                <div
                  style={{ backgroundImage: `url('${activeContent.bgImage}')` }}
                  className="h-full rounded-lg flex flex-col justify-end p-8 bg-cover bg-center"
                  data-ai-hint="abstract background"
                >
                  <p className="text-lg text-gray-200 mb-8">
                    {activeContent.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                    {activeContent.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Image
                          src={checkIcon.imageUrl}
                          alt={checkIcon.description}
                          data-ai-hint={checkIcon.imageHint}
                          width={20}
                          height={20}
                          className="w-5 h-5 mr-3 flex-shrink-0"
                        />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <Button className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-sm hover:bg-lime-300 transition-colors">
                      See more
                    </Button>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
