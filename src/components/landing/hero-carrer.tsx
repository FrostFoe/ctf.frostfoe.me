"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowIcon, ArrowIconWhite } from "../icons";

export default function HeroCarrer() {
  const garyImage = PlaceHolderImages.find((img) => img.id === "gary-ruddell")!;
  const logos = [
    PlaceHolderImages.find((img) => img.id === "company-security-metrics")!,
    PlaceHolderImages.find((img) => img.id === "company-synack")!,
    PlaceHolderImages.find((img) => img.id === "company-lufthansa")!,
    PlaceHolderImages.find((img) => img.id === "company-booking")!,
  ];

  return (
    <section className="w-full max-w-7xl py-12">
      <div className="container mx-auto">
        <div className="mb-8">
          <h4 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-8">
            Clear career path programs and retention{" "}
            <br className="hidden md:block" />
            strategies fighting burnout, fatigue, or skill gaps.
          </h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <Button
              asChild
              className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-base hover:bg-lime-300 transition-colors"
            >
              <a href="https://jobs.hackthebox.com" target="_blank">
                Find a job
                <ArrowIcon />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-gray-300 bg-transparent border border-gray-600 hover:bg-gray-700 font-medium py-2 px-5 rounded-md transition-colors text-base"
            >
              <a href="https://www.hackthebox.com/business/talent-search">
                For business
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-7">
            <a
              className="group w-full h-full"
              href="https://www.hackthebox.com/blog/a-blueprint-for-onboarding-new-cybersecurity-professionals"
            >
              <div className="bg-gray-800 rounded-lg border border-gray-700 h-full p-6 md:p-8 relative hover:border-gray-500 transition-colors">
                <ArrowIconWhite />
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-700 pb-6 sm:pb-0 sm:pr-6">
                    <span className="text-sm text-gray-400 block mb-4 sm:mb-12">
                      Available candidates
                    </span>
                    <span className="text-lime-400 text-5xl md:text-7xl font-extrabold block">
                      908k+
                    </span>
                  </div>
                  <div className="flex-1 pt-6 sm:pt-0">
                    <span className="text-sm text-gray-400 block mb-4 sm:mb-12">
                      Onboarding & retention
                    </span>
                    <p className="text-white text-lg md:text-xl leading-relaxed">
                      A blueprint for onboarding cybersecurity professionals:
                      hire & retain!
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="lg:col-span-5">
            <a
              className="group w-full h-full"
              href="https://www.hackthebox.com/blog/military-operator-to-cyber-threat-intelligence-gary-success-story"
            >
              <div className="bg-gray-800 rounded-lg border border-gray-700 h-full flex flex-col sm:flex-row overflow-hidden relative hover:border-gray-500 transition-colors">
                <div className="p-6 md:p-8 flex flex-col justify-between w-full sm:w-3/5 lg:w-full xl:w-7/12">
                  <div className="flex items-center justify-between pb-8 sm:pb-12">
                    <span className="text-sm text-gray-400">Success story</span>
                    <ArrowIconWhite />
                  </div>
                  <p className="text-white text-lg md:text-xl leading-relaxed">
                    From Military Operator to Head of Cyber Threat Intelligence:
                    Gary's story
                  </p>
                </div>
                <div className="w-full sm:w-2/5 lg:w-full xl:w-5/12 h-48 sm:h-auto">
                  <Image
                    className="w-full h-full object-cover"
                    src={garyImage.imageUrl}
                    alt={garyImage.description}
                    data-ai-hint={garyImage.imageHint}
                    width={200}
                    height={300}
                  />
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 md:p-8">
          <div className="mb-6">
            <span className="text-gray-400 text-base">
              Companies hiring on Hack The Box
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
            {logos.map((logo) => (
              <Image
                key={logo.id}
                className="w-full h-auto"
                src={logo.imageUrl}
                alt={logo.description}
                data-ai-hint={logo.imageHint}
                width={200}
                height={50}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
