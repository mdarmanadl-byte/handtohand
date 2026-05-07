import { db } from "../../prisma";
import { rankMatchingRequests, rankTrips } from "../../utils/geofence";
import { createNotification } from "../notifications/notifications.service";

export async function processGeofenceEntry(userId: string, placeId: string) {
  const requests = rankMatchingRequests(
    db.requests.filter(
      (request) =>
        request.placeId === placeId &&
        request.status === "OPEN" &&
        request.requesterId !== userId,
    ),
  );

  if (requests.length > 0) {
    await createNotification({
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

export function getRecommendations(userId: string) {
  return {
    requests: rankMatchingRequests(
      db.requests.filter(
        (request) => request.requesterId !== userId && ["OPEN", "MATCHED"].includes(request.status),
      ),
    ).slice(0, 10),
    trips: rankTrips(db.trips).slice(0, 10),
  };
}
