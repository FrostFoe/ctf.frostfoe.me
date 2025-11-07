"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Typewriter from "@/components/ui/typewriter";

export default function Footer() {
  const discordButton = PlaceHolderImages.find(
    (img) => img.id === "discord-button",
  )!;
  const g2Rating = PlaceHolderImages.find((img) => img.id === "g2-rating")!;

  return (
    <footer className="w-full max-w-7xl py-8 animate-slide-in-from-bottom animation-delay-1000">
      <div className="container mx-auto px-4">
        <div className="border border-gray-700 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lime-800/20">
          <div className="py-12 px-2 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center text-center">
              <h3 className="text-lime-400 text-4xl sm:text-6xl lg:text-8xl font-bold pb-4 mb-0">
                <span className="whitespace-nowrap">৪.১ মিলিয়নেরও বেশি </span>
                <Typewriter toRotate={["হ্যাকার"]} />
              </h3>
              <p className="text-base md:text-lg text-gray-300 pb-6 mb-0 max-w-md mx-auto">
                ল্যাব সম্পর্কে চ্যাট করুন, রিসোর্স এবং চাকরি শেয়ার করুন।
                <br className="hidden sm:block" /> সারা বিশ্ব থেকে ২ লক্ষেরও
                বেশি হ্যাকারের সাথে সংযোগ করুন।
              </p>
              <a
                href="https://discord.com/invite/hackthebox"
                target="_blank"
                className="mb-10 inline-block"
              >
                <Image
                  className="mx-auto"
                  src={discordButton.imageUrl}
                  alt={discordButton.description}
                  data-ai-hint={discordButton.imageHint}
                  width={200}
                  height={50}
                />
              </a>
            </div>
            <div className="text-center">
              <a
                href="https://www.g2.com/products/hack-the-box/reviews"
                target="_blank"
              >
                <Image
                  className="mx-auto"
                  src={g2Rating.imageUrl}
                  alt={g2Rating.description}
                  data-ai-hint={g2Rating.imageHint}
                  width={195}
                  height={50}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
