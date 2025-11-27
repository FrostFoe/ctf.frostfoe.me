import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HeroStats() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-gray-800 rounded-lg sm:rounded-2xl flex flex-col justify-center h-full text-center lg:text-left p-4 sm:p-6 md:p-8">
          <CardHeader className="p-0">
            <CardTitle className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-lime-400">
              ৫০%
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-200 leading-snug break-words">
              এবং আরও গুরুত্বপূর্ণ সাইবার ঘটনা দক্ষতার অভাব বা মানুষের ভুলের
              কারণে ঘটে।
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 rounded-lg sm:rounded-2xl flex flex-col justify-center h-full relative overflow-hidden min-h-[250px] lg:min-h-0 text-center lg:text-left p-4 sm:p-6 md:p-8">
          <CardContent className="p-0">
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-200 leading-snug break-words">
              অসম্ভবকে হার মানান।
              <br />
              আপনার কর্মক্ষমতা
              <br />
              অনুকূল করুন।
            </p>
          </CardContent>

          <div className="absolute bottom-0 left-0 w-full h-1/2">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 50"
            >
              <path
                d="M 0 40 C 10 40, 15 25, 25 30 S 40 45, 50 40 S 60 15, 70 18 S 85 5, 100 15 L 100 50 L 0 50 Z"
                className="text-lime-500 opacity-20"
                fill="currentColor"
              ></path>
              <path
                d="M 0 40 C 10 40, 15 25, 25 30 S 40 45, 50 40 S 60 15, 70 18 S 85 5, 100 15"
                fill="none"
                className="text-lime-400"
                stroke="currentColor"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        </Card>
      </div>
    </section>
  );
}
