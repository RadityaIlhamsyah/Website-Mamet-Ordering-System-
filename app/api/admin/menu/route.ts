import { NextResponse } from "next/server"
import { updateMenuItemAvailability, createMenuItem, updateMenuItem, deleteMenuItem } from "@/lib/db-utils"
import { verifySession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const itemData = await request.json()

    if (!itemData.name || !itemData.price || !itemData.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate unique ID
    const id = `item-${Date.now()}`
    await createMenuItem({
      id,
      name: itemData.name,
      description: itemData.description || "",
      price: itemData.price,
      category: itemData.category,
      image: itemData.image || "/placeholder.svg",
      available: itemData.available ?? true,
    })

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error("[v0] Create menu item error:", error)
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 })
    }

    // If only toggling availability
    if (body.hasOwnProperty("available") && Object.keys(body).length === 2) {
      await updateMenuItemAvailability(id, body.available)
    } else {
      // Full update
      const updateData: any = {}
      if (body.name) updateData.name = body.name
      if (body.description !== undefined) updateData.description = body.description
      if (body.price) updateData.price = body.price
      if (body.category) updateData.category = body.category
      if (body.image) updateData.image = body.image
      if (body.hasOwnProperty("available")) updateData.available = body.available

      await updateMenuItem(id, updateData)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Update menu item error:", error)
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await verifySession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing item ID" }, { status: 400 })
    }

    await deleteMenuItem(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Delete menu item error:", error)
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
  }
}
