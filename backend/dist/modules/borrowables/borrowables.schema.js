"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowItemSchema = exports.createItemSchema = void 0;
const zod_1 = require("zod");
exports.createItemSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string().min(3),
    category: zod_1.z.string().min(2),
    securityDepositCoins: zod_1.z.coerce.number().int().min(0),
    dailyRateCoins: zod_1.z.coerce.number().int().min(0),
});
exports.borrowItemSchema = zod_1.z.object({
    returnInDays: zod_1.z.coerce.number().int().min(1).max(14),
});
