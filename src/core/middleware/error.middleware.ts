import {
  NextFunction,
  Request,
  Response
} from "express";

import crypto from "crypto";

import {
  AppError
} from "../errors/AppError";

import {
  logger
} from "../../config/logger";

export const errorMiddleware =
  (
    error: Error,
    req: Request,
    res: Response,
    _: NextFunction
  ) => {
    const errorId =
  crypto.randomUUID();
    const requestId =
      req.requestId;

    logger.error({
  errorId,
  requestId,
  method: req.method,
  url: req.originalUrl,
  message: error.message,
  stack: error.stack
});

    if (
  error instanceof AppError
) {

  return res.status(
    error.statusCode
  ).json({
    success: false,

    requestId,

    errorId,

    message:
      error.message
  });
}

   return res.status(500).json({
  success: false,
  requestId,
  errorId,
  message: "Internal Server Error"
});
  };