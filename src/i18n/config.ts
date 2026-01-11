import { getCurrentBrand } from '@/config/brands';

/**
 * i18n Configuration
 * 
 * Locales are determined by the current brand.
 * Each brand can have different supported languages.
 */

// Get all possible locales across all brands (for middleware)
export const allLocales = ['en', 'es', 'fr', 'de', 'it', 'ja', 'zh'] as const;

// Get current brand's locales
export function getBrandLocales() {
  const currentBrand = getCurrentBrand();
  return currentBrand.supportedLocales;
}

// For middleware - use all locales, but validate per brand
export const locales = allLocales as unknown as string[];
export const defaultLocale = 'en';

export type Locale = (typeof allLocales)[number];

// Brand-specific locale configuration
export const localeConfig = {
  'brand-a': {
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
  },
  'brand-b': {
    en: { name: 'English', flag: '🇺🇸' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    it: { name: 'Italiano', flag: '🇮🇹' },
  },
  'brand-c': {
    en: { name: 'English', flag: '🇺🇸' },
    ja: { name: '日本語', flag: '🇯🇵' },
    zh: { name: '中文', flag: '🇨🇳' },
  },
} as const;

