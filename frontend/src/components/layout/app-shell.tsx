"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRealtimeChannels } from "@/hooks/use-realtime";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { useAuthStore } from "@/store/auth-store";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useRealtimeChannels();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!token) {
      if (user) {
        clearAuth();
      }

      const redirectTarget = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${redirectTarget}`);
    }
  }, [clearAuth, hydrated, pathname, router, token, user]);

  if (!hydrated || !token || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner label="Checking session..." />
      </div>
    );
  }

  return (
    <div className="app-shell-grid min-h-screen">
      <Sidebar />
      <div className="min-w-0">
        <Navbar />
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
