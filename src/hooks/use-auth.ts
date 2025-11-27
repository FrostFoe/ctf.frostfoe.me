/**
 * Custom hooks for authentication
 */

import { useUser, useIsAdmin } from "@/lib/context/user-context";

/**
 * Hook to check if user has a specific role
 */
export function useHasRole(role: "player" | "admin") {
  const { user } = useUser();
  return user?.role === role;
}

/**
 * Hook to get logout function
 */
export async function useLogout() {
  const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/";
    }
  };

  return logout;
}

export { useUser, useIsAdmin };
