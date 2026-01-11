/**
 * SSR (Server-Side Rendering) Example
 * 
 * SSR pages are rendered on EACH REQUEST on the server.
 * The HTML is generated fresh for every user request.
 * 
 * Use SSR when:
 * - Content changes frequently
 * - Content is personalized per user
 * - You need real-time data
 * - SEO is important but data is dynamic
 * 
 * In Next.js App Router, use dynamic rendering by:
 * - Using dynamic functions (cookies(), headers(), etc.)
 * - Setting dynamic = 'force-dynamic'
 * - Using fetch with cache: 'no-store'
 */

// Simulate fetching data (in real app, this would be a database call)
async function getServerData() {
  // Simulate API call or database query
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  return {
    timestamp: new Date().toISOString(),
    requestId: Math.random().toString(36).substring(7),
    serverTime: new Date().toLocaleString(),
  };
}

// This page is rendered on each request
export default async function SSRPage() {
  // This data is fetched on EVERY request
  const serverData = await getServerData();
  
  // Using dynamic functions forces SSR
  // const headersList = headers(); // This would force SSR

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
            Server-Side Rendering (SSR)
          </h1>
          
          <div className="space-y-6">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h2 className="font-semibold text-lg mb-2 text-purple-900 dark:text-purple-200">
                How it works:
              </h2>
              <ul className="list-disc list-inside space-y-1 text-purple-800 dark:text-purple-300">
                <li>Page is rendered on EVERY request</li>
                <li>Fresh data fetched from server each time</li>
                <li>Can show personalized content</li>
                <li>Good for SEO (server-rendered HTML)</li>
                <li>Slower than SSG (rendered per request)</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <h3 className="font-semibold mb-2 text-black dark:text-white">
                Request Time (refreshes on each visit):
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono">
                {serverData.timestamp}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This timestamp is generated fresh on every page load.
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <h3 className="font-semibold mb-2 text-black dark:text-white">
                Request ID:
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono">
                {serverData.requestId}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Each request gets a unique ID (refresh to see it change).
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-green-900 dark:text-green-200">
                Use SSR for:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-green-800 dark:text-green-300">
                <li>User dashboards (personalized content)</li>
                <li>Real-time data (stock prices, live scores)</li>
                <li>Content that changes frequently</li>
                <li>Pages requiring authentication</li>
                <li>E-commerce product pages with inventory</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-200">
                Code Example:
              </h3>
              <pre className="bg-gray-900 dark:bg-black p-4 rounded overflow-x-auto text-sm text-green-400">
{`// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

// Or use dynamic functions
export default async function Page() {
  const headersList = headers(); // Forces SSR
  const data = await fetch('...', { 
    cache: 'no-store' // No caching
  });
  return <div>Dynamic content</div>;
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

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';

