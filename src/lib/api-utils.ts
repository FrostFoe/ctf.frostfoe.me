import { NextResponse } from "next/server";

/**
 * Standard API response format
 */
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  details?: Record<string, any>;
}

/**
 * Return successful response
 */
export function successResponse<T>(
  data: T,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

/**
 * Return error response
 */
export function errorResponse(
  message: string,
  code: string = "ERROR",
  status: number = 400,
  details?: Record<string, any>
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code,
      details,
    },
    { status }
  );
}

/**
 * Input validation helper
 */
export function validateRequired(
  data: Record<string, any>,
  fields: string[]
): { valid: boolean; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    if (
      !data[field] ||
      (typeof data[field] === "string" && data[field].trim() === "")
    ) {
      errors[field] = `${field} প্রয়োজনীয়`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

/**
 * Validate enum value
 */
export function validateEnum(
  value: any,
  allowedValues: string[]
): boolean {
  return allowedValues.includes(value);
}
