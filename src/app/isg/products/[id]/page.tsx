/**
 * ISG with Dynamic Routes Example
 * 
 * This demonstrates ISG with dynamic routes.
 * Pages are generated on-demand and then cached with revalidation.
 */

async function getProduct(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  return {
    id,
    name: `Product ${id}`,
    price: Math.floor(Math.random() * 1000) + 100,
    description: `This is product ${id}. Generated at ${new Date().toISOString()}`,
    generatedAt: new Date().toISOString(),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
            Product: {product.name}
          </h1>
          
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <h3 className="font-semibold mb-2 text-black dark:text-white">
                Product Details:
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>ID:</strong> {product.id}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Price:</strong> ${product.price}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Description:</strong> {product.description}
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-green-900 dark:text-green-200">
                ISG with Dynamic Routes:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-green-800 dark:text-green-300">
                <li>First visit: Page is generated on-demand</li>
                <li>Subsequent visits: Served from cache</li>
                <li>After revalidate time: Regenerates in background</li>
                <li>Perfect for product pages, blog posts, etc.</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <h3 className="font-semibold mb-2 text-black dark:text-white">
                Generated At:
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                {product.generatedAt}
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="/isg"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
              >
                ← Back to ISG
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

// Generate static params for common products (optional)
export async function generateStaticParams() {
  // In real app, fetch from API
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

// Revalidate every 60 seconds
export const revalidate = 60;

