"use client";

import { useRouter } from 'next/navigation';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

export function AdminHeader({ username }: { username: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("[v0] Logout failed:", error);
    }
  };

  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="font-semibold text-lg">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Welcome, <span className="font-medium text-foreground">{username}</span>
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
