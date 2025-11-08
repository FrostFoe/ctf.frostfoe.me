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
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

export default function HeroSkills() {
  const skillCards = [
    {
      title: "লার্নিং পাথ",
      description:
        "বিভিন্ন দক্ষতার উপর সম্পূর্ণ নির্দেশিত যাত্রা অথবা নির্দিষ্ট নিরাপত্তা চাকরির ভূমিকায় দক্ষতা অর্জন।",
      image: PlaceHolderImages.find(
        (img) => img.id === "learning-paths-asset",
      )!,
    },
    {
      title: "বাস্তব-বিশ্বের দৃশ্য",
      description:
        "সর্বশেষ প্রযুক্তি এবং আক্রমণের ভেক্টরের উপর কেন্দ্র করে অত্যাধুনিক ল্যাব — প্রতি সপ্তাহে প্রকাশিত হয়!",
      image: PlaceHolderImages.find(
        (img) => img.id === "real-world-scenarios-asset",
      )!,
    },
    {
      title: "শিল্প সার্টিফিকেশন",
      description:
        "উদ্ভাবনী কোর্স এবং পরীক্ষা যা আপনাকে বাজারের জন্য প্রস্তুত একজন পেশাদার করে তুলবে!",
      image: PlaceHolderImages.find(
        (img) => img.id === "industry-certifications-asset",
      )!,
    },
  ];

  return (
    <section className="w-full max-w-7xl py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-8">
            সাইবারসিকিউরিটি মৌলিক বিষয় থেকে শুরু করে <br /> উন্নত দৃশ্যকল্প
            পর্যন্ত গ্যামিফাইড, হ্যান্ডস-অন আপস্কিলিং।
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button
              asChild
              className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-base hover:bg-lime-300 transition-colors"
            >
              <a href="https://www.hackthebox.com/hacker" target="_blank">
                শুরু করুন <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-gray-300 bg-transparent border border-gray-600 hover:bg-gray-700 font-medium py-2 px-5 rounded-md transition-colors text-base"
            >
              <a href="https://www.hackthebox.com/business-cyber-security-training">
                টিমের জন্য
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillCards.map((card) => (
            <Card
              key={card.title}
              className="bg-gray-800 border-gray-700 h-full flex flex-col justify-between text-left transition-all duration-300 ease-in-out hover:border-gray-500"
            >
              <CardHeader>
                <CardTitle className="text-white">{card.title}</CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed pt-2">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center p-4 pt-0">
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
