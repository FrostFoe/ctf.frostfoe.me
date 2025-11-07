import HeroCarrer from "@/components/landing/hero-carrer";
import HeroDomains from "@/components/landing/hero-domains";
import HeroNotification from "@/components/landing/hero-notification";
import HeroSkills from "@/components/landing/hero-skills";
import HeroStats from "@/components/landing/hero-stats";
import HeroWork from "@/components/landing/hero-work";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-background p-4">
      <Nav />
      <main className="flex flex-col items-center justify-center gap-6">
        <HeroNotification />
        <HeroStats />
        <HeroSkills />
        <HeroDomains />
        <HeroWork />
        <HeroCarrer />
      </main>
    </div>
  );
}
