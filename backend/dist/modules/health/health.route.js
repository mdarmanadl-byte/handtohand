"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../../prisma");
exports.healthRouter = (0, express_1.Router)();
exports.healthRouter.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "HandToHand backend healthy",
        data: {
            timestamp: new Date().toISOString(),
            counts: {
                users: prisma_1.db.users.length,
                requests: prisma_1.db.requests.length,
                trips: prisma_1.db.trips.length,
                items: prisma_1.db.items.length,
                notifications: prisma_1.db.notifications.length,
            },
        },
    });
});
