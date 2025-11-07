import { Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <main className="flex flex-col items-center justify-center p-4 text-center animate-in fade-in-0 zoom-in-95 duration-500">
        <div className="mb-8 rounded-full border border-primary/20 bg-primary/10 p-6 shadow-sm">
          <Globe className="h-16 w-16 text-primary" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Hello World
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Welcome to ctf.frostfoe.me. You've just set up a world-class application. Now, go build something amazing.
        </p>
      </main>
    </div>
  );
}
