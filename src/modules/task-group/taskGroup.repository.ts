import { prisma }
from "../../shared/prisma/prisma.service";

export const findTaskGroupByName =
  async (
    workspaceId: string,
    name: string
  ) => {

    return prisma.taskGroup.findFirst({
      where: {
        workspaceId,
        name
      }
    });
  };

export const createTaskGroup =
  async (
    workspaceId: string,
    name: string
  ) => {

    return prisma.taskGroup.create({
      data: {
        workspaceId,
        name
      }
    });
  };

export const findTaskGroupsByWorkspace =
  async (
    workspaceId: string
  ) => {

    return prisma.taskGroup.findMany({
      where: {
        workspaceId
      },

      orderBy: {
        createdAt: "asc"
      }
    });
  };