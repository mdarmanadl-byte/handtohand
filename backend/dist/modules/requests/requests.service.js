"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRequests = listRequests;
exports.findRequest = findRequest;
exports.createRequest = createRequest;
exports.acceptRequest = acceptRequest;
exports.updateRequestStatus = updateRequestStatus;
const prisma_1 = require("../../prisma");
const requestExpiry_queue_1 = require("../../queues/requestExpiry.queue");
const request_socket_1 = require("../../sockets/request.socket");
const app_error_1 = require("../../utils/app-error");
const coins_service_1 = require("../coins/coins.service");
const notifications_service_1 = require("../notifications/notifications.service");
const requestFlow = [
    "OPEN",
    "MATCHED",
    "ACCEPTED",
    "PICKED_UP",
    "IN_TRANSIT",
    "DELIVERED",
    "COMPLETED",
];
function getRequestOrThrow(requestId) {
    const request = prisma_1.db.requests.find((entry) => entry.id === requestId);
    if (!request) {
        throw new app_error_1.AppError(404, "Request not found.");
    }
    return request;
}
function listRequests() {
    return prisma_1.db.requests;
}
function findRequest(requestId) {
    return getRequestOrThrow(requestId);
}
async function createRequest(requesterId, payload) {
    const place = prisma_1.db.places.find((entry) => entry.id === payload.placeId);
    if (!place) {
        throw new app_error_1.AppError(404, "Place not found.");
    }
    (0, coins_service_1.holdEscrow)(requesterId, payload.rewardCoins + payload.depositCoins, "request:create", `Escrow held for ${payload.title}`);
    const timestamp = new Date().toISOString();
    const request = {
        id: (0, prisma_1.makeId)("request"),
        requesterId,
        helperId: null,
        tripId: null,
        title: payload.title,
        description: payload.description,
        itemName: payload.itemName,
        type: payload.type,
        placeId: payload.placeId,
        status: "OPEN",
        rewardCoins: payload.rewardCoins,
        depositCoins: payload.depositCoins,
        isUrgent: payload.isUrgent,
        expiresAt: new Date(Date.now() + payload.expiresInMinutes * 60 * 1000).toISOString(),
        createdAt: timestamp,
        updatedAt: timestamp,
    };
    prisma_1.db.requests.unshift(request);
    await (0, requestExpiry_queue_1.enqueueRequestExpiry)({ requestId: request.id, expiresAt: request.expiresAt });
    (0, request_socket_1.emitRequestUpdated)(request);
    return request;
}
async function acceptRequest(requestId, helperId) {
    const request = getRequestOrThrow(requestId);
    if (request.helperId) {
        throw new app_error_1.AppError(409, "Request already accepted.");
    }
    request.helperId = helperId;
    request.status = "ACCEPTED";
    request.updatedAt = new Date().toISOString();
    await (0, notifications_service_1.createNotification)({
        userId: request.requesterId,
        title: "Request accepted",
        body: `${request.itemName} is being picked up by a helper.`,
        type: "REQUEST_MATCH",
        priority: request.isUrgent ? "URGENT" : "HIGH",
    });
    (0, request_socket_1.emitRequestUpdated)(request);
    return request;
}
async function updateRequestStatus(requestId, status) {
    const request = getRequestOrThrow(requestId);
    if (status === "CANCELLED") {
        request.status = "CANCELLED";
        request.updatedAt = new Date().toISOString();
        (0, coins_service_1.refundEscrow)(request.requesterId, request.rewardCoins + request.depositCoins, request.id, "Cancelled request refund");
        (0, request_socket_1.emitRequestUpdated)(request);
        return request;
    }
    const currentIndex = requestFlow.indexOf(request.status);
    const nextIndex = requestFlow.indexOf(status);
    if (nextIndex !== currentIndex + 1) {
        throw new app_error_1.AppError(400, `Invalid request status transition to ${status}.`);
    }
    request.status = status;
    request.updatedAt = new Date().toISOString();
    if (status === "COMPLETED" && request.helperId) {
        (0, coins_service_1.releaseEscrow)(request.helperId, request.rewardCoins, request.id, "Request reward released to helper");
    }
    (0, request_socket_1.emitRequestUpdated)(request);
    return request;
}
