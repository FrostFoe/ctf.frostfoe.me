import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Hero from "@/components/red-teams/hero";
import Stats from "@/components/red-teams/stats";
import Methodology from "@/components/red-teams/methodology";
import UseCases from "@/components/red-teams/use-cases";
import FeaturedContent from "@/components/red-teams/featured-content";
import DataDriven from "@/components/red-teams/data-driven";

export default function RedTeamsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-6 p-4">
      <Nav />
      <main className="flex w-full max-w-7xl flex-col items-center justify-center gap-12 md:gap-16 lg:gap-20">
        <div className="w-full animate-slide-in-from-bottom animation-delay-400">
          <Hero />
        </div>
        <div className="w-full animate-slide-in-from-bottom animation-delay-500">
          <Stats />
        </div>
        <div className="w-full animate-slide-in-from-bottom animation-delay-600">
          <Methodology />
        </div>
        <div className="w-full animate-slide-in-from-bottom animation-delay-700">
          <UseCases />
        </div>
        <div className="w-full animate-slide-in-from-bottom animation-delay-800">
          <FeaturedContent />
        </div>
        <div className="w-full animate-slide-in-from-bottom animation-delay-900">
          <DataDriven />
        </div>
      </main>
      <Footer />
    </div>
  );
}
