"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTripSocket = initTripSocket;
exports.emitTripUpdated = emitTripUpdated;
const socket_1 = require("../config/socket");
function initTripSocket(socket) {
    socket.on("trips:subscribe", () => {
        socket.join("trips");
    });
}
function emitTripUpdated(payload) {
    (0, socket_1.getSocketServer)()?.to("trips").emit("trips:updated", payload);
}
