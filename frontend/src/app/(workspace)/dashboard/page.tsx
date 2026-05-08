"use client";

import Link from "next/link";
import { BellDot, Flame, Route, WalletCards } from "lucide-react";
import { campusPlaces } from "@/constants/places";
import { useNotifications } from "@/hooks/use-notifications";
import { useRequests } from "@/hooks/use-requests";
import { useTrips } from "@/hooks/use-trips";
import { useUsers } from "@/hooks/use-users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { PageHeader } from "@/components/common/page-header";
import { RequestCard } from "@/components/requests/request-card";
import { TripCard } from "@/components/trips/trip-card";

export default function DashboardPage() {
  const requestsQuery = useRequests();
  const tripsQuery = useTrips();
  const usersQuery = useUsers();
  const notificationsQuery = useNotifications();

  const requests = requestsQuery.data ?? [];
  const trips = tripsQuery.data ?? [];
  const users = usersQuery.data ?? [];
  const urgentRequests = requests.filter((request) => request.isUrgent).slice(0, 2);
  const activeTrips = trips.slice(0, 2);

  const summary = [
    {
      label: "Open requests",
      value: requests.filter((request) => request.status === "OPEN").length,
      icon: Flame,
    },
    {
      label: "Active trips",
      value: trips.filter((trip) => ["ANNOUNCED", "MATCHING", "FULL"].includes(trip.status)).length,
      icon: Route,
    },
    {
      label: "Notifications",
      value: notificationsQuery.data?.length ?? 0,
      icon: BellDot,
    },
    {
      label: "Escrow actions",
      value: requests.filter((request) => request.depositCoins > 0).length,
      icon: WalletCards,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Live Campus Feed"
        title="Utility-first campus logistics"
        description="Track urgent requests, active hostel trips, and the live matching layer without falling into a bloated dashboard."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link href="/trips">View trips</Link>
            </Button>
            <Button asChild>
              <Link href="/requests/create">Create request</Link>
            </Button>
          </>
        }
      />

      {requestsQuery.isLoading || tripsQuery.isLoading || usersQuery.isLoading ? (
        <LoadingSpinner label="Loading campus activity..." />
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="rounded-[1.75rem]">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{item.value}</p>
                </div>
                <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Urgent requests</CardTitle>
            <CardDescription>
              High-priority tasks surface first and pay stronger coin rewards.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {urgentRequests.length === 0 ? (
              <p className="text-sm text-muted-foreground">No urgent requests right now.</p>
            ) : (
              urgentRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  requester={users.find((user) => user.id === request.requesterId)}
                  place={campusPlaces.find((place) => place.id === request.placeId)}
                />
              ))
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Trip broadcast feed</CardTitle>
            <CardDescription>
              Students already moving across campus can batch requests into the same route.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {activeTrips.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active trips yet.</p>
            ) : (
              activeTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  helper={users.find((user) => user.id === trip.helperId)}
                  sourcePlace={campusPlaces.find((place) => place.id === trip.startPlaceId)}
                  attachedRequests={requests.filter((request) => request.tripId === trip.id)}
                />
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
