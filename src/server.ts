import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";

const PORT = Number(env.PORT);

app.listen(PORT, () => {
  logger.info({
  port: PORT
}, "Server started");
});