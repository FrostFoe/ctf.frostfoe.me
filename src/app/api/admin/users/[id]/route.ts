import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import {
  successResponse,
  errorResponse,
  validateEnum,
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
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return successResponse(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    return errorResponse(
      "ব্যবহারকারী লোড করতে ব্যর্থ",
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

    // Validate role if being updated
    if (body.role) {
      const validRoles = ["user", "organizer", "admin"];
      if (!validateEnum(body.role, validRoles)) {
        return errorResponse(
          "অবৈধ ভূমিকা",
          "VALIDATION_ERROR",
          400
        );
      }
    }

    const { data, error } = await supabase
      .from("users")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return successResponse(data);
  } catch (error) {
    console.error("Error updating user:", error);
    return errorResponse(
      "ব্যবহারকারী আপডেট করতে ব্যর্থ",
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
      .from("users")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return successResponse({ message: "ব্যবহারকারী সফলভাবে ডিলিট হয়েছে" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return errorResponse(
      "ব্যবহারকারী ডিলিট করতে ব্যর্থ",
      "DELETE_ERROR",
      500
    );
  }
}
