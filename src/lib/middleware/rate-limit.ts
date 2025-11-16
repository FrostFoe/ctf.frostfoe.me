/**
 * Simple in-memory rate limiter
 * For production, use Redis or similar
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * Check if request exceeds rate limit
 * @param identifier Unique identifier (IP, user ID, etc)
 * @param limit Maximum requests
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 60,
  windowMs: number = 60000 // 1 minute default
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Reset if window expired
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  // Check if limit exceeded
  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  // Increment counter
  record.count++;
  return { allowed: true, remaining: limit - record.count };
}

/**
 * Create rate limit response
 */
export function createRateLimitResponse(remaining: number) {
  return new Response(
    JSON.stringify({
      error: "খুব বেশি অনুরোধ পাঠানো হয়েছে। অনুগ্রহ করে পরে চেষ্টা করুন।",
      code: "RATE_LIMIT_EXCEEDED",
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": remaining.toString(),
      },
    }
  );
}
