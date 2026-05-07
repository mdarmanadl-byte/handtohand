"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRatingSchema = void 0;
const zod_1 = require("zod");
exports.createRatingSchema = zod_1.z.object({
    toUserId: zod_1.z.string().min(1),
    score: zod_1.z.coerce.number().min(1).max(5),
    comment: zod_1.z.string().min(3),
    requestId: zod_1.z.string().optional(),
    borrowTransactionId: zod_1.z.string().optional(),
});
