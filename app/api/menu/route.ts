import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const menuItems = db.getMenuItems();
    return NextResponse.json({
      success: true,
      data: menuItems
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch menu items'
      },
      { status: 500 }
    );
  }
}
