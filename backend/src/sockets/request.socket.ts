import type { Socket } from "socket.io";
import { getSocketServer } from "../config/socket";

export function initRequestSocket(socket: Socket) {
  socket.on("requests:subscribe", () => {
    socket.join("requests");
  });
}

export function emitRequestUpdated(payload: unknown) {
  getSocketServer()?.to("requests").emit("requests:updated", payload);
}
