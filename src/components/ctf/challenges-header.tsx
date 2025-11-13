"use client";

import { Badge } from "@/components/ui/badge";

export default function ChallengesHeader() {
  return (
    <div className="mb-8 space-y-4 ">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            চ্যালেঞ্জেস
          </h1>
          <p className="mt-2 text-slate-400">
            সিকিউরিটি চ্যালেঞ্জ এবং হ্যাকিং প্রতিযোগিতায় অংশগ্রহণ করুন
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Badge
          variant="outline"
          className="bg-lime-400/10 border-lime-400/30 text-lime-400"
        >
          সক্রিয়: 24টি চ্যালেঞ্জ
        </Badge>
        <Badge
          variant="outline"
          className="bg-blue-400/10 border-blue-400/30 text-blue-400"
        >
          সম্পন্ন: 156টি
        </Badge>
        <Badge
          variant="outline"
          className="bg-purple-400/10 border-purple-400/30 text-purple-400"
        >
          মোট: 312টি
        </Badge>
      </div>
    </div>
  );
}
