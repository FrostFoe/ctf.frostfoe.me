"use client";

// Image and placeholder data not needed in this footer
import Typewriter from "@/components/ui/typewriter";

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="py-8 sm:py-12 md:py-16 px-2 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center text-center">
            <h2 className="text-lime-400 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold pb-3 sm:pb-4 mb-0">
              <span className="whitespace-nowrap">৪.১ মিলিয়নেরও বেশি </span>
              <Typewriter toRotate={["হ্যাকার"]} />
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 pb-4 sm:pb-6 mb-0 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
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
