import express from "express";
import cors from "cors";
import helmet from "helmet";
import {
  requestLogger
}
from "./core/middleware/logger.middleware";
import routes from "./routes";
import { errorMiddleware } from "./core/middleware/error.middleware";

import {
  generalLimiter
} from "./core/middleware/rateLimit.middleware";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(generalLimiter);

app.use(requestLogger);

app.use("/api", routes);

app.get("/health", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy"
  });
});

app.use("/api", routes);

app.use(errorMiddleware);

export default app;