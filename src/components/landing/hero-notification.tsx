import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HeroNotification() {
  const megaphoneIcon = PlaceHolderImages.find((img) => img.id === "megaphone-icon")!;
  return (
    <section className="w-full max-w-7xl">
      <a
        href="#"
        className="block group text-decoration-none"
        aria-label="Read latest news about Threat Range"
      >
        <div className="bg-lime-950 border border-lime-800/70 rounded-2xl p-6 md:p-12 shadow-2xl shadow-lime-950/30 transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-lime-800/20 group-hover:border-lime-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 text-center lg:text-left">
              <span className="inline-block bg-lime-900/80 text-lime-300 text-xs font-bold tracking-wider px-4 py-1 rounded-full uppercase mb-5">
                Latest News
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-lime-200 mb-4">
                Introducing Threat Range:
                <br className="hidden md:block" /> A new live-fire simulation for defensive teams
              </h2>
              <p className="text-sm md:text-lg text-lime-200 opacity-80 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                HTB Threat Range is a team-based live-fire simulation that test
                SOC and DFIR under realistic cyber attack scenarios. Sharpen
                detection and investigation, benchmark performance with real
                security metrics, and break down silos between teams in a
                collaborative gameplay.
              </p>
            </div>
            <div className="lg:col-span-1 flex items-center justify-center row-start-1 lg:row-start-auto">
              <Image
                src={megaphoneIcon.imageUrl}
                alt={megaphoneIcon.description}
                data-ai-hint={megaphoneIcon.imageHint}
                width={160}
                height={160}
                className="w-24 h-24 md:w-40 md:h-40 object-contain opacity-70 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}
