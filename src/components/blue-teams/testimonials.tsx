import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const testimonials = [
  {
    highlight: "enthusiasts",
    title: "For cybersecurity enthusiasts",
    description:
      "Any individual aiming to kickstart their career in security can easily access our defensive labs and courses. Join a dynamic community with 4 million members and make the cyber world a safer place.",
  },
  {
    highlight: "professionals",
    title: "For cybersecurity professionals",
    description:
      "Elevate your current career path by improving and validating your skills. Become an expert blue teamer and let your organization sleep better at night, knowing that its defenses are in safe hands.",
  },
  {
    highlight: "managers & technical leaders",
    title: "For managers & technical leaders",
    description:
      "New regulatory frameworks now require organizations to demonstrate enhanced detection capabilities. Without modern solutions, teams face increasing pressure and diminishing effectiveness. Fully control your team's cyber readiness.",
  },
];

export default function Testimonials() {
  const cSpireLogo = PlaceHolderImages.find((img) => img.id === "cspire-logo")!;
  const conradBell = PlaceHolderImages.find((img) => img.id === "conrad-bell")!;

  return (
    <section className="w-full">
      <h2 className="mb-8 text-3xl font-medium text-white md:text-5xl">
        How major global organizations
        <br /> transformed their SOC
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-8 rounded-lg border-gray-800 bg-gray-900/50 p-8">
          {testimonials.map((item, index) => (
            <div key={index}>
              <CardTitle className="text-2xl font-medium text-white">
                For cybersecurity{" "}
                <span className="text-blue-400">{item.highlight}</span>
              </CardTitle>
              <CardDescription className="mt-2 text-gray-400">
                {item.description}
              </CardDescription>
            </div>
          ))}
        </Card>
        <Card className="flex flex-col justify-between rounded-lg border-gray-800 bg-gray-900/50 p-8">
          <div>
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="65"
                height="60"
                viewBox="0 0 65 60"
                fill="none"
                className="text-blue-500"
              >
                <path
                  d="M26.4063 28.3019L13.9931 60H0L9.25347 28.3019H0.45139V0H26.4063V28.3019ZM65 28.3019L52.5868 60H38.5938L47.8472 28.3019H39.0451V0H65V28.3019Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <Image
              src={cSpireLogo.imageUrl}
              alt={cSpireLogo.description}
              width={150}
              height={50}
              className="my-8 h-8 w-auto"
              data-ai-hint={cSpireLogo.imageHint}
            />
            <p className="text-lg text-gray-300 italic">
              “HTB changed our whole approach to be more proactive, faster at
              spotting unusual behavior, and better at digging deep during
              investigations. The team's confidence and agility have definitely
              leveled up. Hands-on scenarios helped sharpen our skills in areas
              like forensic analysis, vulnerability assessments, and threat
              hunting. They pushed us to think critically and connect the dots
              faster during real incidents.”
            </p>
          </div>
          <div className="mt-8 flex items-center">
            <Image
              src={conradBell.imageUrl}
              alt={conradBell.description}
              width={50}
              height={50}
              className="h-12 w-12 rounded-full"
              data-ai-hint={conradBell.imageHint}
            />
            <div className="ml-4">
              <p className="font-semibold text-white">Conrad Bell</p>
              <p className="text-sm text-gray-400">
                Chief Information Security Officer
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
