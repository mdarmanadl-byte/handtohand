import { db, makeId } from "../../prisma";
import { emitTripUpdated } from "../../sockets/trip.socket";
import { AppError } from "../../utils/app-error";
import { createNotification } from "../notifications/notifications.service";

function getTripOrThrow(tripId: string) {
  const trip = db.trips.find((entry) => entry.id === tripId);

  if (!trip) {
    throw new AppError(404, "Trip not found.");
  }

  return trip;
}

export function listTrips() {
  return db.trips;
}

export function findTrip(tripId: string) {
  return getTripOrThrow(tripId);
}

export async function createTrip(
  helperId: string,
  payload: {
    title: string;
    startPlaceId: string;
    destinationLabel: string;
    departureInMinutes: number;
    availableSlots: number;
    geofenceTag: string;
    notes: string;
  },
) {
  const timestamp = new Date().toISOString();
  const trip = {
    id: makeId("trip"),
    helperId,
    title: payload.title,
    startPlaceId: payload.startPlaceId,
    destinationLabel: payload.destinationLabel,
    departureTime: new Date(
      Date.now() + payload.departureInMinutes * 60 * 1000,
    ).toISOString(),
    availableSlots: payload.availableSlots,
    occupiedSlots: 0,
    status: "ANNOUNCED" as const,
    geofenceTag: payload.geofenceTag,
    notes: payload.notes,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  db.trips.unshift(trip);
  emitTripUpdated(trip);
  return trip;
}

export async function attachRequestToTrip(tripId: string, requestId: string) {
  const trip = getTripOrThrow(tripId);
  const request = db.requests.find((entry) => entry.id === requestId);

  if (!request) {
    throw new AppError(404, "Request not found.");
  }

  if (trip.occupiedSlots >= trip.availableSlots) {
    throw new AppError(409, "Trip is already full.");
  }

  request.tripId = trip.id;
  request.status = "MATCHED";
  request.updatedAt = new Date().toISOString();

  trip.occupiedSlots += 1;
  trip.status = trip.occupiedSlots >= trip.availableSlots ? "FULL" : "MATCHING";
  trip.updatedAt = new Date().toISOString();

  await createNotification({
    userId: request.requesterId,
    title: "Trip match found",
    body: `${request.title} has been attached to ${trip.title}.`,
    type: "TRIP_BROADCAST",
    priority: request.isUrgent ? "HIGH" : "MEDIUM",
  });

  emitTripUpdated(trip);
  return { trip, request };
}
