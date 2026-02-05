import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { updateOrderStatusSchema } from '@/lib/validation';

// GET order by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = db.getOrderById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch order'
      },
      { status: 500 }
    );
  }
}

// PATCH update order status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validationResult = updateOrderStatusSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status',
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const { status } = validationResult.data;
    const updatedOrder = db.updateOrderStatus(id, status);

    if (!updatedOrder) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedOrder
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update order status'
      },
      { status: 500 }
    );
  }
}
