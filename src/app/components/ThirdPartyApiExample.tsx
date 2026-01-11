'use client';

import { useState, FormEvent, useEffect } from 'react';

/**
 * Third-Party API Example Component
 * 
 * This demonstrates how to call third-party APIs through Next.js API routes.
 * 
 * Why use API routes as a proxy?
 * 1. Security: Hide API keys (never expose in client code)
 * 2. CORS: Avoid cross-origin issues
 * 3. Control: Add authentication, rate limiting, caching
 * 4. Transformation: Process data before sending to client
 * 
 * This component automatically fetches posts on mount using useEffect.
 */

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function ThirdPartyApiExample() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [postId, setPostId] = useState('');

  // Fetch posts from third-party API via our proxy
  const fetchPosts = async (id?: string) => {
    setLoading(true);
    setMessage(null);
    try {
      const url = id
        ? `/api/external?postId=${id}`
        : '/api/external';
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        const postsData = Array.isArray(data.data) ? data.data : [data.data];
        setPosts(postsData);
        setMessage(`Fetched ${postsData.length} post(s) from third-party API!`);
      } else {
        setMessage(data.error || 'Failed to fetch posts');
      }
    } catch (error) {
      setMessage('Error fetching posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Call API on component mount (on load)
  useEffect(() => {
    fetchPosts();
  }, []); // Empty dependency array = run once on mount

  // Create post via third-party API
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;

    if (!title || !body) {
      setMessage('Title and body are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/external', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Post created via third-party API! ID: ${data.data.id}`);
        e.currentTarget.reset();
        // Refresh posts list
        fetchPosts();
      } else {
        setMessage(data.error || 'Failed to create post');
      }
    } catch (error) {
      setMessage('Error creating post');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Third-Party API Example
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        This calls a third-party API (JSONPlaceholder) through our Next.js API route proxy.
        In production, replace the URL with your actual third-party service.
      </p>

      <div className="space-y-6">
        {/* Fetch Controls */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => fetchPosts()}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 
                       text-white font-medium rounded-md
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200"
            >
              {loading ? 'Loading...' : 'Fetch All Posts'}
            </button>

            <div className="flex gap-2 flex-1">
              <input
                type="number"
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
                placeholder="Post ID"
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-zinc-800 text-black dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         disabled:opacity-50"
                min="1"
              />
              <button
                onClick={() => postId && fetchPosts(postId)}
                disabled={loading || !postId}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 
                         text-white font-medium rounded-md
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-200"
              >
                Fetch Post
              </button>
            </div>
          </div>
        </div>

        {/* Create Post Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
          <h3 className="font-semibold text-black dark:text-white">Create New Post</h3>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-zinc-800 text-black dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Body
            </label>
            <textarea
              id="body"
              name="body"
              required
              disabled={loading}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-zinc-800 text-black dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter post body"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 
                     text-white font-medium rounded-md
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            {loading ? 'Creating...' : 'Create Post via Third-Party API'}
          </button>
        </form>

        {/* Messages */}
        {message && (
          <div
            className={`p-3 rounded-md ${
              message.includes('success') || message.includes('Fetched') || message.includes('created')
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* Posts List */}
        {posts.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-3 text-black dark:text-white">
              Posts from Third-Party API:
            </h3>
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg 
                           border border-gray-200 dark:border-zinc-700"
                >
                  <h4 className="font-semibold text-lg mb-2 text-black dark:text-white">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {post.body}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Post ID: {post.id} | User ID: {post.userId}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

