"use client";

import { Clock3, MapPinned, UserRound } from "lucide-react";
import type { AuthUser, Place, RequestItem, Trip } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatRelativeDeparture } from "@/utils/format";

export function TripCard({
  trip,
  helper,
  sourcePlace,
  attachedRequests,
  onAttachRequest,
}: {
  trip: Trip;
  helper?: AuthUser;
  sourcePlace?: Place;
  attachedRequests: RequestItem[];
  onAttachRequest?: () => void;
}) {
  return (
    <Card className="rounded-[1.75rem]">
      <CardContent className="space-y-5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold">{trip.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {trip.notes}
            </p>
          </div>
          <div className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-primary">
            {trip.status}
          </div>
        </div>

        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />
            <span>{helper?.name ?? trip.helperId}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinned className="h-4 w-4 text-primary" />
            <span>{sourcePlace?.name ?? trip.startPlaceId} → {trip.destinationLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-primary" />
            <span>{formatRelativeDeparture(trip.departureTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
              {trip.availableSlots - trip.occupiedSlots}
            </span>
            <span>
              {trip.availableSlots - trip.occupiedSlots} slots left · {attachedRequests.length} attached requests
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onAttachRequest}>
            Attach request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
