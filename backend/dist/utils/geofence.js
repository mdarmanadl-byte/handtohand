"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceInMeters = distanceInMeters;
exports.isInsideGeofence = isInsideGeofence;
exports.rankMatchingRequests = rankMatchingRequests;
exports.rankTrips = rankTrips;
function toRadians(value) {
    return (value * Math.PI) / 180;
}
function distanceInMeters(startLat, startLng, endLat, endLng) {
    const earthRadius = 6371000;
    const dLat = toRadians(endLat - startLat);
    const dLng = toRadians(endLng - startLng);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(startLat)) *
            Math.cos(toRadians(endLat)) *
            Math.sin(dLng / 2) ** 2;
    return 2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function isInsideGeofence(latitude, longitude, place) {
    return (distanceInMeters(latitude, longitude, place.latitude, place.longitude) <=
        place.radiusMeters);
}
function rankMatchingRequests(requests) {
    return [...requests].sort((left, right) => {
        if (left.isUrgent !== right.isUrgent) {
            return Number(right.isUrgent) - Number(left.isUrgent);
        }
        return right.rewardCoins - left.rewardCoins;
    });
}
function rankTrips(trips) {
    return [...trips].sort((left, right) => {
        if (left.status !== right.status) {
            return left.status.localeCompare(right.status);
        }
        return new Date(left.departureTime).getTime() - new Date(right.departureTime).getTime();
    });
}
