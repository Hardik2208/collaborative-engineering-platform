import {
  NextFunction,
  Request,
  Response
} from "express";

import {
  ZodError,
  ZodTypeAny
} from "zod";

export const validate = (
  schema: ZodTypeAny
) => {

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      await schema.parseAsync(
        req.body
      );

      next();

    } catch (error) {

      if (
        error instanceof ZodError
      ) {

        return res.status(400).json({
          success: false,

          message:
            "Validation failed",

          errors:
            error.flatten()
        });
      }

      next(error);
    }
  };
};