import { NextResponse } from "next/server"
import { getOrdersByDateRange } from "@/lib/db-utils"
import { verifySession } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Missing startDate or endDate" }, { status: 400 })
    }

    const orders = await getOrdersByDateRange(new Date(startDate), new Date(endDate))
    return NextResponse.json(orders)
  } catch (error) {
    console.error("[v0] Get weekly report error:", error)
    return NextResponse.json({ error: "Failed to fetch weekly report" }, { status: 500 })
  }
}
