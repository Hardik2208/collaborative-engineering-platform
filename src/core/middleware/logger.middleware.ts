import {
  Request,
  Response,
  NextFunction
} from "express";

import crypto from "crypto";

import { logger }
from "../../config/logger";

export const requestLogger =
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const requestId =
      crypto.randomUUID();

    req.requestId =
      requestId;

    const start =
      Date.now();

    res.on(
      "finish",
      () => {

        const duration =
          Date.now() - start;

        logger.info({
  requestId,

  method:
    req.method,

  url:
    req.originalUrl,

  statusCode:
    res.statusCode,

  duration,

  userAgent:
    req.get("user-agent"),

  ip:
    req.ip
});
      }
    );

    next();
  };