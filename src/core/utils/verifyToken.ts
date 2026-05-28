import jwt from "jsonwebtoken";

import { env } from "../../config/env";

interface JwtPayload {
  userId: string;
}

export const verifyToken = (
  token: string
) => {

  return jwt.verify(
    token,
    env.JWT_SECRET
  ) as JwtPayload;
};