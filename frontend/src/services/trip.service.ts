import type { ApiEnvelope, Trip } from "@/types";
import { api } from "./api";

export async function fetchTrips() {
  const response = await api.get<ApiEnvelope<Trip[]>>("/trips");
  return response.data.data;
}

export async function createTrip(payload: {
  title: string;
  startPlaceId: string;
  destinationLabel: string;
  departureInMinutes: number;
  availableSlots: number;
  geofenceTag: string;
  notes: string;
}) {
  const response = await api.post<ApiEnvelope<Trip>>("/trips", payload);
  return response.data.data;
}

export async function attachRequestToTrip(tripId: string, requestId: string) {
  const response = await api.post<ApiEnvelope<{ trip: Trip }>>(
    `/trips/${tripId}/attach-request`,
    { requestId },
  );
  return response.data.data;
}
