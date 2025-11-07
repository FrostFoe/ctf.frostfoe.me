import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    value: "70%",
    description:
      "Of SOC Analysts report alert fatigue and missed detections, leading to critical security incidents going unnoticed.",
  },
  {
    value: "3x",
    description:
      "Skill gaps triple mean time to respond, extending breach impact windows and costs.",
  },
  {
    value: "$3.5m",
    description:
      "The average cost of regulatory fines and reputational damage from delayed breach detection.",
  },
];

export default function Stats() {
  return (
    <section className="w-full">
      <h2 className="mb-8 text-center text-3xl font-medium text-white md:text-5xl lg:text-left lg:text-6xl">
        Blue team skills directly impact risk exposure
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="rounded-xl border-2 border-blue-500/20 bg-gradient-to-bl from-blue-950/30 to-gray-900/20 p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-blue-500/40"
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
