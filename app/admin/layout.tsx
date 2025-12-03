import type React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { verifySession } from "@/lib/auth"
import { AdminHeader } from "@/components/admin-header"

export const metadata: Metadata = {
  title: "Admin Dashboard | Warkop Digital",
  description: "Manage orders and menu items",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()

  // If no session, we render the children (Login Page) without the sidebar layout
  // This allows the login page to be full screen and clean
  if (!session) {
    return <main className="min-h-screen bg-background">{children}</main>
  }

  // If session exists, we render the full Admin Dashboard layout
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1 h-screen overflow-hidden">
        <AdminHeader username={session.username} />
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/10">{children}</div>
      </main>
    </SidebarProvider>
  )
}
