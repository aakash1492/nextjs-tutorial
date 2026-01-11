# Brand Theming & Internationalization Guide

This guide explains how to use brand-based theming and internationalization in this Next.js project.

---

## Overview

The app supports:
- **Brand-based theming**: Different colors, branding per brand
- **Brand-based i18n**: Each brand can have different supported languages
- **Build-time configuration**: Brand is set via environment variable at build time

---

## Setup

### 1. Brand Configuration

Brands are defined in `src/config/brands.ts`:

```typescript
export const brands = {
  'brand-a': {
    id: 'brand-a',
    name: 'Brand A',
    primaryColor: '#3b82f6', // Blue
    defaultLocale: 'en',
    supportedLocales: ['en', 'es', 'fr'],
  },
  // ... more brands
};
```

### 2. Build Commands

Build for specific brand:

```bash
# Development
npm run dev:brand-a
npm run dev:brand-b
npm run dev:brand-c

# Production build
npm run build:brand-a
npm run build:brand-b
npm run build:brand-c
```

Or set environment variable directly:

```bash
# Windows
set NEXT_PUBLIC_BRAND=brand-a && npm run dev

# Linux/Mac
NEXT_PUBLIC_BRAND=brand-a npm run dev
```

---

## Brand Theming

### How It Works

1. Brand is determined at build time via `NEXT_PUBLIC_BRAND`
2. Theme colors are injected as CSS variables in the layout
3. Components use brand colors via CSS variables

### Using Brand Colors

```tsx
// In components
const brand = getCurrentBrand();

<div style={{ color: brand.primaryColor }}>
  Brand-colored text
</div>

// Or use CSS classes
<button className="btn-brand">Button</button>
```

### CSS Variables

Brand colors are available as CSS variables:
- `--brand-primary`
- `--brand-secondary`
- `--brand-accent`

Use in CSS:
```css
.my-element {
  color: var(--brand-primary);
  border-color: var(--brand-secondary);
}
```

---

## Internationalization (i18n)

### Supported Locales by Brand

Each brand has different supported languages:

- **Brand A**: English, Spanish, French
- **Brand B**: English, German, Italian
- **Brand C**: English, Japanese, Chinese

### Adding Translations

1. Add translation files in `src/i18n/messages/`:
   - `en.json` - English
   - `es.json` - Spanish
   - `fr.json` - French
   - etc.

2. Use translations in components:

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('brand-a.title')}</p>
    </div>
  );
}
```

### Locale Switcher

The `LocaleSwitcher` component automatically shows only locales supported by the current brand:

```tsx
import LocaleSwitcher from '@/components/LocaleSwitcher';

<LocaleSwitcher />
```

### URL Structure

Routes are locale-prefixed:
- `/en/` - English
- `/es/` - Spanish
- `/fr/` - French
- etc.

The middleware automatically handles locale routing.

---

## File Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based routes
│   │   ├── layout.tsx      # Locale layout with brand theming
│   │   └── page.tsx        # Home page
│   ├── components/         # Shared components
│   └── layout.tsx          # Root layout (redirects)
├── config/
│   └── brands.ts           # Brand configuration
├── i18n/
│   ├── config.ts           # i18n configuration
│   ├── request.ts          # next-intl request config
│   └── messages/           # Translation files
│       ├── en.json
│       ├── es.json
│       └── fr.json
└── middleware.ts           # i18n middleware
```

---

## Adding a New Brand

1. **Add brand config** in `src/config/brands.ts`:

```typescript
'brand-d': {
  id: 'brand-d',
  name: 'Brand D',
  primaryColor: '#8b5cf6',
  secondaryColor: '#6d28d9',
  accentColor: '#a78bfa',
  logo: '/logos/brand-d.svg',
  defaultLocale: 'en',
  supportedLocales: ['en', 'pt', 'nl'],
},
```

2. **Add build script** in `package.json`:

```json
"dev:brand-d": "cross-env NEXT_PUBLIC_BRAND=brand-d next dev",
"build:brand-d": "cross-env NEXT_PUBLIC_BRAND=brand-d next build"
```

3. **Add locale config** in `src/i18n/config.ts`:

```typescript
'brand-d': {
  en: { name: 'English', flag: '🇺🇸' },
  pt: { name: 'Português', flag: '🇵🇹' },
  nl: { name: 'Nederlands', flag: '🇳🇱' },
},
```

4. **Add translations** in `src/i18n/messages/`:
   - Create `pt.json`, `nl.json` files

5. **Update middleware** if needed (add new locales to matcher)

---

## Adding a New Language

1. **Add translation file** in `src/i18n/messages/[locale].json`

2. **Update brand config** to include locale in `supportedLocales`

3. **Update locale config** in `src/i18n/config.ts`

4. **Update middleware matcher** if needed

---

## Best Practices

### Theming
- ✅ Use CSS variables for brand colors
- ✅ Keep brand config centralized
- ✅ Use semantic color names (primary, secondary, accent)
- ❌ Don't hardcode brand colors in components

### i18n
- ✅ Use translation keys consistently
- ✅ Group translations by feature/domain
- ✅ Only show locales supported by current brand
- ❌ Don't mix hardcoded strings with translations

### Build Process
- ✅ Set brand at build time (not runtime)
- ✅ Use environment variables for brand selection
- ✅ Build separate bundles per brand if needed
- ❌ Don't change brand at runtime

---

## Examples

### Example 1: Brand-themed Button

```tsx
import { getCurrentBrand } from '@/config/brands';

export default function BrandButton() {
  const brand = getCurrentBrand();
  
  return (
    <button
      style={{ backgroundColor: brand.primaryColor }}
      className="px-4 py-2 text-white rounded"
    >
      Click me
    </button>
  );
}
```

### Example 2: Using Translations

```tsx
import { useTranslations } from 'next-intl';

export default function WelcomeMessage() {
  const t = useTranslations();
  const brand = getCurrentBrand();
  
  return (
    <div>
      <h1>{t(`brand-${brand.id.split('-')[1]}.title`)}</h1>
      <p>{t('common.welcome')}</p>
    </div>
  );
}
```

### Example 3: Server Component with Brand

```tsx
import { getCurrentBrand } from '@/config/brands';
import { useTranslations } from 'next-intl';

export default async function ServerPage() {
  const brand = getCurrentBrand();
  // Server components can access brand directly
  
  return (
    <div style={{ borderColor: brand.primaryColor }}>
      <h1>{brand.name}</h1>
    </div>
  );
}
```

---

## Troubleshooting

### Brand not changing?
- Check `NEXT_PUBLIC_BRAND` is set correctly
- Restart dev server after changing env variable
- Clear `.next` cache: `rm -rf .next`

### Locale not working?
- Check locale is in brand's `supportedLocales`
- Verify translation file exists in `src/i18n/messages/`
- Check middleware matcher includes the locale

### Theme colors not applying?
- Check CSS variables are set in layout
- Verify brand config has correct colors
- Check browser DevTools for CSS variable values

---

## Summary

- **Brand**: Set via `NEXT_PUBLIC_BRAND` at build time
- **Theming**: CSS variables injected in layout
- **i18n**: Brand-specific locales via next-intl
- **Routes**: Locale-prefixed (`/en/`, `/es/`, etc.)
- **Build**: Separate commands per brand

This setup allows you to build different branded versions of your app with different themes and languages!

