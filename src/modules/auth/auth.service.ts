import {
  ConflictError
} from "../../core/errors/ConflictError";

import {
  UnauthorizedError
} from "../../core/errors/UnauthorizedError";

import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken
}
from "../../core/utils/generateTokens";


import {
  findRefreshToken,
  deleteRefreshToken
} from "./auth.repository";

import {
  hashPassword
} from "../../core/utils/hashPassword";

import {
  comparePassword
} from "../../core/utils/comparePassword";


import {
  createUser,
  findUserByEmail,
  createRefreshToken
} from "./auth.repository";

export const registerUser =
  async (
    fullName: string,
    email: string,
    password: string
  ) => {

    const existingUser =
      await findUserByEmail(
        email
      );

    if (existingUser) {
      throw new ConflictError(
        "User already exists"
      );
    }

    const passwordHash =
      await hashPassword(
        password
      );

    const user =
      await createUser({
        fullName,
        email,
        passwordHash
      });

    const accessToken =
  generateAccessToken(
    user.id
  );

const refreshToken =
  generateRefreshToken();

await createRefreshToken(
  hashRefreshToken(
    refreshToken
  ),

  user.id,

  new Date(
    Date.now() +
    7 * 24 * 60 * 60 * 1000
  )
);
const sanitizedUser = {
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  createdAt: user.createdAt
};

return {
  user: sanitizedUser,
  accessToken,
  refreshToken
};
  };

export const loginUser =
  async (
    email: string,
    password: string
  ) => {

    const user =
      await findUserByEmail(
        email
      );

    if (!user) {
      throw new UnauthorizedError(
        "Invalid credentials"
      );
    }

    const isPasswordValid =
      await comparePassword(
        password,
        user.passwordHash
      );

    if (!isPasswordValid) {
      throw new UnauthorizedError(
        "Invalid credentials"
      );
    }

    const accessToken =
  generateAccessToken(
    user.id
  );

const refreshToken =
  generateRefreshToken();

await createRefreshToken(
  hashRefreshToken(
    refreshToken
  ),

  user.id,

  new Date(
    Date.now() +
    7 * 24 * 60 * 60 * 1000
  )
);

    const sanitizedUser = {
  id: user.id,

  email: user.email,

  fullName: user.fullName,

  createdAt: user.createdAt
};

return {
  user: sanitizedUser,

  accessToken,

  refreshToken
};
  };

export const refreshAccessToken =
  async (
    refreshToken: string
  ) => {

    const hashedToken =
      hashRefreshToken(
        refreshToken
      );

    const storedToken =
      await findRefreshToken(
        hashedToken
      );

    if (!storedToken) {

      throw new UnauthorizedError(
        "Invalid refresh token"
      );
    }

    if (
      storedToken.expiresAt <
      new Date()
    ) {

      await deleteRefreshToken(
        hashedToken
      );

      throw new UnauthorizedError(
        "Refresh token expired"
      );
    }

    await deleteRefreshToken(
      hashedToken
    );

    const newRefreshToken =
      generateRefreshToken();

    const hashedNewToken =
      hashRefreshToken(
        newRefreshToken
      );

    await createRefreshToken(
      hashedNewToken,

      storedToken.userId,

      new Date(
        Date.now() +
        7 *
          24 *
          60 *
          60 *
          1000
      )
    );

    const accessToken =
      generateAccessToken(
        storedToken.userId
      );

    return {
      accessToken,

      refreshToken:
        newRefreshToken
    };
  };

  export const logoutUser =
  async (
    refreshToken: string
  ) => {

    const hashedToken =
      hashRefreshToken(
        refreshToken
      );

    const storedToken =
      await findRefreshToken(
        hashedToken
      );

    if (!storedToken) {
      return;
    }

    await deleteRefreshToken(
      hashedToken
    );
  };