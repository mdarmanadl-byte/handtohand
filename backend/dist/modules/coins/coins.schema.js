"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferCoinsSchema = void 0;
const zod_1 = require("zod");
exports.transferCoinsSchema = zod_1.z.object({
    toUserId: zod_1.z.string().min(1),
    amount: zod_1.z.coerce.number().int().positive(),
    description: zod_1.z.string().min(3),
});
