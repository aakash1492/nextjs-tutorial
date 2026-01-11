# API Best Practices in Next.js

This guide explains the best ways to handle API calls in Next.js, including when to use fetch, axios, and TanStack Query.

---

## Quick Answer: What to Use When?

| Scenario | Recommended Approach |
|---------|---------------------|
| **Server Components** | Native `fetch` (Next.js extends it) |
| **Server Actions** | Server Actions with `useActionState` |
| **Client Components - Simple** | Native `fetch` with `useState` |
| **Client Components - Complex** | **TanStack Query** (React Query) |
| **Third-Party APIs** | API Routes (proxy) + TanStack Query on client |

---

## 1. Native Fetch vs Axios

### ✅ Use Native `fetch` (Recommended for Next.js)

**Why:**
- Built into Next.js and browsers
- Next.js extends it with automatic caching, revalidation
- Works in both Server and Client Components
- No extra dependencies
- Smaller bundle size

**Example:**
```typescript
// Server Component
async function ServerComponent() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // ISG caching
  });
  return <div>{data}</div>;
}

// Client Component
const response = await fetch('/api/users');
const data = await response.json();
```

### ⚠️ Use Axios (Optional)

**When to use:**
- You need interceptors (request/response middleware)
- You prefer axios API
- You need automatic JSON parsing (though fetch is fine too)
- Legacy codebase already using axios

**Trade-offs:**
- Adds ~13KB to bundle
- Extra dependency to maintain
- Doesn't benefit from Next.js fetch extensions

**Example:**
```typescript
import axios from 'axios';

const response = await axios.get('/api/users');
// Automatic JSON parsing, but fetch is fine too
```

**Verdict:** Stick with `fetch` unless you specifically need axios features.

---

## 2. TanStack Query (React Query)

### ✅ Use TanStack Query for Client-Side Data Fetching

**When to use:**
- Complex data fetching with caching
- Background refetching
- Optimistic updates
- Pagination, infinite scroll
- Multiple related queries
- Real-time data that needs to stay fresh

**Benefits:**
- Automatic caching and deduplication
- Background refetching
- Loading/error states handled
- Optimistic updates
- Request deduplication (same request = one network call)
- Great DevTools

**When NOT to use:**
- Simple one-off API calls
- Server Actions (use `useActionState` instead)
- Server Components (use async/await directly)

---

## 3. Best Practices by Use Case

### Server Components (SSR/SSG/ISG)

```typescript
// ✅ Best: Native fetch with Next.js caching
async function ProductPage({ id }: { id: string }) {
  const product = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 3600 } // ISG: revalidate every hour
  }).then(res => res.json());

  return <div>{product.name}</div>;
}
```

### Server Actions

```typescript
// ✅ Best: Server Actions with useActionState
'use server';
export async function createUser(formData: FormData) {
  // Server logic
}

// Client
const [state, formAction, isPending] = useActionState(createUser, null);
<form action={formAction}>...</form>
```

### Client Components - Simple Cases

```typescript
// ✅ Fine for simple cases
const [data, setData] = useState(null);
const fetchData = async () => {
  const res = await fetch('/api/data');
  setData(await res.json());
};
```

### Client Components - Complex Cases

```typescript
// ✅ Best: TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json()),
});
```

---

## 4. Recommended Setup

### For Most Next.js Apps:

1. **Server Components**: Native `fetch`
2. **Server Actions**: Use `useActionState`
3. **Client Components**: 
   - Simple: `fetch` + `useState`
   - Complex: **TanStack Query**

### For Complex Apps:

1. **Server Components**: Native `fetch`
2. **Server Actions**: Use `useActionState`
3. **Client Components**: **TanStack Query** for all API calls
4. **Third-Party APIs**: API Routes (proxy) + TanStack Query

---

## 5. Comparison Table

| Feature | Native Fetch | Axios | TanStack Query |
|---------|-------------|-------|----------------|
| **Bundle Size** | ✅ 0KB | ⚠️ ~13KB | ⚠️ ~12KB |
| **Next.js Integration** | ✅✅✅ Excellent | ❌ No | ✅✅ Good |
| **Caching** | ✅ (Server) | ❌ Manual | ✅✅✅ Automatic |
| **Loading States** | ⚠️ Manual | ⚠️ Manual | ✅✅✅ Built-in |
| **Error Handling** | ⚠️ Manual | ⚠️ Manual | ✅✅✅ Built-in |
| **Background Refetch** | ❌ No | ❌ No | ✅✅✅ Yes |
| **Request Deduplication** | ❌ No | ❌ No | ✅✅✅ Yes |
| **Optimistic Updates** | ❌ No | ❌ No | ✅✅✅ Yes |
| **DevTools** | ❌ No | ❌ No | ✅✅✅ Yes |

---

## 6. Decision Tree

```
Are you in a Server Component?
├─ Yes → Use native fetch ✅
│
└─ No (Client Component)
    ├─ Is it a form submission?
    │   └─ Yes → Use Server Actions with useActionState ✅
    │
    └─ No (Data fetching)
        ├─ Simple one-off call?
        │   └─ Yes → Use fetch + useState ✅
        │
        └─ Complex (caching, refetching, etc.)?
            └─ Yes → Use TanStack Query ✅✅✅
```

---

## 7. Example: TanStack Query Setup

See `src/app/components/TanStackQueryExample.tsx` for a complete example.

---

## Summary

**Recommended Stack:**
- ✅ **Native `fetch`** for Server Components and simple client calls
- ✅ **Server Actions** for form submissions
- ✅ **TanStack Query** for complex client-side data fetching
- ❌ **Axios** - Only if you specifically need its features

**For most Next.js apps:**
- Server: Native `fetch`
- Forms: Server Actions
- Client data fetching: TanStack Query (when needed)

