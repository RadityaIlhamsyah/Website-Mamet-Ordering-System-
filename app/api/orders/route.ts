import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/db-utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, tableNumber, items, total, paymentMethod } = body;

    if (!customerName || !tableNumber || !items || !total || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate order code
    const orderCode = `ORD-${Date.now()}`;

    const orderId = await createOrder({
      orderCode,
      customerName,
      tableNumber,
      items,
      total,
      status: 'pending',
      paymentMethod,
    });

    return NextResponse.json({
      success: true,
      orderCode,
      orderId,
    });
  } catch (error) {
    console.error('[v0] Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
