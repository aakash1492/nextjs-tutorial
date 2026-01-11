import { getRequestConfig } from 'next-intl/server';
import { getCurrentBrand } from '@/config/brands';
import { defaultLocale, getBrandLocales } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from request or use default
  let locale = await requestLocale;

  // Get current brand's supported locales
  const brandLocales = getBrandLocales();

  // Validate locale is supported by current brand
  if (!locale || !brandLocales.includes(locale as any)) {
    // Fallback to brand's default or global default
    const brand = getCurrentBrand();
    locale = brand.defaultLocale || defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

