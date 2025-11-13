/**
 * Data Validation and Sanitization Utility
 * Provides functions for validating and sanitizing user input to prevent
 * XSS attacks, injection attacks, and other security issues
 */

/**
 * Sanitize flag input - removes potentially dangerous characters
 * Flags typically follow pattern: flag{...} so we can be strict
 */
export function sanitizeFlag(flag: string): {
  valid: boolean;
  sanitized: string;
  error?: string;
} {
  if (!flag) {
    return { valid: false, sanitized: "", error: "ফ্ল্যাগ খালি হতে পারে না" };
  }

  // Trim whitespace
  let sanitized = flag.trim();

  // Maximum length check (prevent DoS)
  if (sanitized.length > 500) {
    return {
      valid: false,
      sanitized: "",
      error: "ফ্ল্যাগ খুব দীর্ঘ (সর্বাধিক 500 অক্ষর)",
    };
  }

  // Check for common XSS patterns
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /<iframe/i,
    /eval\(/i,
    /expression\(/i,
    /vbscript:/i,
  ];

  for (const pattern of xssPatterns) {
    if (pattern.test(sanitized)) {
      return {
        valid: false,
        sanitized: "",
        error: "ফ্ল্যাগে অমান্য অক্ষর রয়েছে",
      };
    }
  }

  // Flag format validation - most CTF flags are alphanumeric with some special chars
  // Allow: flag{} letters numbers - _ . /
  const validFlagPattern = /^[a-zA-Z0-9\{\}\-_./\[\]_\(\)]+$/;
  if (!validFlagPattern.test(sanitized)) {
    // More permissive pattern for other formats
    const relaxedPattern = /^[a-zA-Z0-9\{\}\-_./\[\]_\(\)\s:,=]+$/;
    if (!relaxedPattern.test(sanitized)) {
      return {
        valid: false,
        sanitized: "",
        error: "ফ্ল্যাগ ফর্ম্যাট বৈধ নয়",
      };
    }
  }

  // Remove any HTML entities that might cause issues
  sanitized = sanitized.replace(/[<>]/g, "");

  return { valid: true, sanitized };
}

/**
 * Sanitize user input for display
 * Prevents XSS when displaying user-generated content
 */
export function sanitizeForDisplay(text: string): string {
  if (!text) return "";

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Validate username - prevent injection attacks
 */
export function validateUsername(username: string): {
  valid: boolean;
  error?: string;
} {
  if (!username) {
    return { valid: false, error: "ব্যবহারকারীর নাম প্রয়োজন" };
  }

  if (username.length < 3) {
    return { valid: false, error: "ব্যবহারকারীর নাম কমপক্ষে 3 অক্ষর হতে হবে" };
  }

  if (username.length > 50) {
    return { valid: false, error: "ব্যবহারকারীর নাম 50 অক্ষরের বেশি হতে পারে না" };
  }

  // Allow only alphanumeric, underscore, and hyphen
  const validPattern = /^[a-zA-Z0-9_-]+$/;
  if (!validPattern.test(username)) {
    return {
      valid: false,
      error: "ব্যবহারকারীর নাম শুধুমাত্র অক্ষর, সংখ্যা, _, এবং - ধারণ করতে পারে",
    };
  }

  return { valid: true };
}

/**
 * Validate email address
 */
export function validateEmail(email: string): {
  valid: boolean;
  error?: string;
} {
  if (!email) {
    return { valid: false, error: "ইমেইল প্রয়োজন" };
  }

  // Basic email regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { valid: false, error: "বৈধ ইমেইল ঠিকানা নয়" };
  }

  if (email.length > 100) {
    return { valid: false, error: "ইমেইল খুব দীর্ঘ" };
  }

  return { valid: true };
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  valid: boolean;
  error?: string;
  strength: "weak" | "fair" | "good" | "strong";
} {
  if (!password) {
    return {
      valid: false,
      error: "পাসওয়ার্ড প্রয়োজন",
      strength: "weak",
    };
  }

  if (password.length < 8) {
    return {
      valid: false,
      error: "পাসওয়ার্ড কমপক্ষে 8 অক্ষর হতে হবে",
      strength: "weak",
    };
  }

  if (password.length > 100) {
    return {
      valid: false,
      error: "পাসওয়ার্ড 100 অক্ষরের বেশি হতে পারে না",
      strength: "weak",
    };
  }

  let strength: "weak" | "fair" | "good" | "strong" = "weak";
  let checks = 0;

  if (/[a-z]/.test(password)) checks++; // lowercase
  if (/[A-Z]/.test(password)) checks++; // uppercase
  if (/[0-9]/.test(password)) checks++; // number
  if (/[^a-zA-Z0-9]/.test(password)) checks++; // special char

  if (checks >= 4) strength = "strong";
  else if (checks >= 3) strength = "good";
  else if (checks >= 2) strength = "fair";

  return { valid: checks >= 2, strength };
}

/**
 * Remove SQL injection attempts
 */
export function preventSQLInjection(input: string): string {
  if (!input) return "";

  // Remove common SQL keywords and patterns
  const sqlPatterns = [
    /('\s*(OR|AND)\s*'1'\s*=\s*'1)/gi,
    /(UNION\s+SELECT)/gi,
    /(DROP\s+TABLE)/gi,
    /(INSERT\s+INTO)/gi,
    /(DELETE\s+FROM)/gi,
    /(UPDATE\s+\w+\s+SET)/gi,
    /(EXEC\()/gi,
    /(EXECUTE\()/gi,
  ];

  let sanitized = input;
  for (const pattern of sqlPatterns) {
    sanitized = sanitized.replace(pattern, "");
  }

  return sanitized.trim();
}

/**
 * Validate challenge difficulty
 */
export function validateDifficulty(difficulty: string): boolean {
  const validDifficulties = [
    "সহজ",
    "মধ্যম",
    "মাঝারি",
    "কঠিন",
    "মাঝারি থেকে কঠিন",
    "অসম্ভব",
  ];
  return validDifficulties.includes(difficulty);
}

/**
 * Validate category
 */
export function validateCategory(category: string): boolean {
  const validCategories = [
    "ওয়েব",
    "ক্রিপ্টোগ্রাফি",
    "ফরেনসিক্স",
    "রিভার্স ইঞ্জিনিয়ারিং",
    "পাওয়্যন্স",
    "ওয়েব নিরাপত্তা",
    "অ্যাক্সেস কন্ট্রোল",
  ];
  return validCategories.includes(category);
}

/**
 * Escape HTML to prevent XSS in rendered content
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Rate limit check helper
 */
export function checkRateLimit(key: string, maxAttempts: number, timeWindowMs: number): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const storageKey = `ratelimit_${key}`;
  const dataStr = localStorage.getItem(storageKey);

  const data = dataStr
    ? JSON.parse(dataStr)
    : { attempts: [], firstAttemptTime: now };

  // Remove attempts outside time window
  data.attempts = data.attempts.filter(
    (timestamp: number) => now - timestamp < timeWindowMs
  );

  if (data.attempts.length < maxAttempts) {
    data.attempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(data));
    return {
      allowed: true,
      remaining: maxAttempts - data.attempts.length,
      resetIn: 0,
    };
  }

  const oldestAttempt = Math.min(...data.attempts);
  const resetIn = timeWindowMs - (now - oldestAttempt);

  return {
    allowed: false,
    remaining: 0,
    resetIn,
  };
}

/**
 * Validate submission object structure
 */
export function validateSubmission(
  submission: unknown
): submission is {
  challengeId: number;
  flag: string;
  timeSpent: number;
  hintsUsed: number;
} {
  if (
    typeof submission !== "object" ||
    submission === null
  ) {
    return false;
  }

  const obj = submission as Record<string, unknown>;

  return (
    typeof obj.challengeId === "number" &&
    typeof obj.flag === "string" &&
    typeof obj.timeSpent === "number" &&
    typeof obj.hintsUsed === "number" &&
    obj.challengeId > 0 &&
    obj.timeSpent >= 0 &&
    obj.hintsUsed >= 0
  );
}
