import type { Server } from "socket.io";
import { initNotificationSocket } from "./notification.socket";
import { initRequestSocket } from "./request.socket";
import { initTripSocket } from "./trip.socket";

export function bootstrapSocketModules(io: Server) {
  io.on("connection", (socket) => {
    initRequestSocket(socket);
    initTripSocket(socket);
    initNotificationSocket(socket);
  });
}
