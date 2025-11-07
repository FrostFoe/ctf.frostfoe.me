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

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full max-w-7xl bg-rich-black rounded-lg shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="#">
            <Image
              src="https://www.hackthebox.com/images/landingv3/mega-menu-logo-htb.svg"
              alt="Hack The Box Logo"
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
                  Products <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-rich-black border-gray-700 text-gray-300">
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  For Individuals
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  For Teams
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  For Schools
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Solutions
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Pricing
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
                >
                  Resources <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-rich-black border-gray-700 text-gray-300">
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  Community
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  Get Help
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 hover:text-white">
                  Blog
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="#"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Company
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
                Business <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-rich-black border-gray-700 text-gray-300 -right-10">
              <DropdownMenuItem className="hover:bg-gray-700 hover:text-white flex flex-col items-start">
                <span className="font-bold block">Start free trial</span>
                <span className="text-xs text-gray-400">
                  All-in-one platform free for 14 days.
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 hover:text-white flex flex-col items-start">
                <span className="font-bold block">Get a demo</span>
                <span className="text-xs text-gray-400">
                  Get in touch with our team.
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#"
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            Login
          </a>
          <Button className="bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-sm hover:bg-lime-300 transition-colors">
            Get Started
          </Button>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden mt-4 space-y-2">
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Products
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Solutions
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Pricing
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Resources
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Company
          </a>
          <hr className="border-gray-700 my-2" />
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Business
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Login
          </a>
          <Button className="w-full text-center bg-lime-400 text-gray-900 font-bold px-5 py-2 rounded-md text-base hover:bg-lime-300 transition-colors">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
}
