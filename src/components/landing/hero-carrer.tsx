"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export default function HeroCarrer() {
  const logos = [
    {
      imageUrl: "/images/thn.png",
      description: "The Hacker News",
      imageHint: "company logo",
    },
    {
      imageUrl: "/images/mnr.png",
      description: "Maniruzzaman",
      imageHint: "company logo",
    },
  ];

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="mb-6 sm:mb-8 text-center lg:text-left">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6 sm:mb-8">
            বার্নআউট, ক্লান্তি বা দক্ষতার ব্যবধানের বিরুদ্ধে লড়াই করার জন্য
            স্পষ্ট ক্যারিয়ার পাথ প্রোগ্রাম এবং ধরে রাখার কৌশল।
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full mb-6 sm:mb-8">
            <Button
              asChild
              className="bg-lime-400 text-gray-900 font-bold px-4 sm:px-5 py-2 rounded-md text-sm sm:text-base hover:bg-lime-300 transition-colors w-full sm:w-auto"
            >
              <Link href="/jobs">
                চাকরি খুঁজুন
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-gray-300 bg-transparent border border-gray-600 hover:bg-gray-700 font-medium py-2 px-4 sm:px-5 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              <Link href="/business/talent-search">ব্যবসার জন্য</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8 text-left">
          <Link
            className="group w-full h-full"
            href="/blog/a-blueprint-for-onboarding-new-cybersecurity-professionals"
          >
            <Card className="bg-gray-800 border-gray-700 h-full p-4 sm:p-6 md:p-8 relative hover:border-gray-500 transition-all duration-300 ease-in-out group-hover:shadow-lime-800/20">
              <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 sm:top-6 right-4 sm:right-6" />
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-700 pb-4 sm:pb-0 sm:pr-6">
                    <CardDescription className="text-xs sm:text-sm text-gray-400 block mb-3 sm:mb-12">
                      উপলব্ধ প্রার্থী
                    </CardDescription>
                    <span className="text-lime-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold block">
                      ৯০৮ হাজার+
                    </span>
                  </div>
                  <div className="flex-1 pt-4 sm:pt-0">
                    <CardDescription className="text-xs sm:text-sm text-gray-400 block mb-3 sm:mb-12">
                      অনবোর্ডিং এবং ধরে রাখা
                    </CardDescription>
                    <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
                      সাইবারসিকিউরিটি পেশাদারদের অনবোর্ডিংয়ের জন্য একটি
                      ব্লুপ্রিন্ট: নিয়োগ এবং ধরে রাখুন!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-4 sm:p-6 md:p-8 text-center lg:text-left transition-all duration-300 ease-in-out hover:shadow-lime-800/20">
          <CardHeader className="p-0 mb-4 sm:mb-6">
            <CardDescription className="text-gray-400 text-xs sm:text-sm md:text-base">
              হ্যাক দ্য বক্স-এ নিয়োগকারী সংস্থাগুলি
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-center">
              {logos.map((logo) => (
                <Image
                  key={logo.imageUrl}
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
