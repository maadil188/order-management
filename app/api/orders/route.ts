import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { createOrderSchema } from '@/lib/validation';
import { Order } from '@/types';

// GET all orders
export async function GET() {
  try {
    const orders = db.getAllOrders();
    return NextResponse.json({
      success: true,
      data: orders
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch orders'
      },
      { status: 500 }
    );
  }
}

// POST create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = createOrderSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid order data',
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const { items, deliveryDetails } = validationResult.data;

    // Calculate total
    const total = items.reduce((sum, item) => {
      return sum + (item.menuItem.price * item.quantity);
    }, 0);

    // Create order
    const order: Order = {
      id: uuidv4(),
      items,
      deliveryDetails,
      total,
      status: 'Order Received',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const createdOrder = db.createOrder(order);

    return NextResponse.json(
      {
        success: true,
        data: createdOrder
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order'
      },
      { status: 500 }
    );
  }
}
