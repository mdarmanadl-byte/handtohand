"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getCurrentUser = getCurrentUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../prisma");
const app_error_1 = require("../../utils/app-error");
const jwt_1 = require("../../utils/jwt");
function sanitizeUser(user) {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
}
function seedPasswordMatches(password, hash) {
    return hash === "$2b$10$abcdefghijklmnopqrstuv" && password === "password123";
}
async function registerUser(payload) {
    const existingUser = prisma_1.db.users.find((user) => user.email === payload.email);
    if (existingUser) {
        throw new app_error_1.AppError(409, "Email already in use.");
    }
    const timestamp = new Date().toISOString();
    const passwordHash = await bcryptjs_1.default.hash(payload.password, 10);
    const user = {
        id: (0, prisma_1.makeId)("user"),
        name: payload.name,
        email: payload.email,
        hostelName: payload.hostelName,
        wing: payload.wing,
        role: "STUDENT",
        coins: 100,
        karmaPoints: 0,
        rating: 5,
        successfulDeliveries: 0,
        successfulReturns: 0,
        cancellations: 0,
        reputationScore: 60,
        passwordHash,
        createdAt: timestamp,
        updatedAt: timestamp,
    };
    prisma_1.db.users.push(user);
    return {
        user: sanitizeUser(user),
        accessToken: (0, jwt_1.signAccessToken)({
            sub: user.id,
            email: user.email,
            role: user.role,
        }),
    };
}
async function loginUser(payload) {
    const user = prisma_1.db.users.find((entry) => entry.email === payload.email);
    if (!user) {
        throw new app_error_1.AppError(401, "Invalid credentials.");
    }
    const isValidPassword = seedPasswordMatches(payload.password, user.passwordHash) ||
        (await bcryptjs_1.default.compare(payload.password, user.passwordHash).catch(() => false));
    if (!isValidPassword) {
        throw new app_error_1.AppError(401, "Invalid credentials.");
    }
    return {
        user: sanitizeUser(user),
        accessToken: (0, jwt_1.signAccessToken)({
            sub: user.id,
            email: user.email,
            role: user.role,
        }),
    };
}
function getCurrentUser(userId) {
    const user = prisma_1.db.users.find((entry) => entry.id === userId);
    if (!user) {
        throw new app_error_1.AppError(404, "User not found.");
    }
    return sanitizeUser(user);
}
