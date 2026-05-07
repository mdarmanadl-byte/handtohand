import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { login, me, register } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.schema";

export const authRouter = Router();

authRouter.post("/register", validate({ body: registerSchema }), asyncHandler(register));
authRouter.post("/login", validate({ body: loginSchema }), asyncHandler(login));
authRouter.get("/me", requireAuth, asyncHandler(me));
