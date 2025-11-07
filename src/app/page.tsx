import HeroNotification from "@/components/landing/hero-notification";
import HeroStats from "@/components/landing/hero-stats";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <main className="flex flex-col items-center justify-center gap-6">
        <HeroNotification />
        <HeroStats />
      </main>
    </div>
  );
}
