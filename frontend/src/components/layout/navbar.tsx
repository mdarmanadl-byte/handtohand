"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Plus } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { CoinBadge } from "@/components/common/coin-badge";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const notifications = useNotifications();

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-border bg-white/5 p-2 lg:hidden">
            <Menu className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              {pathname.replace("/", "") || "dashboard"}
            </p>
            <h1 className="text-lg font-semibold">Campus utility network</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? <CoinBadge value={user.coins} className="hidden sm:flex" /> : null}
          {token ? (
            <Button variant="outline" size="sm" asChild>
              <Link href="/requests/create">
                <Plus className="h-4 w-4" />
                New request
              </Link>
            </Button>
          ) : null}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
            <span className="sr-only">
              {notifications.data?.length ?? 0} unread notifications
            </span>
          </Button>
          {token && user ? (
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Sign out</span>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
