"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { attachRequestToTrip, createTrip, fetchTrips } from "@/services/trip.service";

export function useTrips() {
  return useQuery({
    queryKey: ["trips"],
    queryFn: fetchTrips,
  });
}

export function useCreateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
}

export function useAttachRequestToTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, requestId }: { tripId: string; requestId: string }) =>
      attachRequestToTrip(tripId, requestId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["trips"] });
      void queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}
