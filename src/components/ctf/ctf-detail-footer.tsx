"use client";

export default function CtfDetailFooter() {
  return (
    <div className="w-full border-t border-slate-700 bg-slate-900/50 py-8 px-4 sm:px-6 md:px-8 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
        <div className="text-center sm:text-left">
          <p>© 2025 Hack The Box. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4">
          <a
            href="/contact"
            className="hover:text-lime-400 transition-colors duration-200"
          >
            Contact Us
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="/user-agreement"
            className="hover:text-lime-400 transition-colors duration-200"
          >
            User Agreement
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="/privacy"
            className="hover:text-lime-400 transition-colors duration-200"
          >
            Privacy Notice
          </a>
          <span className="text-slate-600">•</span>
          <a
            href="/cookies"
            className="hover:text-lime-400 transition-colors duration-200"
          >
            Cookie Settings
          </a>
        </div>
      </div>
    </div>
  );
}
