import Footer from "@/components/footer";
import HeroCarrer from "@/components/landing/hero-carrer";
import HeroDomains from "@/components/landing/hero-domains";
import HeroNotification from "@/components/landing/hero-notification";
import HeroSkills from "@/components/landing/hero-skills";
import HeroStats from "@/components/landing/hero-stats";
import HeroWork from "@/components/landing/hero-work";
import Nav from "@/components/nav";
import Partners from "@/components/landing/partners";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-background p-4">
      <Nav />
      <main className="flex w-full flex-col items-center justify-center gap-6">
        <div className="w-full">
          <HeroNotification />
        </div>
        <div className="w-full">
          <HeroStats />
        </div>
        <div className="w-full">
          <HeroSkills />
        </div>
        <div className="w-full">
          <HeroDomains />
        </div>
        <div className="w-full">
          <HeroWork />
        </div>
        <div className="w-full">
          <HeroCarrer />
        </div>
        <div className="w-full">
          <Partners />
        </div>
      </main>
      <Footer />
    </div>
  );
}
