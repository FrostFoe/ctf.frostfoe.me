"use client";

interface CtfEvent {
  description: string;
  [key: string]: any;
}

interface CtfDetailAboutProps {
  event: CtfEvent;
}

export default function CtfDetailAbout({ event }: CtfDetailAboutProps) {
  return (
    <div className="w-full py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-3xl">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          About the Event
        </h2>

        {/* Description */}
        <div className="space-y-6 text-slate-300 leading-relaxed">
          {event.description.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Optional Help Link */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            Need help? Check our{" "}
            <a
              href="/help"
              className="text-lime-400 hover:text-lime-300 underline font-semibold transition-colors"
            >
              Public Help Center
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
