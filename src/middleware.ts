import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { authRoutes } from './routes';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'bn'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
});

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Access cookies directly from the request
  const cookieStore = request.cookies;
  const access_token = cookieStore.get('access_token');

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Redirect logged-in users away from auth routes
  if (isAuthRoute && access_token) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  // Redirect unauthenticated users to the auth page
  if (!isAuthRoute && !access_token) {
    return NextResponse.redirect(new URL(`/auth`, request.url));
  }

  // Pass the request to the i18n middleware
  return I18nMiddleware(request);
}

export const config = {
  // matcher: [
  //   '/(bn|en)/:path*',
  //   '/((?!_next|_vercel|.*\\..*).*)', // Handle missing locales
  // ],
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
