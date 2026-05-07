"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initNotificationSocket = initNotificationSocket;
function initNotificationSocket(socket) {
    socket.on("notifications:subscribe", (userId) => {
        socket.join(`notifications:${userId}`);
    });
}
