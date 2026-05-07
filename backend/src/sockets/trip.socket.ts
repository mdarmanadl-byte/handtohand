import type { Socket } from "socket.io";
import { getSocketServer } from "../config/socket";

export function initTripSocket(socket: Socket) {
  socket.on("trips:subscribe", () => {
    socket.join("trips");
  });
}

export function emitTripUpdated(payload: unknown) {
  getSocketServer()?.to("trips").emit("trips:updated", payload);
}
