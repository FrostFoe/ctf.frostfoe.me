import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    value: "14%",
    description:
      "Of companies have in-house exploit expertise to meet today's threat landscape.",
  },
  {
    value: "3x",
    description:
      "Skill gaps triple mean time to respond, extending breach impact windows and costs.",
  },
  {
    value: "35%",
    description:
      "Decrease in risk and security incidents with threat-led pentesting programs in place.",
  },
];

export default function Stats() {
  return (
    <section className="w-full">
      <h2 className="mb-8 text-center text-3xl font-medium text-white md:text-5xl lg:text-left lg:text-6xl">
        Why offensive skills matter now
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="rounded-xl border-2 border-red-500/20 bg-gradient-to-bl from-red-950/30 to-gray-900/20 p-6 shadow-lg"
          >
            <CardHeader className="p-0">
              <CardTitle className="text-7xl font-bold text-white md:text-8xl">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-4">
              <CardDescription className="text-base text-gray-300">
                {stat.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
