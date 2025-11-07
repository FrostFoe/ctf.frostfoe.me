"use client";

import Image from "next/image";

const logos = [
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-easports.svg",
    alt: "ea sports",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-deloitte.svg",
    alt: "deloitte",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-intel.svg",
    alt: "intel",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-siemens.svg",
    alt: "siemens",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-synack.svg",
    alt: "synack",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-adeptis.svg",
    alt: "adeptis",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-aws.svg",
    alt: "aws",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-context.svg",
    alt: "context",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-faraday.svg",
    alt: "faraday",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-dassaultsystems.svg",
    alt: "dassaultsystems",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-nordea.svg",
    alt: "nordea",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-nviso.svg",
    alt: "nviso",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-universityofsouthflorida.svg",
    alt: "university of south florida",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-the-university-of-sydney.svg",
    alt: "university of sydney",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-google.svg",
    alt: "google",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-toyota.svg",
    alt: "toyota",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-lufthansa.svg",
    alt: "lufthansa",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-booking.svg",
    alt: "booking",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-raytheon.svg",
    alt: "raytheon",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-standard-chartered.svg",
    alt: "standard chartered",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-state-farm.svg",
    alt: "dassaultsystems",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-arizona-university.png",
    alt: "arizona university",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-drake.png",
    alt: "drake university",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-security-risk.png",
    alt: "security risk",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-puma.svg",
    alt: "puma",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-nyu.png",
    alt: "nyu",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-ynov-campus.svg",
    alt: "ynov campus",
  },
  {
    src: "https://www.hackthebox.com/images/landingv3/banner-logo-bugcrowd.svg",
    alt: "bugcrowd",
  },
];

export default function Partners() {
  return (
    <div className="w-full overflow-hidden py-10 bg-rich-black">
      <div className="flex animate-marquee-infinite">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="mx-5 flex-shrink-0">
            <Image
              className="max-w-[125px] h-[30px] object-contain"
              src={logo.src}
              alt={logo.alt}
              width={125}
              height={30}
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/125x30/111827/FFFFFF?text=${encodeURIComponent(logo.alt)}`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
