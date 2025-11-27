/**
 * Logout Page - Redirect after logout
 */

import { redirect } from "next/navigation";

export default async function LogoutPage() {
  // No auth, just redirect to home
  redirect("/");
}
