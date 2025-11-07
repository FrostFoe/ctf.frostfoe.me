import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const stats = [
  {
    value: "3x",
    label: "Faster ramping time for new hires",
  },
  {
    value: "90%",
    label: "MITRE and NIST coverage in 6 months",
  },
  {
    value: "50%",
    label: "Decrease in time patching CVEs",
  },
];

const features = [
  {
    icon: PlaceHolderImages.find(
      (img) => img.id === "red-team-learning-logo-1",
    )!,
    title: "Full-scope adversary",
    description:
      "Replicate full kill chains, from open-source recon to final data exfiltration, to understand how early actions cascade into business critical impact.",
  },
  {
    icon: PlaceHolderImages.find(
      (img) => img.id === "red-team-learning-logo-2",
    )!,
    title: "Continuous skill measurement",
    description:
      "Use advanced reporting and analytics to have accurate, real-time visibility into teams' skill proficiency at any time. Identify critical gaps and build future plans.",
  },
  {
    icon: PlaceHolderImages.find(
      (img) => img.id === "red-team-learning-logo-3",
    )!,
    title: "Framework alignment",
    description:
      "All our content library maps to NIST and MITRE frameworks, ensuring your team builds skills keeping up with the threat landscape and regulatory requirements.",
  },
];

export default function Methodology() {
  const methodologyImage = PlaceHolderImages.find(
    (img) => img.id === "red-team-learning",
  )!;

  return (
    <section className="w-full">
      <div className="rounded-lg border border-red-500/20 bg-gradient-to-b from-red-950/20 to-transparent p-8 md:p-12">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-medium text-white md:text-5xl lg:text-6xl">
              Hands-on-first learning methodology
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-300 md:text-xl">
              Our platform focuses on practical skills development in real-world
              environments, not theoretical knowledge that doesn't transfer to
              actual red team engagements.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="rounded-lg border border-red-500/30 bg-black/30 p-4 text-center"
                >
                  <CardHeader className="p-0">
                    <CardTitle className="text-3xl font-bold text-white">
                      {stat.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-2">
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              src={methodologyImage.imageUrl}
              alt={methodologyImage.description}
              width={500}
              height={400}
              className="mx-auto h-auto w-full max-w-md object-contain"
              data-ai-hint={methodologyImage.imageHint}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <a key={feature.title} href="#" className="group block h-full">
            <Card className="h-full transform rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-105 group-hover:border-red-500/30 group-hover:shadow-lg group-hover:shadow-red-950/50">
              <CardHeader className="p-0">
                <Image
                  src={feature.icon.imageUrl}
                  alt={feature.icon.description}
                  width={60}
                  height={60}
                  className="mb-4 h-16 w-16"
                  data-ai-hint={feature.icon.imageHint}
                />
                <CardTitle className="text-xl font-medium text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
