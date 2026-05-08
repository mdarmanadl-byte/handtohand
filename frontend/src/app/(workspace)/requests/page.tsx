"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PackageSearch } from "lucide-react";
import { campusPlaces } from "@/constants/places";
import { useAcceptRequestMutation, useRequests } from "@/hooks/use-requests";
import { useUsers } from "@/hooks/use-users";
import type { RequestItem } from "@/types";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { PageHeader } from "@/components/common/page-header";
import { RequestCard } from "@/components/requests/request-card";
import { RequestModal } from "@/components/requests/request-modal";

export default function RequestsPage() {
  const requestsQuery = useRequests();
  const usersQuery = useUsers();
  const acceptMutation = useAcceptRequestMutation();
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);

  const requests = useMemo(() => {
    return (requestsQuery.data ?? []).sort((left, right) => {
      if (left.isUrgent !== right.isUrgent) {
        return Number(right.isUrgent) - Number(left.isUrgent);
      }

      return right.rewardCoins - left.rewardCoins;
    });
  }, [requestsQuery.data]);

  const users = usersQuery.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Requests"
        title="Browse campus help requests"
        description="Consumables and borrowables live in one feed, prioritized by urgency, rewards, and realtime activity."
        actions={
          <Button asChild>
            <Link href="/requests/create">Post request</Link>
          </Button>
        }
      />

      {requestsQuery.isLoading ? <LoadingSpinner label="Loading requests..." /> : null}

      {requests.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="No requests in the queue"
          description="When students post errands or borrowable needs, they’ll appear here with hostel, urgency, and reward info."
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              requester={users.find((user) => user.id === request.requesterId)}
              place={campusPlaces.find((place) => place.id === request.placeId)}
              onAccept={() => acceptMutation.mutate(request.id)}
              accepting={acceptMutation.isPending}
              onOpen={() => setSelectedRequest(request)}
            />
          ))}
        </div>
      )}

      <RequestModal
        open={Boolean(selectedRequest)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRequest(null);
          }
        }}
        request={selectedRequest}
        requester={users.find((user) => user.id === selectedRequest?.requesterId)}
        place={campusPlaces.find((place) => place.id === selectedRequest?.placeId)}
      />
    </div>
  );
}
