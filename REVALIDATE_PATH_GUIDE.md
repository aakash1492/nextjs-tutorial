# revalidatePath Guide

This guide explains when and how to use `revalidatePath` in Next.js.

---

## What is revalidatePath?

`revalidatePath` invalidates cached data for a specific path. It's used after mutations (create/update/delete) to ensure users see fresh data on ISG/SSG pages.

---

## When to Use revalidatePath

### ✅ Use revalidatePath After:

1. **Creating new data** (POST operations)
   - After creating a user, revalidate the users list page
   - After creating a post, revalidate the blog listing page

2. **Updating data** (PUT/PATCH operations)
   - After updating a user, revalidate that user's page and list pages
   - After updating a product, revalidate product pages

3. **Deleting data** (DELETE operations)
   - After deleting, revalidate list pages and the deleted item's page

4. **Any mutation that affects cached pages**
   - If a page shows data that was just changed, revalidate it

### ❌ Don't Use revalidatePath:

- In GET requests (read-only operations)
- For data that doesn't affect any cached pages
- For client-side only mutations (use React state instead)

---

## How to Use revalidatePath

### Basic Usage

```typescript
import { revalidatePath } from 'next/cache';

// Revalidate a specific page
revalidatePath('/users');

// Revalidate a dynamic route
revalidatePath(`/users/${userId}`);

// Revalidate home page
revalidatePath('/');
```

### Revalidation Types

```typescript
// Revalidate page-level cache (default)
revalidatePath('/users', 'page');

// Revalidate layout-level cache
revalidatePath('/users', 'layout');

// Revalidate both page and layout
revalidatePath('/users', 'page');
revalidatePath('/users', 'layout');
```

---

## Examples in This Project

### 1. Server Actions

```typescript
// src/app/actions.ts
'use server';
import { revalidatePath } from 'next/cache';

export async function createUser(formData: FormData) {
  // ... create user logic ...
  
  // Revalidate pages that show users
  revalidatePath('/users');
  revalidatePath('/');
  
  return { success: true };
}

export async function deleteUser(userId: string) {
  // ... delete user logic ...
  
  // Revalidate list and specific user page
  revalidatePath('/users');
  revalidatePath(`/users/${userId}`);
  revalidatePath('/');
  
  return { success: true };
}
```

### 2. API Routes

```typescript
// src/app/api/users/route.ts
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  // ... create user logic ...
  
  // Revalidate after creation
  revalidatePath('/users');
  revalidatePath('/');
  
  return NextResponse.json({ success: true });
}
```

---

## Common Patterns

### Pattern 1: Revalidate After Create

```typescript
async function createPost(data: PostData) {
  // Save to database
  await db.posts.create(data);
  
  // Revalidate pages that show posts
  revalidatePath('/posts');
  revalidatePath('/');
  revalidatePath(`/posts/${data.id}`); // If detail page exists
}
```

### Pattern 2: Revalidate After Update

```typescript
async function updatePost(id: string, data: PostData) {
  // Update in database
  await db.posts.update(id, data);
  
  // Revalidate the post page and list
  revalidatePath(`/posts/${id}`);
  revalidatePath('/posts');
}
```

### Pattern 3: Revalidate After Delete

```typescript
async function deletePost(id: string) {
  // Delete from database
  await db.posts.delete(id);
  
  // Revalidate list (post page no longer exists)
  revalidatePath('/posts');
  revalidatePath('/');
}
```

### Pattern 4: Revalidate Multiple Related Pages

```typescript
async function updateUserProfile(userId: string, data: ProfileData) {
  await db.users.update(userId, data);
  
  // Revalidate all pages that might show this user
  revalidatePath(`/users/${userId}`);
  revalidatePath('/users');
  revalidatePath('/dashboard'); // If dashboard shows user info
  revalidatePath('/'); // If home shows user info
}
```

---

## revalidatePath vs revalidateTag

### revalidatePath
- Invalidates by **path/route**
- Use when you know the exact pages to revalidate
- Simpler, more direct

```typescript
revalidatePath('/users');
```

### revalidateTag
- Invalidates by **tag** (set in fetch)
- Use when you want to group related data
- More flexible for complex scenarios

```typescript
// In fetch
fetch(url, { next: { tags: ['users'] } });

// After mutation
revalidateTag('users'); // Revalidates all fetches with this tag
```

**When to use which:**
- **revalidatePath**: When you know specific pages to update
- **revalidateTag**: When you want to group related data across multiple pages

---

## Best Practices

1. **Revalidate after mutations**: Always call `revalidatePath` after create/update/delete
2. **Revalidate all affected pages**: Don't just revalidate one page - think about all pages that show the data
3. **Use in Server Actions**: Perfect for Server Actions that mutate data
4. **Use in API Routes**: Also works in API route handlers
5. **Don't over-revalidate**: Only revalidate pages that actually show the changed data

---

## Real-World Example

```typescript
// E-commerce: Update product inventory
async function updateProductInventory(productId: string, quantity: number) {
  await db.products.update(productId, { inventory: quantity });
  
  // Revalidate product page
  revalidatePath(`/products/${productId}`);
  
  // Revalidate category pages (products might be listed there)
  const product = await db.products.get(productId);
  revalidatePath(`/categories/${product.categoryId}`);
  
  // Revalidate search/listing pages
  revalidatePath('/products');
  revalidatePath('/');
}
```

---

## Summary

- ✅ Use `revalidatePath` after mutations (create/update/delete)
- ✅ Revalidate all pages that show the changed data
- ✅ Works in Server Actions and API Routes
- ✅ Ensures ISG/SSG pages show fresh data
- ❌ Don't use in GET requests
- ❌ Don't over-revalidate unnecessary pages

**Remember**: The goal is to ensure users see fresh data after mutations, especially on statically generated pages!

