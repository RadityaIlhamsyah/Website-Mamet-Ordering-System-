import { NextResponse } from "next/server"
import { getOrderByCode } from "@/lib/db-utils"

export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await params
    const order = await getOrderByCode(code)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("[v0] Get order error:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}
