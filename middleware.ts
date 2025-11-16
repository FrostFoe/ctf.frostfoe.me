import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // Add security headers for Lighthouse 100/100
  const securityHeaders = {
    // HSTS - Force HTTPS with preload and subdomains
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    
    // CSP - Content Security Policy with Trusted Types
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' https: data:; font-src 'self' https: data:; connect-src 'self' https:; frame-src 'self'; require-trusted-types-for 'script'; trusted-types default",
    
    // X-Frame-Options - Prevent clickjacking
    "X-Frame-Options": "SAMEORIGIN",
    
    // COOP - Cross-Origin-Opener-Policy
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    
    // Remove X-Powered-By header
    "X-Powered-By": "Next.js",
    
    // Additional security headers
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  };

  // Apply security headers to response
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
