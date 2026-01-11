'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeConfig } from '@/i18n/config';
import { getCurrentBrand } from '@/config/brands';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const brand = getCurrentBrand();

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // Add new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  // Only show locales supported by current brand
  const supportedLocales = brand.supportedLocales;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Language:</span>
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                 bg-white dark:bg-zinc-800 text-black dark:text-white
                 focus:outline-none focus:ring-2"
        style={{ focusRingColor: getCurrentBrand().primaryColor }}
      >
        {supportedLocales.map((loc) => {
          const config = localeConfig[brand.id as keyof typeof localeConfig]?.[loc as keyof typeof localeConfig[typeof brand.id]];
          return (
            <option key={loc} value={loc}>
              {config?.flag} {config?.name || loc.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
}

