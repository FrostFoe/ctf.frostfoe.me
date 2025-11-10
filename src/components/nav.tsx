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
import Link from "next/link";
import { motion } from "framer-motion";
import {
  slideInLeft,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/lib/motion-variants";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-7xl rounded-lg bg-gray-900 px-4 sm:px-6 md:px-8 py-4 shadow-lg mx-auto"
    >
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-6 sm:gap-10">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/">
              <Image
                src="/flag-wave.gif"
                alt="Google CTF Flag"
                width={40}
                height={40}
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </motion.div>
          <div className="hidden lg:flex items-center gap-4 md:gap-6">
            <motion.a
              href="#"
              whileHover={{ color: "#ffffff" }}
              className="text-xs sm:text-sm font-medium text-gray-300 transition-colors"
            >
              মূল্য নির্ধারণ
            </motion.a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-300 transition-colors hover:text-white h-8 px-2"
                  >
                    রিসোর্স <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </motion.div>
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

        <div className="hidden lg:flex items-center gap-3 sm:gap-6">
          <motion.a
            href="/login"
            whileHover={{ color: "#ffffff" }}
            className="text-xs sm:text-sm font-medium text-gray-300 transition-colors"
          >
            লগইন
          </motion.a>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="rounded-md bg-lime-400 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-gray-900 transition-colors hover:bg-lime-300">
              শুরু করুন
            </Button>
          </motion.div>
        </div>

        <div className="lg:hidden">
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle mobile menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </motion.button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 space-y-2 lg:hidden"
        >
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            মূল্য নির্ধারণ
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            রিসোর্স
          </a>
          <hr className="my-2 border-gray-700" />
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            লগইন
          </a>
          <Button className="w-full rounded-md bg-lime-400 px-5 py-2 text-center text-sm font-bold text-gray-900 transition-colors hover:bg-lime-300">
            শুরু করুন
          </Button>
        </motion.div>
      )}
    </motion.header>
  );
}
