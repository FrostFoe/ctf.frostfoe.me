import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTB for Blue Teams",
  description: "Making humans the strongest link in cybersecurity",
};

export default function BlueTeamsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#0e1012] text-white font-body">{children}</div>
  );
}
