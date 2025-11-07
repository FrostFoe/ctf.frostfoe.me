import Image from "next/image";

export default function HeroNotification() {
  return (
    <section className="w-full max-w-6xl">
      {/* Replicating the "latest-news" link-card */}
      <a
        href="#"
        className="block group text-decoration-none"
        aria-label="Read latest news about Threat Range"
      >
        {/* Main Content Block */}
        {/* We use a custom dark background color and lime-colored border */}
        <div className="bg-lime-950 border border-lime-800/70 rounded-2xl p-8 md:p-12 shadow-2xl shadow-lime-950/30 transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-lime-800/20 group-hover:border-lime-700">
          {/* Grid layout for text and icon */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Side: Text Content */}
            <div className="lg:col-span-2">
              {/* LATEST NEWS Badge */}
              <span className="inline-block bg-lime-900/80 text-lime-300 text-xs font-bold tracking-wider px-4 py-1 rounded-full uppercase mb-5">
                Latest News
              </span>

              {/* Main Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-lime-200 mb-4">
                Introducing Threat Range:
                <br /> A new live-fire simulation for defensive teams
              </h2>

              {/* Description Text */}
              <p className="text-base md:text-lg text-lime-200 opacity-80 leading-relaxed">
                HTB Threat Range is a team-based live-fire simulation that test
                SOC and DFIR under realistic cyber attack scenarios. Sharpen
                detection and investigation, benchmark performance with real
                security metrics, and break down silos between teams in a
                collaborative gameplay.
              </p>
            </div>

            {/* Right Side: Icon */}
            {/* The icon will scale and brighten on hover */}
            <div className="lg:col-span-1 flex items-center justify-center row-start-1 lg:row-start-auto">
              <Image
                src="https://www.hackthebox.com/images/landingv3/megaphone.webp"
                alt="Megaphone icon"
                width={160}
                height={160}
                className="w-32 h-32 md:w-40 md:h-40 object-contain opacity-70 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}
