"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const domainTabs = [
  {
    id: "red",
    title: "রেড টিম",
    href: "/red-teams",
  },
  {
    id: "blue",
    title: "ব্লু টিম",
    href: "/blue-teams",
  },
  {
    id: "purple",
    title: "পার্পল অ্যাপ্রোচ",
    href: "/purple-teams",
  },
];

const domainContent = {
  red: {
    href: "/red-teams",
    bgImage: "/images/red-bg.webp",
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
    href: "/blue-teams",
    bgImage: "/images/blue-bg.webp",
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
    href: "/purple-teams",
    bgImage: "/images/purple-bg.webp",
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
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8">
          <div className="w-full xl:w-1/2 flex flex-col text-center xl:text-left">
            <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
              সমস্ত সাইবারসিকিউরিটি <br /> ডোমেইনের জন্য সমাধান।
            </h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              {domainTabs.map((tab) => (
                <Card
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "cursor-pointer transition-all duration-300 ease-in-out bg-gray-800 p-3 sm:p-4",
                    {
                      "border-gray-700 hover:border-gray-500":
                        activeTab !== tab.id,
                      "border-lime-400": activeTab === tab.id,
                    },
                  )}
                >
                  <CardHeader className="p-0">
                    <CardTitle
                      className={cn(
                        "text-lg sm:text-xl transition-colors break-words",
                        {
                          "text-gray-500": activeTab !== tab.id,
                          "text-white": activeTab === tab.id,
                        },
                      )}
                    >
                      {tab.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <Link href={activeContent.href} className="block h-full group">
              <Card
                style={{
                  backgroundImage: `url('${activeContent.bgImage}')`,
                }}
                className="h-full rounded-lg flex flex-col justify-end bg-cover bg-center border-gray-700 group-hover:border-gray-500 transition-all duration-300 ease-in-out"
                data-ai-hint="abstract background"
              >
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-4 sm:mb-8 break-words">
                    {activeContent.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-4 mb-4 sm:mb-8">
                    {activeContent.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 shrink-0 text-lime-400 mt-0.5" />
                        <span className="text-gray-300 text-xs sm:text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <Button className="bg-lime-400 text-gray-900 font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-lime-300 transition-colors">
                      আরও দেখুন{" "}
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
