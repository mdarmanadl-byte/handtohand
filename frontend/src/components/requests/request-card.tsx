"use client";

import { MapPin, Package, ShieldCheck, UserRound } from "lucide-react";
import type { AuthUser, Place, RequestItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CoinBadge } from "@/components/common/coin-badge";
import { UrgentBadge } from "./urgent-badge";
import { formatTimestamp } from "@/utils/format";

export function RequestCard({
  request,
  requester,
  place,
  onAccept,
  onOpen,
  accepting = false,
}: {
  request: RequestItem;
  requester?: AuthUser;
  place?: Place;
  onAccept?: () => void;
  onOpen?: () => void;
  accepting?: boolean;
}) {
  return (
    <Card className="rounded-[1.75rem]">
      <CardContent className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-semibold">{request.title}</p>
              {request.isUrgent ? <UrgentBadge /> : null}
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {request.description}
            </p>
          </div>
          <CoinBadge value={request.rewardCoins} />
        </div>

        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{place?.name ?? request.placeId}</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <span>{request.type === "CONSUMABLE" ? "Consumable" : "Borrowable"}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />
            <span>{requester ? `${requester.hostelName} · ${requester.wing}` : "Hostel data loading"}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>{request.status}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Expires {formatTimestamp(request.expiresAt)}
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onOpen}>
              View
            </Button>
            <Button
              variant={request.isUrgent ? "urgent" : "default"}
              size="sm"
              disabled={accepting || request.status !== "OPEN"}
              onClick={onAccept}
            >
              {accepting ? "Accepting..." : "Accept"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
