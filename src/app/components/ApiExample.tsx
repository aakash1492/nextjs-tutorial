'use client';

import { useState, FormEvent } from 'react';

/**
 * Client Component using API Routes Example
 * 
 * This demonstrates how to call API routes from a client component
 * using fetch with forms. This is useful when you need to:
 * - Call APIs from external sources
 * - Handle different HTTP methods
 * - Work with third-party integrations
 * 
 * Note: With API routes, you need to:
 * 1. Prevent default form submission
 * 2. Manually handle form data
 * 3. Use fetch() to call the API
 * 4. Handle loading and error states manually
 */

export default function ApiExample() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data);
        setMessage('Users fetched successfully!');
      } else {
        setMessage('Failed to fetch users');
      }
    } catch (error) {
      setMessage('Error fetching users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Form submission handler for API routes
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setMessage(null);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // Validate
    if (!name || !email) {
      setMessage('Name and email are required');
      setLoading(false);
      return;
    }

    try {
      // Call API route using fetch
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage(`User created: ${data.data.name}`);
        // Reset form
        e.currentTarget.reset();
        // Refresh users list
        fetchUsers();
      } else {
        setMessage(data.error || 'Failed to create user');
      }
    } catch (error) {
      setMessage('Error creating user');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        API Routes Example
      </h2>

      <div className="space-y-4">
        {/* Form that submits to API route */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="api-name"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="api-name"
              name="name"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-zinc-800 text-black dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-green-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="api-email"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="api-email"
              name="email"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-zinc-800 text-black dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-green-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 
                     text-white font-medium rounded-md
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            {loading ? 'Creating...' : 'Create User via API'}
          </button>
        </form>

        {/* Button to fetch users */}
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 
                   text-white font-medium rounded-md
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
          {loading ? 'Loading...' : 'Fetch Users'}
        </button>

        {message && (
          <div
            className={`p-3 rounded-md ${
              message.includes('success') || message.includes('created')
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}
          >
            {message}
          </div>
        )}

        {users.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-black dark:text-white">
              Users:
            </h3>
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-2 bg-gray-100 dark:bg-zinc-800 rounded 
                           text-gray-800 dark:text-gray-200"
                >
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

