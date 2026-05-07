"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const socket_1 = require("./config/socket");
const sockets_1 = require("./sockets");
const logger_1 = require("./utils/logger");
const httpServer = (0, http_1.createServer)(app_1.default);
const io = (0, socket_1.initSocketServer)(httpServer);
(0, sockets_1.bootstrapSocketModules)(io);
httpServer.listen(env_1.env.PORT, () => {
    logger_1.logger.info(`HandToHand backend listening on port ${env_1.env.PORT}`);
});
