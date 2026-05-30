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
    workspaceId: string,
    page: number,
    limit: number
  ) => {

    const total =
      await prisma.activityEvent.count({
        where: {
          workspaceId
        }
      });

    const activities =
      await prisma.activityEvent.findMany({
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
        },

        skip:
          (page - 1) * limit,

        take:
          limit
      });

    return {
      activities,
      total
    };
  };

  