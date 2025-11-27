"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroWork() {
  return (
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="mb-6 sm:mb-8 text-center lg:text-left">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold leading-tight mb-6 sm:mb-8">
            সাইবার কর্মশক্তি উন্নয়ন পরিকল্পনা আপনার প্রতিষ্ঠানের <br /> গঠন এবং
            উদ্দেশ্যের সাথে যুক্ত।
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full mb-6 sm:mb-8">
            <Button
              asChild
              className="bg-lime-400 text-gray-900 font-bold px-4 sm:px-5 py-2 rounded-md text-sm sm:text-base hover:bg-lime-300 transition-colors w-full sm:w-auto"
            >
              <a
                href="https://www.hackthebox.com/business/contact-us"
                target="_blank"
              >
                একটি ডেমো পান
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-gray-300 bg-transparent border border-gray-600 hover:bg-gray-700 font-medium py-2 px-4 sm:px-5 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto"
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
            <iframe
              src="https://demo.arcade.software/b4VLzUIzD6jJlVwT6LaP?embed&show_copy_link=true"
              title="HTB এন্টারপ্রাইজ: রিপোর্টিং"
              frameBorder="0"
              loading="lazy"
              allow="fullscreen; autoplay"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
