"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTrips = listTrips;
exports.findTrip = findTrip;
exports.createTrip = createTrip;
exports.attachRequestToTrip = attachRequestToTrip;
const prisma_1 = require("../../prisma");
const trip_socket_1 = require("../../sockets/trip.socket");
const app_error_1 = require("../../utils/app-error");
const notifications_service_1 = require("../notifications/notifications.service");
function getTripOrThrow(tripId) {
    const trip = prisma_1.db.trips.find((entry) => entry.id === tripId);
    if (!trip) {
        throw new app_error_1.AppError(404, "Trip not found.");
    }
    return trip;
}
function listTrips() {
    return prisma_1.db.trips;
}
function findTrip(tripId) {
    return getTripOrThrow(tripId);
}
async function createTrip(helperId, payload) {
    const timestamp = new Date().toISOString();
    const trip = {
        id: (0, prisma_1.makeId)("trip"),
        helperId,
        title: payload.title,
        startPlaceId: payload.startPlaceId,
        destinationLabel: payload.destinationLabel,
        departureTime: new Date(Date.now() + payload.departureInMinutes * 60 * 1000).toISOString(),
        availableSlots: payload.availableSlots,
        occupiedSlots: 0,
        status: "ANNOUNCED",
        geofenceTag: payload.geofenceTag,
        notes: payload.notes,
        createdAt: timestamp,
        updatedAt: timestamp,
    };
    prisma_1.db.trips.unshift(trip);
    (0, trip_socket_1.emitTripUpdated)(trip);
    return trip;
}
async function attachRequestToTrip(tripId, requestId) {
    const trip = getTripOrThrow(tripId);
    const request = prisma_1.db.requests.find((entry) => entry.id === requestId);
    if (!request) {
        throw new app_error_1.AppError(404, "Request not found.");
    }
    if (trip.occupiedSlots >= trip.availableSlots) {
        throw new app_error_1.AppError(409, "Trip is already full.");
    }
    request.tripId = trip.id;
    request.status = "MATCHED";
    request.updatedAt = new Date().toISOString();
    trip.occupiedSlots += 1;
    trip.status = trip.occupiedSlots >= trip.availableSlots ? "FULL" : "MATCHING";
    trip.updatedAt = new Date().toISOString();
    await (0, notifications_service_1.createNotification)({
        userId: request.requesterId,
        title: "Trip match found",
        body: `${request.title} has been attached to ${trip.title}.`,
        type: "TRIP_BROADCAST",
        priority: request.isUrgent ? "HIGH" : "MEDIUM",
    });
    (0, trip_socket_1.emitTripUpdated)(trip);
    return { trip, request };
}
