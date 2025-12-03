import { NextResponse } from 'next/server';
import { getOrders, updateOrderStatus } from '@/lib/db-utils';
import { verifySession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('[v0] Get admin orders error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderCode, status } = await request.json();
    
    if (!orderCode || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await updateOrderStatus(orderCode, status);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Update order status error:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
