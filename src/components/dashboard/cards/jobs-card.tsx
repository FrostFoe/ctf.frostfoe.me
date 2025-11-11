"use client";

// ArrowRight not used here

export default function JobsCard() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-linear-to-r from-slate-900/80 to-slate-800/40 border border-slate-800 hover:border-slate-700 transition-all duration-300 p-6 md:p-8">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center font-bold text-white text-lg">
              💼
            </div>
            <div className="w-16 h-8 bg-slate-700 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-slate-300">জবস</span>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            হ্যাক দ্য বক্সের সাথে সাইবারসিকিউরিটিতে আপনার পরবর্তী চাকরি খুঁজুন
          </h3>
          <p className="text-sm text-slate-400">
            বিশ্বব্যাপী সাইবারসিকিউরিটি বিশেষজ্ঞ এবং চাকরির সাথে আবিষ্কার এবং
            সংযোগ স্থাপনের জন্য সেরা সম্পদ।
          </p>
        </div>

        <button className="shrink-0 px-4 sm:px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base group/btn">
          চাকরি খুঁজুন
        </button>
      </div>
    </div>
  );
}
