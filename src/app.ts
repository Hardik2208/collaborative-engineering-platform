import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { errorMiddleware } from "./core/middleware/error.middleware";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

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