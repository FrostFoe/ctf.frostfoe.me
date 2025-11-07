"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const logos = [
  {
    src: "https://www.hackthebox.com/images/landingv3/contact-us-deloitte.svg",
    alt: "Deloitte",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/contact-us-toyota.svg",
    alt: "Toyota",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/contact-us-siemens.svg",
    alt: "Siemens",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/contact-us-google.svg",
    alt: "Google",
  },
];

export default function Cta() {
  return (
    <section className="w-full">
      <div className="rounded-lg border border-blue-500/20 bg-gray-900/50 p-8 md:p-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-medium text-blue-300">
                Get a full demo with our team
              </CardTitle>
              <CardDescription className="pt-4 text-lg text-gray-400">
                Fill the form to schedule a live product demo and Q&A about our
                cyber readiness solutions.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form className="mt-8 space-y-4">
                <input
                  type="email"
                  placeholder="Business email*"
                  className="w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400"
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First name*"
                    className="w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Last name*"
                    className="w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Company*"
                    className="w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Security / IT team size*"
                    className="w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Department*"
                  className="w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="I'm looking for help with...*"
                  className="w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400"
                />
                <textarea
                  placeholder="Tell us more about your project, needs, and timeline."
                  className="w-full rounded-md border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400"
                  rows={4}
                ></textarea>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-green-500 text-black hover:bg-green-400"
                >
                  Submit
                </Button>
              </form>
              <p className="mt-4 text-xs text-gray-500">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </CardContent>
          </div>
          <div className="hidden items-center justify-center rounded-lg border-l border-gray-700 p-8 lg:flex">
            <div>
              <CardTitle className="text-3xl font-medium text-blue-300">
                The #1 platform to build attack-ready teams and organizations
              </CardTitle>
              <CardDescription className="mt-4 text-lg text-gray-400">
                Maximum curriculum management flexibility, enhanced skills
                reporting, and engaging gamification features. Book a demo to
                see Hack The Box in action.
              </CardDescription>
              <div className="mt-8">
                <p className="font-semibold text-white">Your plan includes</p>
                <ul className="mt-4 space-y-2 text-gray-400">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span> Unmatched
                    content library
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span> Workforce
                    development plans
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span> Centralized
                    user management
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span> Advanced
                    analytics & reporting
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-400">✓</span> Source, hire,
                    and retain talent
                  </li>
                </ul>
              </div>
              <div className="mt-12 flex items-center justify-around gap-4">
                {logos.map((logo, index) => (
                  <Image
                    key={index}
                    src={logo.src}
                    alt={logo.alt}
                    width={80}
                    height={20}
                    className="h-5 w-auto object-contain grayscale"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
