import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { getUser, getUsers } from "./users.controller";

export const usersRouter = Router();

usersRouter.get("/", asyncHandler(getUsers));
usersRouter.get("/:userId", asyncHandler(getUser));
