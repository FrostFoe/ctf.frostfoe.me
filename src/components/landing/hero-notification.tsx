import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function HeroNotification() {
  const megaphoneIcon = {
    imageUrl: "/images/megaphone.webp",
    description: "Megaphone icon",
    imageHint: "megaphone illustration",
  };
  return (
    <section className="w-full">
      <a
        href="#"
        className="block group text-decoration-none"
        aria-label="Threat Range সম্পর্কে সর্বশেষ খবর পড়ুন"
      >
        <Card className="bg-lime-950 border border-lime-800/70 rounded-lg sm:rounded-2xl shadow-2xl shadow-lime-950/30 transition-all duration-300 ease-in-out group-hover:shadow-lime-800/20 group-hover:border-lime-700">
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center">
              <div className="lg:col-span-2 text-center lg:text-left">
                <span className="inline-block bg-lime-900/80 text-lime-300 text-xs font-bold tracking-wider px-3 sm:px-4 py-1 rounded-full uppercase mb-3 sm:mb-5">
                  সর্বশেষ সংবাদ
                </span>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-lime-200 mb-3 sm:mb-4 break-words">
                  থ্রেট রেঞ্জ উপস্থাপন করা হচ্ছে:
                  <br className="hidden md:block" /> প্রতিরক্ষামূলক টিমের জন্য
                  একটি নতুন লাইভ-ফায়ার সিমুলেশন
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base lg:text-lg text-lime-200 opacity-80 leading-relaxed max-w-3xl mx-auto lg:mx-0 break-words">
                  HTB থ্রেট রেঞ্জ একটি টিম-ভিত্তিক লাইভ-ফায়ার সিমুলেশন যা
                  বাস্তবসম্মত সাইবার আক্রমণ পরিস্থিতিতে SOC এবং DFIR পরীক্ষা
                  করে। সনাক্তকরণ এবং তদন্ত তীক্ষ্ণ করুন, বাস্তব নিরাপত্তা
                  মেট্রিক্সের সাথে কর্মক্ষমতা বেঞ্চমার্ক করুন, এবং একটি সহযোগী
                  গেমপ্লেতে টিমের মধ্যে বাধাগুলি ভেঙে ফেলুন।
                </CardDescription>
              </div>
              <div className="lg:col-span-1 flex items-center justify-center row-start-1 lg:row-start-auto">
                <Image
                  src={megaphoneIcon.imageUrl}
                  alt={megaphoneIcon.description}
                  data-ai-hint={megaphoneIcon.imageHint}
                  width={160}
                  height={160}
                  priority
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain opacity-70 transition-all duration-300 ease-in-out group-hover:opacity-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </a>
    </section>
  );
}
