import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import {
  successResponse,
  errorResponse,
  validateRequired,
} from "@/lib/api-utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", Number(id))
      .single();

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

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", Number(id))
      .select()
      .single();

    if (error) throw error;

    return successResponse(data);
  } catch (error: any) {
    console.error("API error:", error);
    return errorResponse(
      error.message || "ইভেন্ট আপডেট ব্যর্থ",
      "UPDATE_ERROR",
      500
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", Number(id));

    if (error) throw error;

    return successResponse({ message: "ইভেন্ট সফলভাবে ডিলিট হয়েছে" });
  } catch (error: any) {
    console.error("Delete error:", error);
    return errorResponse(
      error.message || "ইভেন্ট ডিলিট ব্যর্থ",
      "DELETE_ERROR",
      500
    );
  }
}
