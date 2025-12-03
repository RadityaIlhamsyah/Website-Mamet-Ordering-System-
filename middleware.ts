import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySession } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Check if user is trying to access admin routes
  if (pathname.startsWith("/admin")) {
    const session = await verifySession()

    // 2. If user is on the login page and ALREADY has a session, redirect to dashboard
    if (pathname === "/admin/login" && session) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    // 3. If user is accessing protected admin pages (NOT login) and has NO session, redirect to login
    if (pathname !== "/admin/login" && !session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
