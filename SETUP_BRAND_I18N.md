# Quick Setup: Brand Theming & i18n

## ✅ What's Been Set Up

1. **Brand Configuration** (`src/config/brands.ts`)
   - 3 brands: brand-a (blue), brand-b (green), brand-c (orange)
   - Each brand has colors, logo, and supported locales

2. **Internationalization** (next-intl)
   - Locale-based routing (`/en/`, `/es/`, etc.)
   - Brand-specific supported languages
   - Translation files in `src/i18n/messages/`

3. **Theme System**
   - CSS variables for brand colors
   - Injected at build time based on brand
   - Accessible via `getCurrentBrand()`

4. **Build Scripts**
   - `npm run dev:brand-a` - Dev with Brand A
   - `npm run build:brand-a` - Build for Brand A
   - Same for brand-b and brand-c

---

## 🚀 Quick Start

### 1. Run with a specific brand:

```bash
# Development
npm run dev:brand-a

# Production build
npm run build:brand-a
```

### 2. Access the app:

- Visit: `http://localhost:3000/en/` (or `/es/`, `/fr/` based on brand)
- The app will automatically redirect to default locale

### 3. Change language:

- Use the locale switcher in the header
- Only shows languages supported by current brand

---

## 📝 How It Works

### Brand Selection
- Set via `NEXT_PUBLIC_BRAND` environment variable
- Determined at **build time** (not runtime)
- Defaults to `brand-a` if not set

### Theme Colors
- Injected as CSS variables in `[locale]/layout.tsx`
- Available as `--brand-primary`, `--brand-secondary`, `--brand-accent`
- Use via `getCurrentBrand()` function

### Internationalization
- Routes are locale-prefixed: `/en/`, `/es/`, `/fr/`
- Each brand supports different languages
- Translations in `src/i18n/messages/[locale].json`

---

## 🔧 Customization

### Add a New Brand

1. Edit `src/config/brands.ts`:
```typescript
'brand-d': {
  id: 'brand-d',
  name: 'Brand D',
  primaryColor: '#8b5cf6',
  // ... other config
}
```

2. Add build scripts in `package.json`

3. Add locale config in `src/i18n/config.ts`

### Add a New Language

1. Create `src/i18n/messages/[locale].json`

2. Add locale to brand's `supportedLocales` in `brands.ts`

3. Update `src/i18n/config.ts` with locale info

---

## 📁 File Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based routes
│   │   ├── layout.tsx     # Applies brand theme
│   │   └── page.tsx        # Home page with i18n
│   ├── components/        # Components (can use brand/i18n)
│   └── layout.tsx         # Root layout
├── config/
│   └── brands.ts          # Brand definitions
├── i18n/
│   ├── config.ts          # i18n config
│   ├── request.ts         # next-intl setup
│   └── messages/          # Translation files
└── middleware.ts          # i18n routing
```

---

## 🎨 Using Brand Colors

```tsx
import { getCurrentBrand } from '@/config/brands';

const brand = getCurrentBrand();

// Inline styles
<div style={{ color: brand.primaryColor }}>Text</div>

// CSS classes (uses CSS variables)
<button className="btn-brand">Button</button>
```

---

## 🌍 Using Translations

```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations();

<h1>{t('common.welcome')}</h1>
<p>{t('brand-a.title')}</p>
```

---

## ⚠️ Important Notes

1. **Brand is set at build time** - restart dev server after changing `NEXT_PUBLIC_BRAND`
2. **Routes are locale-prefixed** - all pages are under `/[locale]/`
3. **Only brand-supported locales** are shown in the switcher
4. **Clear cache** if brand doesn't change: `rm -rf .next`

---

## 🐛 Troubleshooting

**Brand not changing?**
- Check `NEXT_PUBLIC_BRAND` is set
- Restart dev server
- Clear `.next` folder

**Locale not working?**
- Check locale is in brand's `supportedLocales`
- Verify translation file exists
- Check middleware matcher

**Theme not applying?**
- Check CSS variables in browser DevTools
- Verify brand config has colors
- Check layout applies theme CSS

---

## 📚 More Info

See `BRAND_THEMING_I18N.md` for detailed documentation.

