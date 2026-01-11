import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * API Routes Example
 * 
 * API Routes are used when you need:
 * - RESTful endpoints that can be called from anywhere (external apps, mobile apps, etc.)
 * - Webhooks and third-party integrations
 * - When you need HTTP methods (GET, POST, PUT, DELETE, etc.)
 * - When you need to return specific HTTP status codes
 * - When you need to handle file uploads or streaming
 * - When you need CORS configuration
 * - When building a public API
 * 
 * API Routes are accessed via HTTP requests (fetch, axios, etc.)
 */

// GET /api/users - Fetch all users
export async function GET() {
  try {
    // Simulate database fetch
    const users = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch users',
      },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name and email are required',
        },
        { status: 400 }
      );
    }

    // Simulate database operation
    console.log('Creating user via API:', { name, email });

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Revalidate pages that show user lists
    // This ensures cached pages (ISG/SSG) show the new user
    revalidatePath('/users');
    revalidatePath('/');

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        data: {
          id: Date.now().toString(),
          name,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create user',
      },
      { status: 500 }
    );
  }
}

