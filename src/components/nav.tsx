"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const htbLogo = PlaceHolderImages.find((img) => img.id === "htb-logo")!;

  return (
    <header className="w-full max-w-7xl rounded-lg bg-gray-900 px-6 py-4 shadow-lg">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image
              src={htbLogo.imageUrl}
              alt={htbLogo.description}
              data-ai-hint={htbLogo.imageHint}
              width={150}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              মূল্য নির্ধারণ
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  রিসোর্স <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 border-gray-700 bg-gray-800 text-gray-300">
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  সম্প্রদায়
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  সাহায্য পান
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  ব্লগ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href="#"
            className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            লগইন
          </a>
          <Button className="rounded-md bg-lime-400 px-5 py-2 text-sm font-bold text-gray-900 transition-colors hover:bg-lime-300">
            শুরু করুন
          </Button>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mt-4 space-y-2 lg:hidden">
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            মূল্য নির্ধারণ
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            রিসোর্স
          </a>
          <hr className="my-2 border-gray-700" />
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            লগইন
          </a>
          <Button className="w-full rounded-md bg-lime-400 px-5 py-2 text-center text-base font-bold text-gray-900 transition-colors hover:bg-lime-300">
            শুরু করুন
          </Button>
        </div>
      )}
    </header>
  );
}
