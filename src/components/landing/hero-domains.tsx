"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const domainTabs = [
  { id: "red", title: "রেড টিম" },
  { id: "blue", title: "ব্লু টিম" },
  { id: "purple", title: "পার্পল অ্যাপ্রোচ" },
];

const domainContent = {
  red: {
    href: "https://www.hackthebox.com/red-teams",
    bgImage: PlaceHolderImages.find((img) => img.id === "red-team-bg")!
      .imageUrl,
    description:
      "তথ্য সংগ্রহ থেকে শুরু করে ডকুমেন্টেশন এবং রিপোর্টিং পর্যন্ত সমস্ত পেনিട്രেশন টেস্টিং এবং অ্যাডভারসারিয়াল ডোমেইনে আপনার দক্ষতা পরীক্ষা করুন এবং বাড়ান।",
    features: [
      "শিল্প-স্বীকৃত সার্টিফিকেশন",
      "কর্পোরেট রেড টিম দৃশ্য",
      "হ্যান্ডস-অন পেনিട്രেশন টেস্টিং ল্যাব",
      "MITRE ATT&CK ফ্রেমওয়ার্ক ম্যাপিং",
    ],
  },
  blue: {
    href: "https://www.hackthebox.com/blue-teams",
    bgImage: PlaceHolderImages.find((img) => img.id === "blue-team-bg")!
      .imageUrl,
    description:
      "থ্রেট ল্যান্ডস্কেপের সাথে সংযুক্ত থাকুন এবং বাস্তব প্রতিপক্ষের দ্বারা ব্যবহৃত কৌশল, কৌশল এবং পদ্ধতিগুলি কীভাবে সনাক্ত করতে হয় তা শিখুন।",
    features: [
      "বাজার-সংযুক্ত কোর্স",
      "গ্যামিফাইড ব্লু টিম মূল্যায়ন",
      "হ্যান্ডস-অন ইনভেস্টিগেশন ল্যাব",
      "NIST/NICE ফ্রেমওয়ার্ক ম্যাপিং",
    ],
  },
  purple: {
    href: "https://www.hackthebox.com/purple-teams",
    bgImage: PlaceHolderImages.find((img) => img.id === "purple-team-bg")!
      .imageUrl,
    description:
      "কার্যকর প্রতিরক্ষামূলক কার্যক্রম সক্রিয় করতে আক্রমণাত্মক কৌশলগুলিতে দক্ষতা অর্জন করুন। আধুনিক, ৩৬০° সাইবার পেশাদার এবং সংস্থাগুলির জন্য।",
    features: [
      "CVE-ভিত্তিক দুর্বল ল্যাব",
      "রিয়েল-টাইম আক্রমণ/প্রতিরক্ষা সিমুলেশন",
      "বাস্তবসম্মত এন্টারপ্রাইজ দৃশ্য",
      "বিস্তৃত ম্যাপিং এবং রিপোর্টিং",
    ],
  },
};

export default function HeroDomains() {
  const [activeTab, setActiveTab] = useState("purple");
  const activeContent = domainContent[activeTab as keyof typeof domainContent];

  return (
    <section className="w-full max-w-7xl py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="w-full xl:w-1/2 flex flex-col text-center xl:text-left">
            <h3 className="text-white text-3xl sm:text-4xl font-bold mb-8">
              সমস্ত সাইবারসিকিউরিটি <br /> ডোমেইনের জন্য সমাধান।
            </h3>
            <div className="flex flex-col gap-4">
              {domainTabs.map((tab) => (
                <Card
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "cursor-pointer transition-colors bg-gray-800",
                    {
                      "border-gray-700 hover:border-gray-500":
                        activeTab !== tab.id,
                      "border-lime-400": activeTab === tab.id,
                    },
                  )}
                >
                  <CardHeader>
                    <CardTitle
                      className={cn("transition-colors", {
                        "text-gray-500": activeTab !== tab.id,
                        "text-white": activeTab === tab.id,
                      })}
                    >
                      {tab.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <a href={activeContent.href} className="block h-full group">
              <Card
                style={{
                  backgroundImage: `url('${activeContent.bgImage}')`,
                }}
                className="h-full min-h-[600px] xl:min-h-0 rounded-lg flex flex-col justify-end bg-cover bg-center border-gray-700 group-hover:border-gray-500 transition-colors"
                data-ai-hint="abstract background"
              >
                <CardContent className="p-6 sm:p-8">
                  <p className="text-base sm:text-lg text-gray-200 mb-8">
                    {activeContent.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                    {activeContent.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 mr-3 flex-shrink-0 text-lime-400" />
                        <span className="text-gray-300 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <Button className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-sm hover:bg-lime-300 transition-colors">
                      আরও দেখুন <ArrowRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
