# Next.js Rendering Strategies: SSG, SSR, and ISG

This guide explains the three main rendering strategies in Next.js App Router.

---

## SSG (Static Site Generation)

### What it is:
Pages are **pre-rendered at BUILD TIME**. The HTML is generated once when you build the app, and the same HTML is served to all users.

### When to use:
- ✅ Content doesn't change frequently
- ✅ You want the best performance
- ✅ Content is the same for all users
- ✅ SEO is important (fully static HTML)
- ✅ Blog posts, documentation, landing pages

### How it works:
1. Page is generated once during `npm run build`
2. HTML is stored and served from CDN
3. Same HTML for all users
4. Fastest possible performance

### Code Example:
```typescript
// app/ssg/page.tsx
// SSG is the DEFAULT in App Router
export default function SSGPage() {
  return <div>Static content</div>;
}

// Optional: Explicitly force static
export const dynamic = 'force-static';
```

### Pros:
- ⚡ Fastest performance (pre-rendered)
- 💰 Cheapest hosting (static files)
- 🔍 Great for SEO
- 🚀 Can be served from CDN

### Cons:
- ❌ Content doesn't update until rebuild
- ❌ Can't show personalized content
- ❌ Not suitable for real-time data

---

## SSR (Server-Side Rendering)

### What it is:
Pages are **rendered on EACH REQUEST** on the server. Fresh HTML is generated for every user request.

### When to use:
- ✅ Content changes frequently
- ✅ Content is personalized per user
- ✅ You need real-time data
- ✅ User dashboards, authenticated pages
- ✅ E-commerce with live inventory

### How it works:
1. User requests page
2. Server fetches fresh data
3. Server renders HTML with latest data
4. HTML sent to user
5. Process repeats for each request

### Code Example:
```typescript
// app/ssr/page.tsx
export const dynamic = 'force-dynamic'; // Force SSR

export default async function SSRPage() {
  // This runs on EVERY request
  const data = await fetch('...', { 
    cache: 'no-store' // No caching
  });
  
  return <div>Fresh content: {data}</div>;
}

// OR use dynamic functions (automatically forces SSR)
export default async function SSRPage() {
  const headersList = headers(); // Forces SSR
  const cookiesList = cookies(); // Forces SSR
  
  return <div>Dynamic content</div>;
}
```

### Pros:
- ✅ Always shows fresh data
- ✅ Can personalize per user
- ✅ Good for SEO (server-rendered)
- ✅ Real-time data support

### Cons:
- ⚠️ Slower than SSG (rendered per request)
- ⚠️ More server resources needed
- ⚠️ Higher hosting costs

---

## ISG (Incremental Static Regeneration)

### What it is:
Pages are **statically generated at build time**, but can be **regenerated in the background** after a certain time period.

### When to use:
- ✅ Content changes occasionally but not on every request
- ✅ You want SSG performance with fresh data
- ✅ You have many pages and can't rebuild for each change
- ✅ Blog posts, product catalogs, news articles

### How it works:
1. Page is generated at build time (like SSG)
2. Users get cached static page (fast!)
3. After `revalidate` time expires, next request triggers background regeneration
4. New version generates in background
5. Future requests get the new version

### Code Example:
```typescript
// app/isg/page.tsx

// Option 1: Using revalidate export
export const revalidate = 60; // Revalidate every 60 seconds

export default async function ISGPage() {
  const data = await fetch('...');
  return <div>Content: {data}</div>;
}

// Option 2: Using fetch with revalidate
export default async function ISGPage() {
  const data = await fetch('...', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  });
  return <div>Content: {data}</div>;
}
```

### ISG with Dynamic Routes:
```typescript
// app/products/[id]/page.tsx
export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  // Pre-generate common pages at build time
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return <div>{product.name}</div>;
}
```

### Pros:
- ⚡ Fast performance (static pages)
- ✅ Fresh data (background regeneration)
- 💰 Cost-effective (static + occasional regeneration)
- 🚀 Scales well (can pre-generate many pages)

### Cons:
- ⚠️ Slight delay for first request after revalidation
- ⚠️ Not suitable for real-time data

---

## Comparison Table

| Feature | SSG | SSR | ISG |
|---------|-----|-----|-----|
| **When Generated** | Build time | Each request | Build time + background |
| **Performance** | ⚡⚡⚡ Fastest | ⚠️ Slower | ⚡⚡ Fast |
| **Data Freshness** | ❌ Until rebuild | ✅ Always fresh | ✅ Periodic updates |
| **Personalization** | ❌ No | ✅ Yes | ⚠️ Limited |
| **SEO** | ✅✅✅ Excellent | ✅✅ Good | ✅✅✅ Excellent |
| **Hosting Cost** | 💰💰💰 Cheapest | 💰💰💰💰 Higher | 💰💰 Affordable |
| **Use Case** | Static content | Dynamic/personalized | Periodic updates |

---

## Decision Tree

```
Is content the same for all users?
├─ Yes → Does it change frequently?
│   ├─ No → Use SSG ✅
│   └─ Yes → How often?
│       ├─ Every request → Use SSR ✅
│       └─ Periodically (hour/day) → Use ISG ✅
│
└─ No → Is it personalized?
    └─ Yes → Use SSR ✅
```

---

## Examples in This Project

1. **SSG Example**: `/ssg`
   - Shows static content generated at build time
   - Timestamp shows when app was built

2. **SSR Example**: `/ssr`
   - Shows content rendered on each request
   - Timestamp and request ID change on every refresh

3. **ISG Example**: `/isg`
   - Shows static content with revalidation
   - Regenerates every 60 seconds in background

4. **ISG with Dynamic Routes**: `/isg/products/[id]`
   - Demonstrates ISG with dynamic routes
   - Shows how to pre-generate common pages

---

## Best Practices

### Use SSG for:
- Blog posts
- Documentation
- Landing pages
- Marketing pages
- Product pages (if data doesn't change often)

### Use SSR for:
- User dashboards
- Real-time data (stock prices, live scores)
- Authenticated pages
- Personalized content
- E-commerce with live inventory

### Use ISG for:
- Blog posts that update occasionally
- Product catalogs
- News articles
- E-commerce product pages
- Content that changes but not on every request

---

## Summary

- **SSG**: Fastest, cheapest, but static until rebuild
- **SSR**: Always fresh, but slower and more expensive
- **ISG**: Best of both worlds - fast static pages with periodic updates

Choose based on your content update frequency and personalization needs!

