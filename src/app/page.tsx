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
    <div className="flex min-h-screen w-full flex-col items-center bg-background">
      <Nav />
      <main className="flex w-full flex-col items-center justify-center gap-6 px-4 py-6 sm:px-6 md:px-8 lg:px-0">
        <div className="w-full max-w-7xl">
          <HeroNotification />
        </div>
        <div className="w-full max-w-7xl">
          <HeroStats />
        </div>
        <div className="w-full max-w-7xl">
          <HeroSkills />
        </div>
        <div className="w-full max-w-7xl">
          <HeroDomains />
        </div>
        <div className="w-full max-w-7xl">
          <HeroWork />
        </div>
        <div className="w-full max-w-7xl">
          <HeroCarrer />
        </div>
        <div className="w-full max-w-7xl">
          <Partners />
        </div>
      </main>
      <Footer />
    </div>
  );
}
