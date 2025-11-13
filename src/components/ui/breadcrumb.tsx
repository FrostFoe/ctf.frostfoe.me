"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="py-2 sm:py-3 overflow-x-auto ">
      <ol className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-400 whitespace-nowrap">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-1 sm:gap-2 min-w-max"
          >
            {item.href ? (
              <Link
                href={item.href}
                className="text-slate-400 hover:text-lime-400 transition-colors duration-200 truncate max-w-xs"
                title={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="text-slate-300 truncate max-w-xs"
                title={item.label}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <ChevronRight size={14} className="text-slate-600 shrink-0" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
