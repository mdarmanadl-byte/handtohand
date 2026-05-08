"use client";

import { RouteOff } from "lucide-react";
import { campusPlaces } from "@/constants/places";
import { useRequests } from "@/hooks/use-requests";
import { useTrips } from "@/hooks/use-trips";
import { useUsers } from "@/hooks/use-users";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { CreateTripForm } from "@/components/trips/create-trip-form";
import { TripCard } from "@/components/trips/trip-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TripsPage() {
  const tripsQuery = useTrips();
  const requestsQuery = useRequests();
  const usersQuery = useUsers();

  const trips = tripsQuery.data ?? [];
  const requests = requestsQuery.data ?? [];
  const users = usersQuery.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Trips"
        title="Broadcast hostel-bound movement"
        description="Trips are the batching layer. Students announce movement, attach open requests, and finish more work in one route."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {trips.length === 0 ? (
            <EmptyState
              icon={RouteOff}
              title="No trips broadcast yet"
              description="Create the first active route and open up nearby batching for the request feed."
            />
          ) : (
            trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                helper={users.find((user) => user.id === trip.helperId)}
                sourcePlace={campusPlaces.find((place) => place.id === trip.startPlaceId)}
                attachedRequests={requests.filter((request) => request.tripId === trip.id)}
              />
            ))
          )}
        </div>

        <Card className="rounded-[2rem]">
          <CardHeader>
            <CardTitle>Create a trip broadcast</CardTitle>
            <CardDescription>
              Announce where you are headed, how many slots you can carry, and the routing tag for matching.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateTripForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
