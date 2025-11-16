/**
 * Server actions for authentication
 * Used by client components
 */

"use server";

import { clearAuthCookie } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";

/**
 * Server action to log out user and redirect to home
 */
export async function logoutAction() {
  await clearAuthCookie();
  redirect("/");
}
