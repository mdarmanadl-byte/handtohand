"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email().refine((value) => value.endsWith("@iitd.ac.in"), {
        message: "Only @iitd.ac.in email addresses are allowed.",
    }),
    password: zod_1.z.string().min(6),
    hostelName: zod_1.z.string().min(2),
    wing: zod_1.z.string().min(1),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
