import { Router } from "express";
import { db } from "../../prisma";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "HandToHand backend healthy",
    data: {
      timestamp: new Date().toISOString(),
      counts: {
        users: db.users.length,
        requests: db.requests.length,
        trips: db.trips.length,
        items: db.items.length,
        notifications: db.notifications.length,
      },
    },
  });
});
