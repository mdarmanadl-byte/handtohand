"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geofenceEntry = geofenceEntry;
exports.recommendations = recommendations;
const app_error_1 = require("../../utils/app-error");
const api_response_1 = require("../../utils/api-response");
const matching_service_1 = require("./matching.service");
async function geofenceEntry(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, await (0, matching_service_1.processGeofenceEntry)(req.user.id, req.body.placeId), "Geofence event processed.");
}
async function recommendations(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, (0, matching_service_1.getRecommendations)(req.user.id), "Recommendations fetched.");
}
