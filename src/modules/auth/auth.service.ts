import {
  ConflictError
} from "../../core/errors/ConflictError";

import {
  UnauthorizedError
} from "../../core/errors/UnauthorizedError";

import {
  hashPassword
} from "../../core/utils/hashPassword";

import {
  comparePassword
} from "../../core/utils/comparePassword";

import {
  generateToken
} from "../../core/utils/generateTokens";

import {
  createUser,
  findUserByEmail
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

    const token =
      generateToken(
        user.id
      );

    return {
      user,
      token
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

    const token =
      generateToken(
        user.id
      );

    const sanitizedUser = {
  id: user.id,

  email: user.email,

  fullName: user.fullName,

  createdAt: user.createdAt
};

return {
  user: sanitizedUser,
  token
};
  };