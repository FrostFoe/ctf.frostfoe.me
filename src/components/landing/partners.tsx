"use client";

import Image from "next/image";

const logos = [
  {
    src: "/images/thn.png",
    alt: "The Hacker News",
  },
  {
    src: "/images/mnr.png",
    alt: "Maniruzzaman",
  },
];

export default function Partners() {
  return (
    <div className="w-full overflow-hidden py-8 sm:py-10 md:py-12">
      <div className="flex animate-marquee-infinite">
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="mx-3 sm:mx-4 md:mx-5 shrink-0">
            <Image
              className="max-w-[100px] sm:max-w-[125px] h-[24px] sm:h-[30px] object-contain"
              src={logo.src}
              alt={logo.alt}
              width={125}
              height={30}
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/125x30/111827/FFFFFF?text=${encodeURIComponent(
                  logo.alt,
                )}`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
