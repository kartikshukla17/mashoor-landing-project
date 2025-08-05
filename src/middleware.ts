import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect the root path to the default locale
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }
}

export const config = {
  matcher: ['/'],
};