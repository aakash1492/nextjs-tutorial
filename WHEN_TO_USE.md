# When to Use Server Actions vs API Routes

This guide explains when to use **Server Actions** vs **API Routes** in Next.js.

## Server Actions

### ✅ Use Server Actions When:

1. **Form Submissions**
   - Direct form handling with progressive enhancement
   - Works without JavaScript enabled
   - Built-in form validation and error handling

2. **Direct Server Mutations from Client Components**
   - When you need to mutate data directly from client components
   - Simpler than creating API routes for every mutation

3. **Type Safety**
   - Better TypeScript support
   - Type-safe function calls from client components

4. **Progressive Enhancement**
   - Forms work even if JavaScript fails to load
   - Better accessibility and SEO

5. **Co-location**
   - Keep server logic close to your components
   - Easier to maintain and understand

### Example Use Cases:
- User registration/login forms
- Comment submissions
- Like/upvote buttons
- Shopping cart updates
- Profile updates

### Example:
```typescript
// actions.ts
'use server';
export async function createUser(formData: FormData) {
  // Server logic here
}

// Component
<form action={createUser}>
  {/* form fields */}
</form>
```

---

## API Routes

### ✅ Use API Routes When:

1. **RESTful Endpoints**
   - Need standard HTTP methods (GET, POST, PUT, DELETE)
   - Building a public API
   - Need specific HTTP status codes

2. **External Access**
   - APIs that need to be called from external applications
   - Mobile apps, third-party services
   - Webhooks and integrations

3. **CORS Configuration**
   - Need to configure cross-origin requests
   - Serving data to different domains

4. **File Uploads/Streaming**
   - Handling file uploads
   - Streaming responses
   - Large payloads

5. **Third-Party API Calls**
   - Calling external APIs (weather, payment, social media, etc.)
   - Hiding API keys and secrets (never expose in client code)
   - Avoiding CORS issues
   - Adding authentication, rate limiting, caching
   - Transforming data before sending to client

6. **Third-Party Integrations**
   - Webhooks from external services
   - OAuth callbacks
   - Payment gateway callbacks

### Example Use Cases:
- Public REST API
- Webhook endpoints
- File upload endpoints
- Third-party service integrations (Stripe, SendGrid, etc.)
- Mobile app backends
- External API proxies

### Example:
```typescript
// app/api/users/route.ts
export async function GET() {
  return NextResponse.json({ users: [...] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Handle creation
  return NextResponse.json({ success: true });
}
```

### Form Submission with API Routes:
```typescript
// Component - Must prevent default and use fetch
'use client';

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Must prevent default!
  const formData = new FormData(e.currentTarget);
  
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
    }),
  });
  
  const data = await response.json();
  // Handle response...
};

<form onSubmit={handleSubmit}>
  {/* form fields */}
</form>
```

### Third-Party API Calls:
```typescript
// ✅ API Route as Proxy (Recommended)
// app/api/external/route.ts
export async function GET() {
  // API keys are safe here (server-side only)
  const apiKey = process.env.THIRD_PARTY_API_KEY;
  
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'Authorization': `Bearer ${apiKey}`, // Safe!
    },
  });
  
  const data = await response.json();
  return NextResponse.json({ success: true, data });
}

// Client Component
'use client';
const fetchData = async () => {
  const response = await fetch('/api/external');
  const data = await response.json();
  // Use data...
};

// ❌ DON'T do this (exposes API key!)
const response = await fetch('https://api.example.com/data', {
  headers: {
    'Authorization': `Bearer ${apiKey}`, // Exposed in client!
  },
});
```

**Why use API routes as proxy for third-party APIs?**
1. **Security**: API keys stay on server (never exposed to client)
2. **CORS**: Avoid cross-origin issues
3. **Control**: Add rate limiting, caching, authentication
4. **Transformation**: Process/validate data before sending to client
5. **Error Handling**: Centralized error handling and logging

---

## Form Submission: Key Differences

### Server Actions Form:
```typescript
// ✅ Simple - Just pass the action
<form action={createUser}>
  <input name="name" />
  <input name="email" />
  <button type="submit">Submit</button>
</form>

// Works without JavaScript! (Progressive Enhancement)
// No need to prevent default
// No need to manually handle form data
// Built-in loading states with useActionState
```

### API Routes Form:
```typescript
// ⚠️ Requires manual handling
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault(); // Must prevent default!
  
  const formData = new FormData(e.currentTarget);
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.get('name'),
      email: formData.get('email'),
    }),
  });
  
  // Manual error handling, loading states, etc.
};

<form onSubmit={handleSubmit}>
  <input name="name" />
  <input name="email" />
  <button type="submit">Submit</button>
</form>

// ❌ Requires JavaScript
// Must prevent default submission
// Must manually extract form data
// Must manually handle loading/error states
```

**Key Difference**: Server Actions handle forms automatically, while API Routes require you to manually prevent default and use fetch.

---

## Comparison Table

| Feature | Server Actions | API Routes |
|---------|---------------|------------|
| **Form Handling** | ✅ Automatic | ⚠️ Manual (prevent default + fetch) |
| **Progressive Enhancement** | ✅ Built-in | ❌ Requires JavaScript |
| **Type Safety** | ✅ Excellent | ⚠️ Manual typing |
| **External Access** | ❌ No | ✅ Yes |
| **HTTP Methods** | ⚠️ Limited | ✅ Full support |
| **Status Codes** | ⚠️ Limited | ✅ Full control |
| **CORS** | ❌ No | ✅ Yes |
| **File Uploads** | ⚠️ Basic | ✅ Advanced |
| **Webhooks** | ❌ No | ✅ Yes |
| **Use with fetch()** | ❌ No | ✅ Yes |

---

## Best Practices

### Server Actions:
- Use for most form submissions
- Use for mutations from client components
- Use `useActionState` hook for form state management
- Keep actions in separate `actions.ts` files

### API Routes:
- Use when you need external access
- Use for webhooks and third-party integrations
- Use for file uploads and streaming
- Use when building a public API

---

## Summary

**Default to Server Actions** for:
- Forms and user interactions
- Internal data mutations
- When you want progressive enhancement

**Use API Routes** for:
- Public APIs
- External integrations
- Webhooks
- When you need full HTTP control

In most Next.js applications, you'll use **Server Actions** for the majority of your server-side logic, and **API Routes** for specific cases where you need external access or advanced HTTP features.

