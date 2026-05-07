import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { notFoundMiddleware, errorMiddleware } from "./middleware/error.middleware";
import { apiRouter } from "./modules";

const app = express();

app.use(
  cors({
    origin: env.APP_BASE_URL,
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "HandToHand backend is running.",
    docsHint: "Use /api/health or /api/* module routes.",
  });
});

app.use("/api", apiRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
