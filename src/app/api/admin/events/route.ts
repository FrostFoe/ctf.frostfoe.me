import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import {
  successResponse,
  errorResponse,
  validateRequired,
} from "@/lib/api-utils";
import {
  checkRateLimit,
  createRateLimitResponse,
} from "@/lib/middleware/rate-limit";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Rate limiting using user-agent as identifier
    const identifier = request.headers.get("user-agent") || "unknown";
    const { allowed, remaining } = checkRateLimit(
      identifier,
      100,
      60000
    );
    if (!allowed) return createRateLimitResponse(remaining);

    const body = await request.json();

    // Validate required fields
    const validation = validateRequired(body, ["title"]);
    if (!validation.valid) {
      return errorResponse(
        "প্রয়োজনীয় ফিল্ড অনুপস্থিত",
        "VALIDATION_ERROR",
        400,
        validation.errors
      );
    }

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          ...body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return successResponse(data, 201);
  } catch (error: any) {
    console.error("API error:", error);
    return errorResponse(
      error.message || "ইভেন্ট তৈরি ব্যর্থ",
      "CREATE_ERROR",
      500
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return successResponse(data);
  } catch (error: any) {
    return errorResponse(
      error.message || "ইভেন্ট লোড করতে ব্যর্থ",
      "FETCH_ERROR",
      500
    );
  }
}
