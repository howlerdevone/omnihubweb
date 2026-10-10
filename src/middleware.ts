import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware only validates JWT presence.
 * Business logic (onboarding status) is handled by layouts.
 */
export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('auth_token');

  // Require authentication for protected routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/onboarding')) {
    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding/:path*'],
};
