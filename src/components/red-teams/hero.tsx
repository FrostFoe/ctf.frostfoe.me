import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-lg border border-red-500/20 p-8 md:p-12 lg:p-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.hackthebox.com/images/landingv3/job_roles/hero-red.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10">
          <span className="mb-4 inline-block rounded-full border border-red-700 bg-red-900 px-4 py-2 text-sm font-bold uppercase tracking-wider text-red-400">
            HTB FOR RED TEAMS
          </span>
          <h1 className="text-4xl font-medium text-white md:text-6xl">
            Quantify and manage your
            <br />
            cyber risk exposure
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300 md:text-xl">
            Think like attackers—simulate threats, track progress and prove
            readiness with courses, ranges, or team exercises.
          </p>
          <div className="my-6 flex items-center">
            <div className="flex -space-x-3">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="User 1"
                width={50}
                height={50}
                className="h-12 w-12 rounded-full border-2 border-gray-800"
                data-ai-hint="man portrait"
              />
              <Image
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80"
                alt="User 2"
                width={50}
                height={50}
                className="h-12 w-12 rounded-full border-2 border-gray-800"
                data-ai-hint="woman portrait"
              />
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="User 3"
                width={50}
                height={50}
                className="h-12 w-12 rounded-full border-2 border-gray-800"
                data-ai-hint="woman portrait"
              />
            </div>
            <p className="ml-4 text-gray-300">
              Trusted by 1,000+ cybersecurity teams
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-green-500 text-black hover:bg-green-400"
            >
              Launch exploit lab
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Watch a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
