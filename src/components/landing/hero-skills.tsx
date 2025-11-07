"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="-3 -3 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#0b121f"
      d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
    ></path>
    <path
      stroke="#0b121f"
      d="M1.75 8H11"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
  </svg>
);

export default function HeroSkills() {
  const skillCards = [
    {
      title: "Learning Paths",
      description:
        "Fully guided journeys into a wide range of skills or proficiency in specific security job-roles.",
      image: PlaceHolderImages.find((img) => img.id === "learning-paths-asset")!,
    },
    {
      title: "Real-world Scenarios",
      description:
        "Cutting-edge labs focusing on the latest technologies and attack vectors — released every week!",
      image: PlaceHolderImages.find((img) => img.id === "real-world-scenarios-asset")!,
    },
    {
      title: "Industry Certifications",
      description:
        "Innovative courses and exams that will make a market-ready professional out of you!",
      image: PlaceHolderImages.find((img) => img.id === "industry-certifications-asset")!,
    },
  ];

  return (
    <section className="w-full max-w-7xl py-12">
      <div className="container mx-auto">
        <div className="mb-8">
          <h4 className="text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-8">
            Gamified, hands-on upskilling from{" "}
            <br className="hidden sm:block" /> cybersecurity fundamentals to
            advanced scenarios.
          </h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              asChild
              className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-base hover:bg-lime-300 transition-colors"
            >
              <a href="https://www.hackthebox.com/hacker" target="_blank">
                Get started <ArrowIcon />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-gray-300 bg-transparent border border-gray-600 hover:bg-gray-700 font-medium py-2 px-5 rounded-md transition-colors text-base"
            >
              <a href="https://www.hackthebox.com/business-cyber-security-training">
                For teams
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {skillCards.map((card) => (
            <Card
              key={card.title}
              className="bg-gray-800 border-gray-700 h-full flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-white font-semibold pb-3 mb-0">
                  {card.title}
                </CardTitle>
                <p className="text-base text-gray-300 leading-relaxed">
                  {card.description}
                </p>
              </CardHeader>
              <CardContent className="flex justify-center items-center p-4 pt-0">
                <Image
                  className="w-full h-auto"
                  src={card.image.imageUrl}
                  alt={card.image.description}
                  data-ai-hint={card.image.imageHint}
                  width={400}
                  height={250}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
