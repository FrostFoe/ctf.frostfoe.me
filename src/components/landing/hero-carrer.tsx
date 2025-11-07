"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="-3 -3 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#0b121f"
      d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
    ></path>
    <path
      stroke="#0b121f"
      d="M1.75 8H11"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
  </svg>
);

const ArrowIconWhite = () => (
  <svg
    className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-6"
    width="16"
    height="16"
    viewBox="-3 -3 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
    ></path>
    <path
      stroke="#ffffff"
      d="M1.75 8H11"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
  </svg>
);

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
          <h4 className="text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-8">
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
                    <span className="text-lime-400 text-6xl md:text-7xl font-extrabold block">
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
