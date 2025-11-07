import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTB for Red Teams",
  description: "Quantify and manage your cyber risk exposure",
};

export default function RedTeamsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#0e1012] text-white font-body">{children}</div>
  );
}
