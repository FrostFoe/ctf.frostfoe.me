"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const Typewriter = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const toRotate = ["hackers"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1),
      );

      setTypingSpeed(isDeleting ? 100 : 200);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, toRotate, typingSpeed]);

  return (
    <span className="inline-block min-w-[240px] md:min-w-[380px] lg:min-w-[480px]">
      <span>{text}</span>
      <span className="animate-ping">|</span>
    </span>
  );
};

export default function Footer() {
  const discordButton = PlaceHolderImages.find((img) => img.id === "discord-button")!;
  const g2Rating = PlaceHolderImages.find((img) => img.id === "g2-rating")!;

  return (
    <footer className="w-full max-w-7xl py-8">
      <div className="container mx-auto">
        <div className="bg-gray-800 border border-gray-700 rounded-lg">
          <div className="py-12 px-4 flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center text-center">
              <h3 className="text-lime-400 text-4xl sm:text-6xl lg:text-8xl font-bold pb-4 mb-0">
                <span className="whitespace-nowrap">4.1m+ </span>
                <Typewriter />
              </h3>
              <p className="text-base md:text-lg text-gray-300 pb-6 mb-0 max-w-md mx-auto">
                Chat about labs, share resources and jobs.
                <br className="hidden sm:block" /> Connect with 200k+ hackers
                from all over the world.
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
