"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestStatusSchema = exports.createRequestSchema = void 0;
const zod_1 = require("zod");
exports.createRequestSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(3),
    itemName: zod_1.z.string().min(2),
    type: zod_1.z.enum(["CONSUMABLE", "BORROWABLE"]),
    placeId: zod_1.z.string().min(1),
    rewardCoins: zod_1.z.coerce.number().int().positive(),
    depositCoins: zod_1.z.coerce.number().int().min(0).default(0),
    isUrgent: zod_1.z.coerce.boolean().default(false),
    expiresInMinutes: zod_1.z.coerce.number().int().min(10).max(480).default(120),
});
exports.updateRequestStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "OPEN",
        "MATCHED",
        "ACCEPTED",
        "PICKED_UP",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "EXPIRED",
        "CANCELLED",
    ]),
});
