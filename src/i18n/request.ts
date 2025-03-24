import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from '../app/i18n';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is valid
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }
  
  return {
    locale: locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});