import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    value: "60%",
    description:
      "Of ATT&CK and adversary techniques left unmonitored with siloed security teams.",
  },
  {
    value: "10+",
    description:
      "The estimated dwell time (in days) for attacks without proactive detection.",
  },
  {
    value: "$10m",
    description:
      "The possible regulatory fines for missing mandatory threat-led penetration testing.",
  },
];

export default function Stats() {
  return (
    <section className="w-full">
      <h2 className="mb-8 text-center text-3xl font-medium text-white md:text-5xl lg:text-left lg:text-6xl">
        Turn threat intelligence into actions
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="rounded-xl border-2 border-purple-500/20 bg-gradient-to-bl from-purple-950/30 to-gray-900/20 p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:border-purple-500/40"
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
