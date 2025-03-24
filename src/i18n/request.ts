import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from '../app/i18n';

export type Locale = 'en' | 'ar';

export default getRequestConfig(async ({locale}: {locale?: string}) => {
  // Validate that the incoming locale is valid
  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }
  
  return {
    locale: locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});