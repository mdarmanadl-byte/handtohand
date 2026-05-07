"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = listUsers;
exports.getUserProfile = getUserProfile;
const prisma_1 = require("../../prisma");
const app_error_1 = require("../../utils/app-error");
function listUsers() {
    return prisma_1.db.users.map(({ passwordHash, ...user }) => user);
}
function getUserProfile(userId) {
    const user = prisma_1.db.users.find((entry) => entry.id === userId);
    if (!user) {
        throw new app_error_1.AppError(404, "User not found.");
    }
    const { passwordHash, ...profile } = user;
    return profile;
}
