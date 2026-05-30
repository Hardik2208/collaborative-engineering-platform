import { prisma }
from "../../shared/prisma/prisma.service";

interface CreateUserPayload {
  fullName: string;

  email: string;

  passwordHash: string;
}

export const findUserByEmail =
  async (
    email: string
  ) => {

    return prisma.user.findUnique({
      where: {
        email
      }
    });
  };

export const createUser =
  async (
    data: CreateUserPayload
  ) => {

    return prisma.user.create({
      data
    });
  };

  export const createRefreshToken =
  async (
    token: string,
    userId: string,
    expiresAt: Date
  ) => {

    return prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt
      }
    });
  };

export const findRefreshToken =
  async (
    token: string
  ) => {

    return prisma.refreshToken.findUnique({
      where: {
        token
      },

      include: {
        user: true
      }
    });
  };

export const deleteRefreshToken =
  async (
    token: string
  ) => {

    return prisma.refreshToken.delete({
      where: {
        token
      }
    });
  };