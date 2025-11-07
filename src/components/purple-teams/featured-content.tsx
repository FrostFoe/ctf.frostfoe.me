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
    image: PlaceHolderImages.find(
      (img) => img.id === "purple-team-monitoring",
    )!,
    category: "RANGE",
    title: "Windows Attack & Defense",
    description:
      "Cover the commonly performed attacks by threat actors. Learn prevention and detection methods against Active Directory environments.",
    tags: ["Kerberoasting", "Active Directory", "Event Logs"],
  },
  {
    image: PlaceHolderImages.find((img) => img.id === "purple-team-openhouse")!,
    category: "APT",
    title: "HorsePanda & HorsePanda-D",
    description:
      "Test or defend systems against Mustang Panda’s techniques combining offensive and defensive scenarios based on their attack campaigns.",
    tags: ["Malware Analysis", "Nation State", "Phishing"],
  },
  {
    image: PlaceHolderImages.find(
      (img) => img.id === "purple-team-encrypted-filled",
    )!,
    category: "BEGINNER",
    title: "Malware Reversing – Essentials",
    description:
      "A 2-day team assessment to cover adversary-level insights, improving defensive strategies, malware triage, and forensic investigations.",
    tags: ["Threat Hunting", "Incident Response", "Detection"],
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
            <Card className="flex h-full transform flex-col justify-between rounded-xl border border-purple-500/30 bg-gradient-to-t from-purple-950/40 to-transparent p-4 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:border-purple-500/60 group-hover:shadow-lg group-hover:shadow-purple-950/50">
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
