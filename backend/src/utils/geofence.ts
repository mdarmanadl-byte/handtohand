import type { Place, RequestEntity, Trip } from "../types/domain";

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function distanceInMeters(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
) {
  const earthRadius = 6371000;
  const dLat = toRadians(endLat - startLat);
  const dLng = toRadians(endLng - startLng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(startLat)) *
      Math.cos(toRadians(endLat)) *
      Math.sin(dLng / 2) ** 2;

  return 2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function isInsideGeofence(
  latitude: number,
  longitude: number,
  place: Place,
) {
  return (
    distanceInMeters(latitude, longitude, place.latitude, place.longitude) <=
    place.radiusMeters
  );
}

export function rankMatchingRequests(requests: RequestEntity[]) {
  return [...requests].sort((left, right) => {
    if (left.isUrgent !== right.isUrgent) {
      return Number(right.isUrgent) - Number(left.isUrgent);
    }

    return right.rewardCoins - left.rewardCoins;
  });
}

export function rankTrips(trips: Trip[]) {
  return [...trips].sort((left, right) => {
    if (left.status !== right.status) {
      return left.status.localeCompare(right.status);
    }

    return new Date(left.departureTime).getTime() - new Date(right.departureTime).getTime();
  });
}
