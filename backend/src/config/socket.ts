// Socket configuration and helpers

export function configureSocket() {
  // TODO: configure socket.io or similar
}
import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { env } from "./env";
import { logger } from "../utils/logger";

let io: Server | null = null;

export function initSocketServer(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: env.APP_BASE_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    logger.info(`Socket connected: ${socket.id}`);
  });

  return io;
}

export function getSocketServer() {
  return io;
}
