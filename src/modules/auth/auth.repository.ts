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