'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '../i18n';

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const languageNames = {
    ar: 'العربية',
    en: 'English',
    fr: 'Français'
  };

  const handleChange = (newLocale: string) => {
    // Get the path without the locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    // Construct the new path with the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentLocale === locale
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {languageNames[locale as keyof typeof languageNames]}
        </button>
      ))}
    </div>
  );
}; 