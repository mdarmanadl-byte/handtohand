"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const error_middleware_1 = require("./middleware/error.middleware");
const modules_1 = require("./modules");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: env_1.env.APP_BASE_URL,
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "HandToHand backend is running.",
        docsHint: "Use /api/health or /api/* module routes.",
    });
});
app.use("/api", modules_1.apiRouter);
app.use(error_middleware_1.notFoundMiddleware);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
