"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGeofenceEntry = processGeofenceEntry;
exports.getRecommendations = getRecommendations;
const prisma_1 = require("../../prisma");
const geofence_1 = require("../../utils/geofence");
const notifications_service_1 = require("../notifications/notifications.service");
async function processGeofenceEntry(userId, placeId) {
    const requests = (0, geofence_1.rankMatchingRequests)(prisma_1.db.requests.filter((request) => request.placeId === placeId &&
        request.status === "OPEN" &&
        request.requesterId !== userId));
    if (requests.length > 0) {
        await (0, notifications_service_1.createNotification)({
            userId,
            title: "Nearby requests available",
            body: `You entered a hotspot with ${requests.length} request(s) waiting.`,
            type: "GEOFENCE",
            priority: requests.some((entry) => entry.isUrgent) ? "URGENT" : "HIGH",
            cooldownKey: `${userId}:${placeId}`,
        });
    }
    return requests;
}
function getRecommendations(userId) {
    return {
        requests: (0, geofence_1.rankMatchingRequests)(prisma_1.db.requests.filter((request) => request.requesterId !== userId && ["OPEN", "MATCHED"].includes(request.status))).slice(0, 10),
        trips: (0, geofence_1.rankTrips)(prisma_1.db.trips).slice(0, 10),
    };
}
