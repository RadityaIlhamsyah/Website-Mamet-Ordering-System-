import { NextResponse } from "next/server"
import { getMenuItems, seedMenuItems } from "@/lib/db-utils"
import { MENU_ITEMS } from "@/lib/data"

export async function GET() {
  try {
    // Ensure menu items are seeded
    await seedMenuItems()

    const items = await getMenuItems()
    return NextResponse.json(items)
  } catch (error) {
    console.error("[v0] Get menu error:", error)
    return NextResponse.json(MENU_ITEMS)
  }
}
