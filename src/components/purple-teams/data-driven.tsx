"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const content = [
  {
    id: "img-1",
    title: "Individual & team analytics",
    description:
      "Track key metrics like MTTD, alert precision, and investigation quality at both the individual and team level.",
    image: PlaceHolderImages.find((img) => img.id === "purple-team-analytics")!,
  },
  {
    id: "img-2",
    title: "Skill coverage heatmaps",
    description:
      "Visualize team proficiency against MITRE ATT&CK and NIST NICE framework to identify capability gaps that need focus.",
    image: PlaceHolderImages.find((img) => img.id === "purple-team-heatmaps")!,
  },
  {
    id: "img-3",
    title: "Customization and integration",
    description:
      "Export or connect skill metrics and progression to your LMS system to track growth as part of career advancement.",
    image: PlaceHolderImages.find(
      (img) => img.id === "purple-team-integration",
    )!,
  },
];

export default function DataDriven() {
  const [activeTab, setActiveTab] = useState("img-1");
  const activeContent = content.find((item) => item.id === activeTab)!;

  return (
    <section className="w-full">
      <div className="mb-8 rounded-lg border border-purple-500/30 bg-gradient-to-l from-transparent to-purple-950/30 p-8">
        <h2 className="text-3xl font-medium text-white md:text-5xl lg:text-6xl">
          Data-driven cyber resilience
        </h2>
        <p className="mt-4 text-base text-gray-400 md:text-xl">
          Measure security team performance with reporting features that
          demonstrate skill growth and operational readiness.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full flex-col gap-4 lg:w-1/3">
          {content.map((item) => (
            <Card
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "cursor-pointer border-gray-700 bg-transparent p-4 transition-all duration-300 ease-in-out hover:bg-gray-800/50 hover:scale-105",
                activeTab === item.id && "border-purple-500/50 bg-gray-800/50",
              )}
            >
              <CardTitle
                className={cn(
                  "text-xl font-medium text-white transition-colors",
                )}
              >
                {item.title}
              </CardTitle>
              <CardContent className="p-0 pt-2">
                <p className="text-gray-400">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="w-full lg:w-2/3">
          <Card className="overflow-hidden rounded-lg border-gray-700 bg-gray-900/50">
            <Image
              src={activeContent.image.imageUrl}
              alt={activeContent.image.description}
              width={800}
              height={520}
              className="h-auto w-full object-cover"
              data-ai-hint={activeContent.image.imageHint}
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
