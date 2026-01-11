/**
 * SSG (Static Site Generation) Example
 * 
 * SSG pages are pre-rendered at BUILD TIME.
 * The HTML is generated once when you build the app, and the same HTML
 * is served to all users. This is the fastest option.
 * 
 * Use SSG when:
 * - Content doesn't change frequently
 * - You want the best performance
 * - Content is the same for all users
 * - SEO is important (fully static HTML)
 * 
 * In Next.js App Router, pages are SSG by default unless you use
 * dynamic functions or force dynamic rendering.
 */

// This page is statically generated at build time
export default function SSGPage() {
  // This data is "baked in" at build time
  const buildTime = new Date().toISOString();
  const staticData = {
    title: 'Static Site Generation (SSG)',
    description: 'This page was generated at build time',
    buildTime,
    message: 'This content is the same for all users and never changes until you rebuild.',
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
            {staticData.title}
          </h1>
          
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h2 className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-200">
                How it works:
              </h2>
              <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-300">
                <li>Page is generated once at build time</li>
                <li>Same HTML is served to all users</li>
                <li>Fastest performance (pre-rendered)</li>
                <li>Great for SEO</li>
                <li>Content doesn't change until rebuild</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <h3 className="font-semibold mb-2 text-black dark:text-white">
                Build Time:
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono">
                {staticData.buildTime}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This timestamp was generated when the app was built, not when you visit the page.
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-green-900 dark:text-green-200">
                Use SSG for:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-green-800 dark:text-green-300">
                <li>Blog posts</li>
                <li>Documentation pages</li>
                <li>Landing pages</li>
                <li>Product pages (if data doesn't change often)</li>
                <li>Marketing pages</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-200">
                Code Example:
              </h3>
              <pre className="bg-gray-900 dark:bg-black p-4 rounded overflow-x-auto text-sm text-green-400">
{`// This is SSG by default in App Router
export default function Page() {
  // Data fetched at build time
  return <div>Static content</div>;
}

// Force static generation
export const dynamic = 'force-static';`}
              </pre>
            </div>

            <div className="flex gap-4">
              <a
                href="/ssr"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
              >
                See SSR Example →
              </a>
              <a
                href="/isg"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                See ISG Example →
              </a>
              <a
                href="/"
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Force static generation (optional - it's the default)
export const dynamic = 'force-static';

