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

const navItems = [
  {
    title: "মূল্য নির্ধারণ",
    href: "/pricing",
  },
  {
    title: "রিসোর্স",
    children: [
      { title: "সম্প্রদায়", href: "/community" },
      { title: "সাহায্য পান", href: "/help" },
      { title: "ব্লগ", href: "/blog" },
    ],
  },
];

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
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.title}>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-300 transition-colors hover:text-white h-8 px-2"
                      >
                        {item.title}{" "}
                        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 border-gray-700 bg-gray-800 text-gray-300">
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        key={child.title}
                        asChild
                        className="hover:bg-gray-700 hover:text-white"
                      >
                        <Link href={child.href}>{child.title}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-xs sm:text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  {item.title}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3 sm:gap-6">
          <Link
            href="/login"
            className="text-xs sm:text-sm font-medium text-gray-300 transition-colors hover:text-white"
          >
            লগইন
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup">
              <Button className="rounded-md bg-lime-400 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-gray-900 transition-colors hover:bg-lime-300">
                শুরু করুন
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="lg:hidden">
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-300 hover:text-white focus:outline-hidden"
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
          {navItems.map((item) =>
            item.children ? (
              <div key={item.title}>
                <button
                  onClick={() => {
                    /* Toggle children visibility if needed, or just render them */
                  }}
                  className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {item.title} <ChevronDown className="h-4 w-4" />
                </button>
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {item.title}
              </Link>
            ),
          )}
          <hr className="my-2 border-gray-700" />
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            লগইন
          </Link>
          <Link href="/signup" className="block">
            <Button
              className="w-full rounded-md bg-lime-400 px-5 py-2 text-center text-sm font-bold text-gray-900 transition-colors hover:bg-lime-300"
              onClick={() => setMobileOpen(false)}
            >
              শুরু করুন
            </Button>
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
