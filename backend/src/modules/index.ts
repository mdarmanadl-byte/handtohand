import { Router } from "express";
import { authRouter } from "./auth/auth.route";
import { borrowablesRouter } from "./borrowables/borrowables.route";
import { coinsRouter } from "./coins/coins.route";
import { healthRouter } from "./health/health.route";
import { matchingRouter } from "./matching/matching.route";
import { notificationsRouter } from "./notifications/notifications.route";
import { ratingsRouter } from "./ratings/ratings.route";
import { requestsRouter } from "./requests/requests.route";
import { tripsRouter } from "./trips/trips.route";
import { usersRouter } from "./users/users.route";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/requests", requestsRouter);
apiRouter.use("/trips", tripsRouter);
apiRouter.use("/borrowables", borrowablesRouter);
apiRouter.use("/notifications", notificationsRouter);
apiRouter.use("/matching", matchingRouter);
apiRouter.use("/coins", coinsRouter);
apiRouter.use("/ratings", ratingsRouter);
