import { createServer } from "http";
import app from "./app";
import { env } from "./config/env";
import { initSocketServer } from "./config/socket";
import { bootstrapSocketModules } from "./sockets";
import { logger } from "./utils/logger";

const httpServer = createServer(app);
const io = initSocketServer(httpServer);

bootstrapSocketModules(io);

httpServer.listen(env.PORT, () => {
  logger.info(`HandToHand backend listening on port ${env.PORT}`);
});
