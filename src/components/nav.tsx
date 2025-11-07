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

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const htbLogo = PlaceHolderImages.find((img) => img.id === "htb-logo")!;

  return (
    <header className="w-full max-w-7xl bg-gray-900 rounded-lg shadow-lg px-6 py-4 animate-slide-in-from-top">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="#">
            <Image
              src={htbLogo.imageUrl}
              alt={htbLogo.description}
              data-ai-hint={htbLogo.imageHint}
              width={150}
              height={32}
              className="h-8 w-auto"
            />
          </a>
          <div className="hidden lg:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
                >
                  পণ্য <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-gray-800 border-gray-700 text-gray-300">
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  ব্যক্তিদের জন্য
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  দলের জন্য
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  স্কুলের জন্য
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              সমাধান
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              মূল্য নির্ধারণ
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
                >
                  রিসোর্স <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-gray-800 border-gray-700 text-gray-300">
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

            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              কোম্পানি
            </a>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
              >
                ব্যবসা <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-gray-800 border-gray-700 text-gray-300 -right-10">
              <DropdownMenuItem className="hover:bg-gray-700 hover:text-white flex flex-col items-start">
                <span className="font-bold block">বিনামূল্যে ট্রায়াল শুরু করুন</span>
                <span className="text-xs text-gray-400">
                  ১৪ দিনের জন্য বিনামূল্যে অল-ইন-ওয়ান প্ল্যাটফর্ম।
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 hover:text-white flex flex-col items-start">
                <span className="font-bold block">একটি ডেমো পান</span>
                <span className="text-xs text-gray-400">
                  আমাদের দলের সাথে যোগাযোগ করুন।
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#"
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            লগইন
          </a>
          <Button className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-sm hover:bg-lime-300 transition-colors">
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
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden mt-4 space-y-2">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            পণ্য
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            সমাধান
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            মূল্য নির্ধারণ
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            রিসোর্স
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            কোম্পানি
          </a>
          <hr className="border-gray-700 my-2" />
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            ব্যবসা
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            লগইন
          </a>
          <Button className="w-full text-center bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-base hover:bg-lime-300 transition-colors">
            শুরু করুন
          </Button>
        </div>
      )}
    </header>
  );
}
