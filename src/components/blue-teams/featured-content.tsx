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
    image: PlaceHolderImages.find((img) => img.id === "blue-team-monitoring")!,
    category: "SOC",
    title: "Security Monitoring & SIEM Fundamentals",
    description:
      "Explore the application of the MITRE ATT&CK framework within SOC and introduce SIEM (KQL) query development.",
    tags: ["SIEM Query", "Threat Alerting", "Compliance"],
  },
  {
    image: PlaceHolderImages.find((img) => img.id === "blue-team-openhouse")!,
    category: "DFIR",
    title: "OpenHouse",
    description:
      "Combine information from IOCs and forensic evidence with threat intelligence sources to determine a threat actor attack chain.",
    tags: ["Malware Analysis", "WireShark", "Networking"],
  },
  {
    image: PlaceHolderImages.find(
      (img) => img.id === "blue-team-encrypted-filled",
    )!,
    category: "MEDIUM",
    title: "Blue Team Analyst - Level 1",
    description:
      "Respond to attacks, analyze security logs, and follow incident response procedures. Demonstrate the ability to identify and mitigate threats.",
    tags: ["Network Traffic Analysis", "YARA Rules", "Digital Forensics"],
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
            <Card className="flex h-full transform flex-col justify-between rounded-xl border border-blue-500/30 bg-gradient-to-t from-blue-950/40 to-transparent p-4 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:border-blue-500/60 group-hover:shadow-lg group-hover:shadow-blue-950/50">
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
