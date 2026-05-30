import { prisma }
from "../../shared/prisma/prisma.service";

export const createActivityEvent =
  async (
    action: string,
    workspaceId: string,
    actorId: string,
    taskId?: string
  ) => {

    return prisma.activityEvent.create({
      data: {
        action,
        workspaceId,
        actorId,
        taskId
      }
    });
  };

export const findWorkspaceActivity =
  async (
    workspaceId: string
  ) => {

    return prisma.activityEvent.findMany({
      where: {
        workspaceId
      },

      include: {
        actor: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },

        task: {
          select: {
            id: true,
            title: true,
            status: true
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  };