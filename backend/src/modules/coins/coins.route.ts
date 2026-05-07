import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { transfer, wallet } from "./coins.controller";
import { transferCoinsSchema } from "./coins.schema";

export const coinsRouter = Router();

coinsRouter.use(requireAuth);
coinsRouter.get("/wallet", asyncHandler(wallet));
coinsRouter.post("/transfer", validate({ body: transferCoinsSchema }), asyncHandler(transfer));
