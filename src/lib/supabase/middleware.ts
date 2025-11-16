import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

type User = Database["public"]["Tables"]["users"]["Row"];

/**
 * Custom auth middleware for Next.js App Router
 * Handles session validation, route protection, and role-based access
 */
export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Get auth token from cookies
  const authToken = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  let user: User | null = null;

  // Validate user if auth token exists
  if (authToken) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", authToken)
        .single();

      if (!error && data) {
        user = data as User;
      } else {
        // Clear invalid cookie
        supabaseResponse.cookies.delete("auth_token");
      }
    } catch (error) {
      console.error("Middleware auth error:", error);
      supabaseResponse.cookies.delete("auth_token");
    }
  }

  // ============ Route Protection Logic ============

  // Public auth routes - redirect logged-in users away
  const publicAuthRoutes = ["/login", "/signup", "/guest"];
  if (publicAuthRoutes.includes(pathname) && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protected routes - require login
  const protectedRoutes = ["/ctf", "/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin routes - require admin role
  const adminRoutes = ["/admin"];
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (isAdminRoute && (!user || user.role !== "admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return supabaseResponse;
}
