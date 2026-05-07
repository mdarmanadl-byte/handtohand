"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrips = getTrips;
exports.getTrip = getTrip;
exports.postTrip = postTrip;
exports.attach = attach;
const app_error_1 = require("../../utils/app-error");
const api_response_1 = require("../../utils/api-response");
const trips_service_1 = require("./trips.service");
async function getTrips(_req, res) {
    return (0, api_response_1.sendSuccess)(res, (0, trips_service_1.listTrips)(), "Trips fetched.");
}
async function getTrip(req, res) {
    return (0, api_response_1.sendSuccess)(res, (0, trips_service_1.findTrip)(String(req.params.tripId)), "Trip fetched.");
}
async function postTrip(req, res) {
    if (!req.user) {
        throw new app_error_1.AppError(401, "Authentication required.");
    }
    return (0, api_response_1.sendSuccess)(res, await (0, trips_service_1.createTrip)(req.user.id, req.body), "Trip created.", 201);
}
async function attach(req, res) {
    return (0, api_response_1.sendSuccess)(res, await (0, trips_service_1.attachRequestToTrip)(String(req.params.tripId), req.body.requestId), "Request attached to trip.");
}
