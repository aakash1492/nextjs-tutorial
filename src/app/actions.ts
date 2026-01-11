'use server';

import { revalidatePath } from 'next/cache';

/**
 * Server Actions Example
 * 
 * Server Actions are used when you need:
 * - Form submissions and mutations
 * - Direct server-side data mutations from client components
 * - Progressive enhancement (works without JavaScript)
 * - Simpler data fetching/mutations without API routes
 * - When you want to co-locate server logic with your components
 * - Better TypeScript support and type safety
 * 
 * Server Actions can be called directly from client components
 * without needing to create API routes.
 * 
 * revalidatePath: Use after mutations to invalidate cached pages
 * - Revalidates ISG/SSG pages that show the mutated data
 * - Ensures users see fresh data after changes
 * - Call after create/update/delete operations
 */

export type ActionState = {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    name: string;
    email: string;
  };
};

// Example: Form submission action with validation
export async function createUser(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  // Validate input
  if (!name || name.trim().length === 0) {
    return {
      success: false,
      error: 'Name is required',
    };
  }

  if (!email || !email.includes('@')) {
    return {
      success: false,
      error: 'Valid email is required',
    };
  }

  // Simulate database operation
  console.log('Creating user:', { name, email });

  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Revalidate pages that show user lists
  // This ensures ISG/SSG pages show the new user immediately
  revalidatePath('/users'); // Revalidate specific page
  revalidatePath('/'); // Revalidate home page if it shows users
  // You can also use revalidatePath('/users', 'page') for page-level
  // or revalidatePath('/users', 'layout') for layout-level

  return {
    success: true,
    message: `User ${name} created successfully!`,
    data: { name, email },
  };
}

// Example: Simple data mutation
export async function incrementCounter(currentValue: number) {
  'use server';
  
  // Server-side validation
  if (typeof currentValue !== 'number') {
    throw new Error('Invalid counter value');
  }

  // Perform server-side logic
  const newValue = currentValue + 1;

  return {
    success: true,
    value: newValue,
    message: 'Counter incremented!',
  };
}

// Example: Delete action
export async function deleteUser(userId: string) {
  'use server';
  
  // Validate
  if (!userId) {
    return {
      success: false,
      error: 'User ID is required',
    };
  }

  // Simulate deletion
  console.log(`Deleting user: ${userId}`);
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Revalidate pages that show user lists
  revalidatePath('/users');
  revalidatePath('/');
  // Also revalidate the specific user page if it exists
  revalidatePath(`/users/${userId}`);

  return {
    success: true,
    message: `User ${userId} deleted successfully!`,
  };
}

