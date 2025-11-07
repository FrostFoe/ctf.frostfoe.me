import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Hero from "@/components/purple-teams/hero";
import Stats from "@/components/purple-teams/stats";
import Methodology from "@/components/purple-teams/methodology";
import UseCases from "@/components/purple-teams/use-cases";
import FeaturedContent from "@/components/purple-teams/featured-content";
import DataDriven from "@/components/purple-teams/data-driven";

export default function PurpleTeamsPage() {
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
