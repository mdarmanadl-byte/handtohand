"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRequestSocket = initRequestSocket;
exports.emitRequestUpdated = emitRequestUpdated;
const socket_1 = require("../config/socket");
function initRequestSocket(socket) {
    socket.on("requests:subscribe", () => {
        socket.join("requests");
    });
}
function emitRequestUpdated(payload) {
    (0, socket_1.getSocketServer)()?.to("requests").emit("requests:updated", payload);
}
