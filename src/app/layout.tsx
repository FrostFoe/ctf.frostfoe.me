import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/hooks/user-context";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "ctf.frostfoe.me",
  description:
    "হ্যাকিং এবং সাইবারসিকিউরিটি দক্ষতা অর্জনের একটি মজাদার এবং ইন্টারেক্টিভ উপায়।",
  icons: {
    icon: "/flag-wave.gif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="dark" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/flag-wave.gif" />
      </head>
      <body className={`${hindSiliguri.variable} font-body antialiased`} suppressHydrationWarning={true}>
        <UserProvider>{children}</UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
