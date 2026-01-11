'use client';

import { useActionState } from 'react';
import { createUser, type ActionState } from '../actions';

/**
 * Client Component with useActionState Example
 * 
 * useActionState is used for:
 * - Managing form state and server action results
 * - Handling pending states during form submission
 * - Displaying success/error messages
 * - Progressive enhancement (form works without JavaScript)
 * 
 * This is the recommended way to handle forms with Server Actions in Next.js 14+
 */

export default function UserForm() {
  const [state, formAction, isPending] = useActionState<ActionState | null, FormData>(
    createUser,
    null
  );

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Create User (Server Action + useActionState)
      </h2>
      
      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-zinc-800 text-black dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-zinc-800 text-black dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 
                   text-white font-medium rounded-md
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
          {isPending ? 'Creating...' : 'Create User'}
        </button>
      </form>

      {/* Display success/error messages */}
      {state && (
        <div
          className={`mt-4 p-3 rounded-md ${
            state.success
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}
        >
          {state.success ? (
            <div>
              <p className="font-medium">✓ {state.message}</p>
              {state.data && (
                <p className="text-sm mt-1">
                  Created: {state.data.name} ({state.data.email})
                </p>
              )}
            </div>
          ) : (
            <p className="font-medium">✗ {state.error}</p>
          )}
        </div>
      )}
    </div>
  );
}

