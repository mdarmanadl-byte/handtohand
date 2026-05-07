import type { Socket } from "socket.io";

export function initNotificationSocket(socket: Socket) {
  socket.on("notifications:subscribe", (userId: string) => {
    socket.join(`notifications:${userId}`);
  });
}
