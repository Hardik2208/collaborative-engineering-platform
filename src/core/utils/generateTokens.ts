import jwt, {
  Secret,
  SignOptions
} from "jsonwebtoken";

import crypto from "crypto";

import { env }
from "../../config/env";

export const generateAccessToken =
  (
    userId: string
  ) => {

    const payload = {
      userId
    };

    const secret: Secret =
      env.JWT_SECRET;

    const options: SignOptions = {
      expiresIn: "15m"
    };

    return jwt.sign(
      payload,
      secret,
      options
    );
  };

export const generateRefreshToken =
  () => {

    return crypto
      .randomBytes(64)
      .toString("hex");
  };

export const hashRefreshToken =
  (
    token: string
  ) => {

    return crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  };