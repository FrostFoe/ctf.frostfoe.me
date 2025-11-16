/**
 * Logout Page - Redirect after logout
 */

import { logoutAction } from "@/lib/actions/auth";

export default async function LogoutPage() {
  await logoutAction();
  
  // This will redirect to home, so this component won't actually render
  return null;
}
