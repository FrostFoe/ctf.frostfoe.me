"use client";

export default function CtfDetailFooter() {
  return (
    <div className="w-full border-t border-slate-700 bg-slate-900/50 py-8 px-4 sm:px-6 md:px-8 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
        <div className="text-center sm:text-left">
          <p>© ২০২৫ হ্যাক দ্য বক্স। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <a
            href="/contact"
            className="hover:text-lime-400 transition-colors duration-200"
          >
            যোগাযোগ করুন
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="/user-agreement"
            className="hover:text-lime-400 transition-colors duration-200"
          >
            ব্যবহারকারী চুক্তি
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="/privacy"
            className="hover:text-lime-400 transition-colors duration-200"
          >
            গোপনীয়তা বিজ্ঞপ্তি
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="/cookies"
            className="hover:text-lime-400 transition-colors duration-200"
          >
            কুকি সেটিংস
          </a>
        </div>
      </div>
    </div>
  );
}
