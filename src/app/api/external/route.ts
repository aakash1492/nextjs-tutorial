import { NextRequest, NextResponse } from 'next/server';

/**
 * Third-Party API Proxy Example
 * 
 * This API route acts as a proxy to call external/third-party APIs.
 * 
 * Why use a proxy instead of calling directly from client?
 * - Hide API keys/secrets (never expose in client-side code)
 * - Avoid CORS issues
 * - Add authentication/authorization
 * - Transform/validate data before sending to client
 * - Rate limiting and caching
 * - Error handling and logging
 */

// Example: Proxy to JSONPlaceholder (dummy REST API)
// In production, replace with your actual third-party API URL
const THIRD_PARTY_API_URL = 'https://jsonplaceholder.typicode.com';

// GET /api/external - Fetch posts from third-party API
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');

    // Build the third-party API URL
    const apiUrl = postId
      ? `${THIRD_PARTY_API_URL}/posts/${postId}`
      : `${THIRD_PARTY_API_URL}/posts?_limit=5`;

    // Call the third-party API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        // Add any required headers (API keys, auth tokens, etc.)
        // 'Authorization': `Bearer ${process.env.THIRD_PARTY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      // Add cache options if needed
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Third-party API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform/validate data if needed before sending to client
    const transformedData = Array.isArray(data)
      ? data.map((item: any) => ({
          id: item.id,
          title: item.title,
          body: item.body,
          userId: item.userId,
        }))
      : {
          id: data.id,
          title: data.title,
          body: data.body,
          userId: data.userId,
        };

    return NextResponse.json({
      success: true,
      data: transformedData,
      source: 'third-party-api',
    });
  } catch (error) {
    console.error('Error calling third-party API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch data from third-party API',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST /api/external - Create data via third-party API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.title || !body.body) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title and body are required',
        },
        { status: 400 }
      );
    }

    // Call the third-party API
    const response = await fetch(`${THIRD_PARTY_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication if needed
        // 'Authorization': `Bearer ${process.env.THIRD_PARTY_API_KEY}`,
      },
      body: JSON.stringify({
        title: body.title,
        body: body.body,
        userId: body.userId || 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`Third-party API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: 'Data created via third-party API',
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error calling third-party API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create data via third-party API',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

