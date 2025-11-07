import HeroNotification from "@/components/landing/hero-notification";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <main className="flex flex-col items-center justify-center">
        <HeroNotification />
      </main>
    </div>
  );
}
