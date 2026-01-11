/**
 * Brand Configuration
 * 
 * Define theme colors, branding, and i18n settings for each brand.
 * The brand is determined at build time via NEXT_PUBLIC_BRAND environment variable.
 */

export type BrandId = 'brand-a' | 'brand-b' | 'brand-c';

export interface BrandConfig {
  id: BrandId;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  defaultLocale: string;
  supportedLocales: string[];
}

export const brands: Record<BrandId, BrandConfig> = {
  'brand-a': {
    id: 'brand-a',
    name: 'Brand A',
    primaryColor: '#3b82f6', // Blue
    secondaryColor: '#1e40af',
    accentColor: '#60a5fa',
    logo: '/logos/brand-a.svg',
    defaultLocale: 'en',
    supportedLocales: ['en', 'es', 'fr'],
  },
  'brand-b': {
    id: 'brand-b',
    name: 'Brand B',
    primaryColor: '#10b981', // Green
    secondaryColor: '#059669',
    accentColor: '#34d399',
    logo: '/logos/brand-b.svg',
    defaultLocale: 'en',
    supportedLocales: ['en', 'de', 'it'],
  },
  'brand-c': {
    id: 'brand-c',
    name: 'Brand C',
    primaryColor: '#f59e0b', // Orange
    secondaryColor: '#d97706',
    accentColor: '#fbbf24',
    logo: '/logos/brand-c.svg',
    defaultLocale: 'en',
    supportedLocales: ['en', 'ja', 'zh'],
  },
};

/**
 * Get current brand from environment variable
 * Falls back to 'brand-a' if not set
 */
export function getCurrentBrand(): BrandConfig {
  const brandId = (process.env.NEXT_PUBLIC_BRAND as BrandId) || 'brand-a';
  return brands[brandId] || brands['brand-a'];
}

/**
 * Get brand-specific theme CSS variables
 */
export function getBrandThemeCSS(brand: BrandConfig): string {
  return `
    --brand-primary: ${brand.primaryColor};
    --brand-secondary: ${brand.secondaryColor};
    --brand-accent: ${brand.accentColor};
  `;
}

