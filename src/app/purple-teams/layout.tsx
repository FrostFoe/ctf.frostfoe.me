import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTB for Purple Teams",
  description:
    "Offensive exercises to enable predictive defensive operations",
};

export default function PurpleTeamsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#0e1012] text-white font-body">{children}</div>
  );
}
