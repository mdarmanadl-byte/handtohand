import type { Socket } from "socket.io";
import { getSocketServer } from "../config/socket";

export function initRequestSocket(socket: Socket) {
  socket.on("requests:subscribe", () => {
    socket.join("requests");
  });
}

export function emitRequestUpdated(
  payload: unknown,
  senderSocket?: Socket,
) {
  if (senderSocket) {
    senderSocket.broadcast
      .to("requests")
      .emit("requests:updated", payload);

    return;
  }

  getSocketServer()?.to("requests").emit("requests:updated", payload);
}