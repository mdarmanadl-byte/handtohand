"use client";

import { ShieldCheck, Star, Trophy, Wallet } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/common/page-header";
import { CoinBadge } from "@/components/common/coin-badge";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  const profileStats = [
    {
      label: "Successful deliveries",
      value: user.successfulDeliveries,
      icon: Trophy,
    },
    {
      label: "Successful returns",
      value: user.successfulReturns,
      icon: ShieldCheck,
    },
    {
      label: "Reputation score",
      value: user.reputationScore,
      icon: Star,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Profile"
        title={user.name}
        description={`${user.hostelName} · ${user.wing} · ${user.email}`}
        actions={<CoinBadge value={user.coins} />}
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Trust profile</CardTitle>
            <CardDescription>
              Ratings, completion history, and cancellation behavior determine campus trust.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileStats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-border bg-white/4 px-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-primary/12 p-2 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="text-lg font-semibold">{item.value}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Coins and reputation</CardTitle>
            <CardDescription>
              Coins track utility exchange. Reputation tracks how reliably you close the loop.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(121,168,255,0.16),rgba(15,23,40,0.98))] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-muted-foreground">
                    Wallet balance
                  </p>
                  <p className="mt-3 text-3xl font-semibold">{user.coins}</p>
                </div>
                <div className="rounded-2xl bg-accent/15 p-3 text-accent">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-white/4 p-4">
                <p className="text-sm text-muted-foreground">Campus rating</p>
                <p className="mt-2 text-2xl font-semibold">{user.rating.toFixed(1)}</p>
              </div>
              <div className="rounded-2xl border border-border bg-white/4 p-4">
                <p className="text-sm text-muted-foreground">Cancellation count</p>
                <p className="mt-2 text-2xl font-semibold">{user.cancellations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
