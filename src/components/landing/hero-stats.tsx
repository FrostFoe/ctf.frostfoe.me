export default function HeroStats() {
  return (
    <section className="w-full max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-2xl p-8 md:p-10 flex flex-col justify-center h-full text-center lg:text-left">
          <div>
            <p className="text-6xl md:text-8xl font-extrabold text-lime-400 mb-4">
              ৫০%
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-snug">
              এবং আরও গুরুত্বপূর্ণ সাইবার ঘটনা দক্ষতার অভাব বা মানুষের ভুলের কারণে
              ঘটে।
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 md:p-10 flex flex-col justify-center h-full relative overflow-hidden min-h-[250px] lg:min-h-0 text-center lg:text-left">
          <div>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 leading-snug">
              অসম্ভবকে হার মানান।
              <br />
              আপনার কর্মক্ষমতা
              <br />
              অনুকূল করুন।
            </p>
          </div>

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
        </div>
      </div>
    </section>
  );
}
