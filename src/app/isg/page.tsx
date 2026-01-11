/**
 * ISG (Incremental Static Regeneration) Example
 * 
 * ISG pages are statically generated at build time, but can be
 * regenerated in the background after a certain time period.
 * 
 * Use ISG when:
 * - Content changes occasionally but not on every request
 * - You want the performance of SSG with the freshness of SSR
 * - You have many pages and can't rebuild for each change
 * - Content updates periodically (e.g., every hour, day)
 * 
 * In Next.js App Router, use revalidate in fetch or export revalidate
 */

// Simulate fetching data (in real app, this would be a database call)
async function getData() {
  // Simulate API call or database query
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  return {
    generatedAt: new Date().toISOString(),
    message: 'This page regenerates every 60 seconds in the background',
    revalidateTime: 60, // seconds
  };
}

// This page uses ISG - static with revalidation
export default async function ISGPage() {
  const data = await getData();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
            Incremental Static Regeneration (ISG)
          </h1>
          
          <div className="space-y-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h2 className="font-semibold text-lg mb-2 text-green-900 dark:text-green-200">
                How it works:
              </h2>
              <ul className="list-disc list-inside space-y-1 text-green-800 dark:text-green-300">
                <li>Page is generated at build time (like SSG)</li>
                <li>After revalidate time, next request triggers background regeneration</li>
                <li>Users get cached version while new version generates</li>
                <li>Best of both worlds: SSG performance + fresh data</li>
                <li>Perfect for content that updates periodically</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <h3 className="font-semibold mb-2 text-black dark:text-white">
                Page Generated At:
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono">
                {data.generatedAt}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This page regenerates every {data.revalidateTime} seconds in the background.
                Refresh after {data.revalidateTime} seconds to see a new timestamp.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-200">
                Revalidation Flow:
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-300">
                <li>Page is statically generated at build time</li>
                <li>Users get the cached static page (fast!)</li>
                <li>After revalidate time expires, next request triggers regeneration</li>
                <li>New version generates in background</li>
                <li>Future requests get the new version</li>
              </ol>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-green-900 dark:text-green-200">
                Use ISG for:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-green-800 dark:text-green-300">
                <li>Blog posts that update occasionally</li>
                <li>Product catalogs (inventory updates periodically)</li>
                <li>News articles</li>
                <li>E-commerce product pages</li>
                <li>Content that changes but not on every request</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-200">
                Code Example:
              </h3>
              <pre className="bg-gray-900 dark:bg-black p-4 rounded overflow-x-auto text-sm text-green-400">
{`// Option 1: Using revalidate export
export const revalidate = 60; // seconds

export default async function Page() {
  const data = await fetch('...');
  return <div>Content</div>;
}

// Option 2: Using fetch with revalidate
export default async function Page() {
  const data = await fetch('...', {
    next: { revalidate: 60 } // seconds
  });
  return <div>Content</div>;
}`}
              </pre>
            </div>

            <div className="flex gap-4">
              <a
                href="/ssg"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                See SSG Example →
              </a>
              <a
                href="/ssr"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
              >
                See SSR Example →
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

// Revalidate every 60 seconds (ISG)
export const revalidate = 60;

