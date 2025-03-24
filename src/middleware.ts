import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './app/i18n';

// Public paths that don't require authentication
const publicPaths = ['/login', '/register', '/forgot-password'];

// Create internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Handle internationalization
  const response = intlMiddleware(request);
  
  // Check if path needs authentication
  const isPublicPath = publicPaths.some(path => 
    pathname.endsWith(path) || pathname === path
  );
  
  // For API routes, return response
  if (pathname.includes('/api/')) {
    return response;
  }
  
  // Extract locale and check if it's a public path
  const patternWithLocale = new RegExp(`^/(${locales.join('|')})(/.*)?$`);
  const matchesWithLocale = pathname.match(patternWithLocale);
  
  // If path is public, allow access
  if (isPublicPath) {
    return response;
  }
  
  // Check for authentication token
  const token = request.cookies.get('auth_token')?.value;
  
  // If token doesn't exist and it's not a public path, redirect to login
  if (!token && !isPublicPath) {
    // Get the locale from the pathname
    const locale = matchesWithLocale ? matchesWithLocale[1] : defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  
  return response;
}

export const config = {
  // Match all pathnames except for assets and static files
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 