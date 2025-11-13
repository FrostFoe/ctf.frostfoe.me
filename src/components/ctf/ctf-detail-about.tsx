"use client";

interface CtfEvent {
  description: string;
  [key: string]: unknown;
}

interface CtfDetailAboutProps {
  event: CtfEvent;
}

export default function CtfDetailAbout({ event }: CtfDetailAboutProps) {
  return (
    <div className="w-full py-8 sm:py-10 md:py-12 px-0">
      <div>
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8">
          ইভেন্ট সম্পর্কে
        </h2>

        {/* Description */}
        <div className="space-y-4 sm:space-y-6 text-slate-300 leading-relaxed">
          {event.description.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="text-sm sm:text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Optional Help Link */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-xs sm:text-sm">
            সাহায্য প্রয়োজন? আমাদের{" "}
            <a
              href="/help"
              className="text-lime-400 hover:text-lime-300 underline font-semibold transition-colors"
            >
              পাবলিক হেল্প সেন্টার
            </a>{" "}
            দেখুন
          </p>
        </div>
      </div>
    </div>
  );
}
