import AdminLayoutClient from "./admin-layout-client";
import { redirect } from "next/navigation";
import { getMe } from "@/lib/auth";
import { cookies } from "next/headers";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    redirect("/login");
  }

  const { user } = await getMe(sessionCookie.value);

  if (!user || user.role !== "admin") {
    redirect("/dashboard");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
