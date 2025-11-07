"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

export default function HeroWork() {
  const bookIcon = PlaceHolderImages.find((img) => img.id === "book-icon")!;

  return (
    <section className="w-full max-w-7xl py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center lg:text-left">
          <h5 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-8">
            Cyber workforce development plans baked{" "}
            <br className="hidden lg:block" />
            into the fabric and objectives of your organization.
          </h5>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
            <Button
              asChild
              className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-base hover:bg-lime-300 transition-colors"
            >
              <a
                href="https://www.hackthebox.com/business/contact-us"
                target="_blank"
              >
                Get a demo
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
                Start free trial
              </a>
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <div className="aspect-video">
            <iframe
              src="https://demo.arcade.software/b4VLzUIzD6jJlVwT6LaP?embed&amp;show_copy_link=true"
              title="HTB Enterprise: Reporting"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
          <a
            className="group"
            href="https://www.hackthebox.com/blog/customer-story-toyota"
            target="_blank"
          >
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-full flex flex-col justify-between relative hover:border-gray-500 transition-colors">
              <div className="flex items-center justify-between pb-4">
                <span className="text-sm text-gray-400">Case study</span>
                <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-6" />
              </div>
              <div className="pb-4">
                <span className="text-white font-bold text-2xl">TOYOTA</span>
              </div>
              <div>
                <p className="text-white text-lg leading-snug">
                  Discover how to bridge the knowledge gap between teams and
                  prepare for any cyber incident.
                </p>
              </div>
            </div>
          </a>

          <a
            className="group"
            href="https://resources.hackthebox.com/hubfs/HTB%20Cybersecurity%20Professional%20Development%20Buyers%20Guide%202025.pdf"
            target="_blank"
          >
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 h-full flex flex-col justify-between relative hover:border-gray-500 transition-colors">
              <div className="flex items-center justify-between pb-4">
                <span className="text-sm text-gray-400">Why Hack The Box?</span>
                <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity absolute top-6 right-6" />
              </div>
              <div className="pb-4">
                <Image
                  className="w-auto h-16"
                  src={bookIcon.imageUrl}
                  alt={bookIcon.description}
                  data-ai-hint={bookIcon.imageHint}
                  width={62}
                  height={64}
                />
              </div>
              <div>
                <p className="text-white text-lg leading-snug">
                  High-performing cyber teams need to continuously adapt to new
                  threats, benchmark skills, and retain talent.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
