"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function HeroWork() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="w-full max-w-7xl py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-8">
            সাইবার কর্মশক্তি উন্নয়ন পরিকল্পনা আপনার প্রতিষ্ঠানের <br /> গঠন এবং
            উদ্দেশ্যের সাথে যুক্ত।
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
            <Button
              asChild
              className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-base hover:bg-lime-300 transition-colors"
            >
              <a
                href="https://www.hackthebox.com/business/contact-us"
                target="_blank"
              >
                একটি ডেমো পান
                <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-gray-300 bg-transparent border border-gray-600 hover:bg-gray-700 font-medium py-2 px-5 rounded-md transition-colors text-base"
            >
              <a
                href="https://enterprise.hackthebox.com/create-company"
                target="_blank"
              >
                বিনামূল্যে ট্রায়াল শুরু করুন
              </a>
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative group">
            {showVideo ? (
              <iframe
                src="https://demo.arcade.software/b4VLzUIzD6jJlVwT6LaP?embed&show_copy_link=true"
                title="HTB এন্টারপ্রাইজ: রিপোর্টিং"
                frameBorder="0"
                loading="lazy"
                allow="fullscreen; autoplay"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <>
                <Image
                  src="https://picsum.photos/seed/arcade/1280/720"
                  alt="HTB Enterprise Reporting Video Thumbnail"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out"
                  data-ai-hint="dashboard"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <button
                    onClick={() => setShowVideo(true)}
                    className="group/button flex flex-col items-center justify-center text-white"
                    aria-label="Play video"
                  >
                    <PlayCircle className="w-20 h-20 text-white text-opacity-80 transition-all duration-300 ease-in-out group-hover/button:text-opacity-100 mb-2" />
                    <span className="font-bold text-lg">ডেমো দেখুন</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
