"use client";

export function SkeletonCard() {
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 animate-pulse">
      <div className="h-6 bg-slate-700 rounded w-3/4 mb-4" />
      <div className="h-4 bg-slate-700 rounded w-full mb-2" />
      <div className="h-4 bg-slate-700 rounded w-5/6" />
    </div>
  );
}

export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonDetailHeader() {
  return (
    <div className="bg-slate-800/50 rounded-lg p-8 animate-pulse">
      <div className="h-40 bg-slate-700 rounded mb-6" />
      <div className="h-8 bg-slate-700 rounded w-1/2 mb-4" />
      <div className="h-4 bg-slate-700 rounded w-3/4" />
    </div>
  );
}

export function SkeletonDetailContent() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-slate-800/50 rounded-lg p-6 animate-pulse">
          <div className="h-6 bg-slate-700 rounded w-1/4 mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-700 rounded w-full" />
            <div className="h-4 bg-slate-700 rounded w-5/6" />
            <div className="h-4 bg-slate-700 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
