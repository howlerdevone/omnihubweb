import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const authCookie = request.cookies.get('auth_token');

    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect onboarding routes
  if (pathname.startsWith('/onboarding')) {
    const authCookie = request.cookies.get('auth_token');

    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard/:path*', '/onboarding/:path*'],
};
