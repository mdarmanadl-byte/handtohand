"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geofenceSchema = void 0;
const zod_1 = require("zod");
exports.geofenceSchema = zod_1.z.object({
    placeId: zod_1.z.string().min(1),
});
