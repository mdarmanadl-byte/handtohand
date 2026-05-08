"use client";

import type { AuthUser, Place, RequestItem } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CoinBadge } from "@/components/common/coin-badge";
import { UrgentBadge } from "./urgent-badge";

export function RequestModal({
  open,
  onOpenChange,
  request,
  requester,
  place,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  request: RequestItem | null;
  requester?: AuthUser;
  place?: Place;
}) {
  if (!request) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{request.title}</DialogTitle>
            {request.isUrgent ? <UrgentBadge /> : null}
          </div>
          <DialogDescription>
            {request.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 rounded-2xl border border-border bg-white/4 p-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Reward</span>
            <CoinBadge value={request.rewardCoins} />
          </div>
          <div className="flex items-center justify-between">
            <span>Pickup place</span>
            <span>{place?.name ?? request.placeId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Type</span>
            <span>{request.type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Requester hostel</span>
            <span>{requester ? `${requester.hostelName} · ${requester.wing}` : "Unknown"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Status</span>
            <span>{request.status}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
