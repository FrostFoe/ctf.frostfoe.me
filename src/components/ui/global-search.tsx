"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useCtfData } from "@/hooks/use-data";

interface EventResult {
  type: "event";
  id: number;
  title: string;
  slug: string;
  description: string;
}

interface ChallengeResult {
  type: "challenge";
  id: number;
  title: string;
  description: string;
  category: string;
}

type SearchResult = EventResult | ChallengeResult;

export function GlobalSearch() {
  const { events } = useCtfData();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const lowercaseQuery = value.toLowerCase();
    const allChallenges = events.flatMap(e => e.challenges || []);
    
    const searchResults: SearchResult[] = [
      ...events
        .filter(
          (event) =>
            event.title?.toLowerCase().includes(lowercaseQuery) ||
            event.description?.toLowerCase().includes(lowercaseQuery),
        )
        .map((event) => ({
          type: "event" as const,
          id: event.id,
          title: event.title,
          slug: event.slug,
          description: event.description || "",
        })),
      ...allChallenges
        .filter(
          (challenge) =>
            challenge.title?.toLowerCase().includes(lowercaseQuery) ||
            challenge.description?.toLowerCase().includes(lowercaseQuery),
        )
        .map((challenge) => ({
          type: "challenge" as const,
          id: challenge.id,
          title: challenge.title,
          description: challenge.description || "",
          category: challenge.category || "",
        })),
    ];

    setResults(searchResults.slice(0, 8));
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xs sm:max-w-md">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-2 text-slate-400 hover:border-slate-600 transition-colors text-xs sm:text-sm"
        aria-label="Global search"
      >
        <Search size={16} className="shrink-0" />
        <span className="truncate hidden sm:inline">অনুসন্ধান...</span>
        <span className="truncate sm:hidden">খুঁজুন</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 max-h-96 flex flex-col w-screen sm:w-auto sm:max-w-md -mx-4 sm:mx-0">
          <div className="p-3 sm:p-4 border-b border-slate-700 shrink-0">
            <div className="flex items-center gap-2 bg-slate-800 rounded px-3 py-2">
              <Search size={16} className="text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder="খুঁজুন..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent outline-hidden text-slate-200 placeholder-slate-500 text-sm min-w-0"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                  }}
                  className="text-slate-500 hover:text-slate-400 shrink-0"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {results.length > 0 ? (
            <div className="overflow-y-auto flex-1">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={
                    result.type === "event"
                      ? `/ctf/${result.slug}`
                      : `/ctf/challenge/${result.id}`
                  }
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    setResults([]);
                  }}
                  className="block px-3 sm:px-4 py-2 sm:py-3 hover:bg-slate-800 border-b border-slate-800 last:border-b-0 transition-colors text-xs sm:text-sm"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span
                      className={`text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded shrink-0 ${
                        result.type === "event"
                          ? "bg-blue-900/30 text-blue-300"
                          : "bg-lime-900/30 text-lime-300"
                      }`}
                    >
                      {result.type === "event" ? "ইভেন্ট" : "চ্যালেঞ্জ"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-200 truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {result.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              কোনো ফলাফল পাওয়া যায়নি
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
