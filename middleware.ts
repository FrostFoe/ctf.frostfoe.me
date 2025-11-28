import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/admin', '/ctf/profile', '/ctf/settings'];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check for session cookie
    const sessionCookie = request.cookies.get('session');

    if (!sessionCookie) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // For admin routes, we'll verify on the server-side
    // The basic check here is just that a session exists
  }

  // Public routes that authenticated users shouldn't access
  const publicOnlyRoutes = ['/login', '/signup'];
  const isPublicOnlyRoute = publicOnlyRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isPublicOnlyRoute) {
    const sessionCookie = request.cookies.get('session');

    if (sessionCookie) {
      // Redirect authenticated users to dashboard by default
      // The actual role-based redirect happens in the login page
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};