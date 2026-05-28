import {
  NextFunction,
  Request,
  Response
} from "express";

import { prisma }
from "../../shared/prisma/prisma.service";

import {
  UnauthorizedError
} from "../errors/UnauthorizedError";

import {
  verifyToken
} from "../utils/verifyToken";

export const authenticate =
  async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      throw new UnauthorizedError(
        "Authentication required"
      );
    }

    const token =
      authHeader.split(" ")[1];

    const payload =
      verifyToken(token);

    const user =
      await prisma.user.findUnique({
        where: {
          id: payload.userId
        }
      });

    if (!user) {

      throw new UnauthorizedError(
        "User not found"
      );
    }

    req.user = {
      id: user.id,

      email: user.email,

      fullName: user.fullName,

      createdAt: user.createdAt,

      updatedAt: user.updatedAt
    };

    next();
  };