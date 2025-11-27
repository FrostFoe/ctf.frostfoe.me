"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSkills() {
  const skillCards = [
    {
      title: "লার্নিং পাথ",
      description:
        "বিভিন্ন দক্ষতার উপর সম্পূর্ণ নির্দেশিত যাত্রা অথবা নির্দিষ্ট নিরাপত্তা চাকরির ভূমিকায় দক্ষতা অর্জন।",
      image: {
        imageUrl: "/images/learning-paths-asset.webp",
        description: "Learning Paths",
        imageHint: "abstract nodes",
      },
    },
    {
      title: "বাস্তব-বিশ্বের দৃশ্য",
      description:
        "সর্বশেষ প্রযুক্তি এবং আক্রমণের ভেক্টরের উপর কেন্দ্র করে অত্যাধুনিক ল্যাব — প্রতি সপ্তাহে প্রকাশিত হয়!",
      image: {
        imageUrl: "/images/real-world-scenarios.webp",
        description: "Real-world Scenarios",
        imageHint: "data graph",
      },
    },
    {
      title: "শিল্প সার্টিফিকেশন",
      description:
        "উদ্ভাবনী কোর্স এবং পরীক্ষা যা আপনাকে বাজারের জন্য প্রস্তুত একজন পেশাদার করে তুলবে!",
      image: {
        imageUrl: "/images/industry-certifications.webp",
        description: "Industry Certifications",
        imageHint: "certificate badge",
      },
    },
  ];

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="w-full">
        <div className="mb-6 sm:mb-8 text-center lg:text-left px-4 sm:px-6 md:px-8 lg:px-0">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold leading-tight mb-6 sm:mb-8">
            সাইবারসিকিউরিটি মৌলিক বিষয় থেকে শুরু করে <br /> উন্নত দৃশ্যকল্প
            পর্যন্ত গ্যামিফাইড, হ্যান্ডস-অন আপস্কিলিং।
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
            <Button
              asChild
              className="bg-lime-400 text-gray-900 font-bold px-4 sm:px-5 py-2 rounded-md text-sm sm:text-base hover:bg-lime-300 transition-colors w-full sm:w-auto"
            >
              <Link href="/hacker">
                শুরু করুন <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-gray-300 bg-transparent border border-gray-600 hover:bg-gray-700 font-medium py-2 px-4 sm:px-5 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              <Link href="/business-cyber-security-training">টিমের জন্য</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 lg:px-0">
          {skillCards.map((card) => (
            <Card
              key={card.title}
              className="bg-gray-800 border-gray-700 h-full flex flex-col justify-between text-left transition-all duration-300 ease-in-out hover:border-gray-500"
            >
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-white text-lg sm:text-xl break-words">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed pt-2 text-sm break-words">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center p-3 sm:p-4 pt-0">
                <Image
                  className="w-full h-auto"
                  src={card.image.imageUrl}
                  alt={card.image.description}
                  data-ai-hint={card.image.imageHint}
                  width={400}
                  height={250}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
