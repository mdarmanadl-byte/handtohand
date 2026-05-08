"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { primaryNavigation } from "@/constants/navigation";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils/cn";
import { CoinBadge } from "@/components/common/coin-badge";

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="hidden min-h-screen border-r border-border bg-black/10 px-4 py-5 lg:block">
      <div className="glass-card sticky top-5 flex h-[calc(100vh-2.5rem)] flex-col rounded-[2rem] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white/4 px-3 py-3">
          <div className="rounded-2xl bg-primary/15 p-2 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">HandToHand</p>
            <p className="text-xs text-muted-foreground">IIT Delhi utility network</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-white/4 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Wallet
          </p>
          <CoinBadge value={user?.coins ?? 144} className="mt-3 w-fit" />
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Earn coins by helping with deliveries, borrowables, and urgent tasks.
          </p>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-2 ">
          {primaryNavigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition",
                  active
                    ? "bg-primary/14 text-white shadow-[0_12px_32px_rgba(121,168,255,0.15)]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* <div className="rounded-2xl border border-border bg-white/4 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-accent/15 p-2 text-accent">
              <LifeBuoy className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Realtime matching ready</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Requests and trip broadcasts sync through Socket.IO when the backend is running.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </aside>
  );
}
