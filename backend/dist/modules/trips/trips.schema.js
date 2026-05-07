"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachTripRequestSchema = exports.createTripSchema = void 0;
const zod_1 = require("zod");
exports.createTripSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    startPlaceId: zod_1.z.string().min(1),
    destinationLabel: zod_1.z.string().min(2),
    departureInMinutes: zod_1.z.coerce.number().int().min(5).max(360),
    availableSlots: zod_1.z.coerce.number().int().min(1).max(10),
    geofenceTag: zod_1.z.string().min(2),
    notes: zod_1.z.string().min(2),
});
exports.attachTripRequestSchema = zod_1.z.object({
    requestId: zod_1.z.string().min(1),
});
