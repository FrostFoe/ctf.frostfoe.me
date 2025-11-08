"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Typewriter from "@/components/ui/typewriter";

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl py-8">
      <div className="container mx-auto px-4">
        <div className="py-12 px-2 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center text-center">
            <h2 className="text-lime-400 text-4xl sm:text-6xl lg:text-8xl font-bold pb-4 mb-0">
              <span className="whitespace-nowrap">৪.১ মিলিয়নেরও বেশি </span>
              <Typewriter toRotate={["হ্যাকার"]} />
            </h2>
            <p className="text-base md:text-lg text-gray-300 pb-6 mb-0 max-w-md mx-auto">
              ল্যাব সম্পর্কে চ্যাট করুন, রিসোর্স এবং চাকরি শেয়ার করুন।
              <br className="hidden sm:block" /> সারা বিশ্ব থেকে ২ লক্ষেরও বেশি
              হ্যাকারের সাথে সংযোগ করুন।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
