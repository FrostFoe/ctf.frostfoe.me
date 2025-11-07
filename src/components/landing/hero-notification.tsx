import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HeroNotification() {
  const megaphoneIcon = PlaceHolderImages.find(
    (img) => img.id === "megaphone-icon",
  )!;
  return (
    <section className="w-full max-w-7xl">
      <a
        href="#"
        className="block group text-decoration-none"
        aria-label="Threat Range সম্পর্কে সর্বশেষ খবর পড়ুন"
      >
        <div className="bg-lime-950 border border-lime-800/70 rounded-2xl p-6 md:p-12 shadow-2xl shadow-lime-950/30 transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-lime-800/20 group-hover:border-lime-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 text-center lg:text-left">
              <span className="inline-block bg-lime-900/80 text-lime-300 text-xs font-bold tracking-wider px-4 py-1 rounded-full uppercase mb-5">
                সর্বশেষ সংবাদ
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-lime-200 mb-4">
                থ্রেট রেঞ্জ উপস্থাপন করা হচ্ছে:
                <br className="hidden md:block" /> প্রতিরক্ষামূলক টিমের জন্য
                একটি নতুন লাইভ-ফায়ার সিমুলেশন
              </h2>
              <p className="text-sm md:text-lg text-lime-200 opacity-80 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                HTB থ্রেট রেঞ্জ একটি টিম-ভিত্তিক লাইভ-ফায়ার সিমুলেশন যা বাস্তবসম্মত
                সাইবার আক্রমণ পরিস্থিতিতে SOC এবং DFIR পরীক্ষা করে। সনাক্তকরণ এবং
                তদন্ত তীক্ষ্ণ করুন, বাস্তব নিরাপত্তা মেট্রিক্সের সাথে কর্মক্ষমতা
                বেঞ্চমার্ক করুন, এবং একটি সহযোগী গেমপ্লেতে টিমের মধ্যে বাধাগুলি
                ভেঙে ফেলুন।
              </p>
            </div>
            <div className="lg:col-span-1 flex items-center justify-center row-start-1 lg:row-start-auto">
              <Image
                src={megaphoneIcon.imageUrl}
                alt={megaphoneIcon.description}
                data-ai-hint={megaphoneIcon.imageHint}
                width={160}
                height={160}
                className="w-24 h-24 md:w-40 md:h-40 object-contain opacity-70 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}
