import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const featuredItems = [
  {
    image: PlaceHolderImages.find((img) => img.id === "red-team-monitoring")!,
    category: "AI & ML",
    title: "Introduction to Red Teaming with AI",
    description:
      "Overview the common security vulnerabilities in systems deploying AI and the types of attacks that can be launched against their components.",
    tags: ["Generative AI", "ML Systems", "LLM OWASP Top 10"],
  },
  {
    image: PlaceHolderImages.find((img) => img.id === "red-team-openhouse")!,
    category: "INTERMEDIATE",
    title: "Offshore",
    description:
      "Real-world enterprise attack simulation that features a wide range of modern Active Directory misconfigurations and adversarial techniques.",
    tags: ["Web Applications", "Enumeration", "Active Directory"],
  },
  {
    image: PlaceHolderImages.find(
      (img) => img.id === "red-team-encrypted-filled",
    )!,
    category: "MEDIUM",
    title: "Penetration Testing - Essentials",
    description:
      "10 scenarios for a 2-day team assessment to understand how attackers breach enterprise networks and how to defend against them.",
    tags: ["CVEs", "Exploitation", "Privilege Escalation"],
  },
];

export default function FeaturedContent() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="group block h-full text-decoration-none"
          >
            <Card className="flex h-full transform flex-col justify-between rounded-xl border border-red-500/30 bg-gradient-to-t from-red-950/40 to-transparent p-4 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:border-red-500/60 group-hover:shadow-lg group-hover:shadow-red-950/50">
              <CardHeader className="p-0">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={item.image.imageUrl}
                    alt={item.image.description}
                    width={400}
                    height={250}
                    className="h-auto w-full"
                    data-ai-hint={item.image.imageHint}
                  />
                </div>
                <CardDescription className="font-bold uppercase text-gray-400">
                  {item.category}
                </CardDescription>
                <CardTitle className="mt-2 text-2xl font-medium text-white">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-gray-300">{item.description}</p>
              </CardContent>
              <CardFooter className="mt-4 flex-col items-start p-0">
                <div className="w-full border-t border-gray-700" />
                <p className="mt-4 text-sm font-bold text-gray-400">
                  KEY SKILLS
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-gray-700/50 px-2 py-1 text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
