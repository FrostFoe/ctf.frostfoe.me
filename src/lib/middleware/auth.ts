import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Verify admin role from request
 * Used in API routes to ensure only admins can modify data
 */
export async function verifyAdminRole(request: NextRequest) {
  try {
    // Get user ID from header (set by your auth system)
    const userId = request.headers.get("x-user-id");
    const userRole = request.headers.get("x-user-role");

    if (!userId || userRole !== "admin") {
      return {
        isValid: false,
        error: "অননুমোদিত প্রবেশাধিকার",
      };
    }

    return { isValid: true, userId, userRole };
  } catch (error) {
    console.error("Auth verification failed:", error);
    return {
      isValid: false,
      error: "প্রমাণীকরণ ব্যর্থ",
    };
  }
}

/**
 * Validate environment variables
 */
export function validateEnv() {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
