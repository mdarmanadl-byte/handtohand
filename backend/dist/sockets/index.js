"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapSocketModules = bootstrapSocketModules;
const notification_socket_1 = require("./notification.socket");
const request_socket_1 = require("./request.socket");
const trip_socket_1 = require("./trip.socket");
function bootstrapSocketModules(io) {
    io.on("connection", (socket) => {
        (0, request_socket_1.initRequestSocket)(socket);
        (0, trip_socket_1.initTripSocket)(socket);
        (0, notification_socket_1.initNotificationSocket)(socket);
    });
}
