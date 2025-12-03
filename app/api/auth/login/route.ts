import { type NextRequest, NextResponse } from "next/server"
import { createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Hardcoded credentials for stability
    // In a real app, you would check against a database
    const ADMIN_USERNAME = "admin"
    const ADMIN_PASSWORD = "admin123"

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create the session cookie
    await createSession(username, "admin@warkop.com")

    return NextResponse.json({
      success: true,
      user: {
        username: username,
        email: "admin@warkop.com",
      },
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
