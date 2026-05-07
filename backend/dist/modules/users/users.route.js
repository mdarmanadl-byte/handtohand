"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const async_handler_1 = require("../../utils/async-handler");
const users_controller_1 = require("./users.controller");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get("/", (0, async_handler_1.asyncHandler)(users_controller_1.getUsers));
exports.usersRouter.get("/:userId", (0, async_handler_1.asyncHandler)(users_controller_1.getUser));
