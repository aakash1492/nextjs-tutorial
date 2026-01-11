import { useTranslations } from 'next-intl';
import { getCurrentBrand } from '@/config/brands';
import UserForm from '../components/UserForm';
import ApiExample from '../components/ApiExample';
import ThirdPartyApiExample from '../components/ThirdPartyApiExample';
import LocaleSwitcher from '../components/LocaleSwitcher';

export default function HomePage() {
  const t = useTranslations();
  const brand = getCurrentBrand();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="container mx-auto px-4 py-12">
        {/* Brand Header */}
        <div className="mb-8 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border-l-4" style={{ borderColor: brand.primaryColor }}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: brand.primaryColor }}>
                {brand.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Current Brand: <strong>{brand.id}</strong> | Theme: {brand.primaryColor}
              </p>
            </div>
            <LocaleSwitcher />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-zinc-50">
            {t('common.welcome')} - {t(`brand-${brand.id.split('-')[1]}.title`)}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t(`brand-${brand.id.split('-')[1]}.description`)}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Server Actions Example */}
          <div>
            <UserForm />
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${brand.primaryColor}15` }}>
              <h3 className="font-semibold mb-2" style={{ color: brand.primaryColor }}>
                Server Actions Benefits:
              </h3>
              <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: brand.secondaryColor }}>
                <li>Progressive enhancement (works without JS)</li>
                <li>Type-safe function calls</li>
                <li>Simpler form handling</li>
                <li>Built-in validation</li>
              </ul>
            </div>
          </div>

          {/* API Routes Example */}
          <div>
            <ApiExample />
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${brand.accentColor}15` }}>
              <h3 className="font-semibold mb-2" style={{ color: brand.accentColor }}>
                API Routes Benefits:
              </h3>
              <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: brand.secondaryColor }}>
                <li>RESTful endpoints</li>
                <li>External access (mobile apps, etc.)</li>
                <li>Full HTTP method support</li>
                <li>CORS configuration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Third-Party API Example */}
        <div className="mt-12 max-w-6xl mx-auto">
          <ThirdPartyApiExample />
        </div>

        {/* Brand-themed CTA */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="p-8 rounded-lg shadow-lg text-center" style={{ backgroundColor: `${brand.primaryColor}10` }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: brand.primaryColor }}>
              {t(`brand-${brand.id.split('-')[1]}.cta`)}
            </h2>
            <button
              className="btn-brand px-6 py-3 rounded-md font-semibold"
              style={{ backgroundColor: brand.primaryColor }}
            >
              {t('common.submit')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

