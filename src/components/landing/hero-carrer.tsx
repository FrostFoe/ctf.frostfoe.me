"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function HeroCarrer() {
  const logos = [
    PlaceHolderImages.find((img) => img.id === "company-security-metrics")!,
    PlaceHolderImages.find((img) => img.id === "company-synack")!,
    PlaceHolderImages.find((img) => img.id === "company-lufthansa")!,
    PlaceHolderImages.find((img) => img.id === "company-booking")!,
  ];

  return (
    <section className="w-full max-w-7xl py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center lg:text-left">
          <h4 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-8">
            বার্নআউট, ক্লান্তি বা দক্ষতার ব্যবধানের বিরুদ্ধে লড়াই করার জন্য
            স্পষ্ট ক্যারিয়ার পাথ প্রোগ্রাম এবং ধরে রাখার কৌশল।
          </h4>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
            <Button
              asChild
              className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-base hover:bg-lime-300 transition-colors"
            >
              <a href="https://jobs.hackthebox.com" target="_blank">
                চাকরি খুঁজুন
                <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-gray-300 bg-transparent border border-gray-600 hover:bg-gray-700 font-medium py-2 px-5 rounded-md transition-colors text-base"
            >
              <a href="https://www.hackthebox.com/business/talent-search">
                ব্যবসার জন্য
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 text-left">
          <a
            className="group w-full h-full"
            href="https://www.hackthebox.com/blog/a-blueprint-for-onboarding-new-cybersecurity-professionals"
          >
            <Card className="bg-gray-800 border-gray-700 h-full p-6 md:p-8 relative hover:border-gray-500 transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-lime-800/20">
              <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-6" />
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-700 pb-6 sm:pb-0 sm:pr-6">
                    <CardDescription className="text-sm text-gray-400 block mb-4 sm:mb-12">
                      উপলব্ধ প্রার্থী
                    </CardDescription>
                    <span className="text-lime-400 text-5xl md:text-7xl font-extrabold block">
                      ৯০৮ হাজার+
                    </span>
                  </div>
                  <div className="flex-1 pt-6 sm:pt-0">
                    <CardDescription className="text-sm text-gray-400 block mb-4 sm:mb-12">
                      অনবোর্ডিং এবং ধরে রাখা
                    </CardDescription>
                    <p className="text-white text-lg md:text-xl leading-relaxed">
                      সাইবারসিকিউরিটি পেশাদারদের অনবোর্ডিংয়ের জন্য একটি
                      ব্লুপ্রিন্ট: নিয়োগ এবং ধরে রাখুন!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6 md:p-8 text-center lg:text-left transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lime-800/20">
          <CardHeader className="p-0 mb-6">
            <CardDescription className="text-gray-400 text-base">
              হ্যাক দ্য বক্স-এ নিয়োগকারী সংস্থাগুলি
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
              {logos.map((logo) => (
                <Image
                  key={logo.id}
                  className="w-full h-auto mx-auto"
                  src={logo.imageUrl}
                  alt={logo.description}
                  data-ai-hint={logo.imageHint}
                  width={200}
                  height={50}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
