import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './app/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale,
  // Whether to add a locale prefix to the URL (e.g. /en/about vs /about)
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - assets (e.g. `/css/style.css`)
  // - api routes
  // - files with extensions (e.g. `/favicon.ico`)
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 