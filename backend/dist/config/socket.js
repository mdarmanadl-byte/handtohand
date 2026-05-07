"use strict";
// Socket configuration and helpers
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSocket = configureSocket;
exports.initSocketServer = initSocketServer;
exports.getSocketServer = getSocketServer;
function configureSocket() {
    // TODO: configure socket.io or similar
}
const socket_io_1 = require("socket.io");
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
let io = null;
function initSocketServer(server) {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: env_1.env.APP_BASE_URL,
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        logger_1.logger.info(`Socket connected: ${socket.id}`);
    });
    return io;
}
function getSocketServer() {
    return io;
}
