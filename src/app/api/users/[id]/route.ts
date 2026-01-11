import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Dynamic API Route Example
 * GET /api/users/[id] - Get a specific user
 * DELETE /api/users/[id] - Delete a specific user
 */

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Simulate database fetch
    const user = {
      id,
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Simulate deletion
    console.log(`Deleting user via API: ${id}`);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Revalidate pages that show this user or user lists
    revalidatePath('/users');
    revalidatePath(`/users/${id}`);
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: `User ${id} deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete user',
      },
      { status: 500 }
    );
  }
}

