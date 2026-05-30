import { prisma } from "../../shared/prisma/prisma.service";

export const countTasks =
  async (
    workspaceId: string
  ) => {

    return prisma.task.count({
      where: {
        workspaceId
      }
    });
  };

export const countTasksByStatus =
  async (
    workspaceId: string,
    status:
      | "TODO"
      | "IN_PROGRESS"
      | "DONE"
  ) => {

    return prisma.task.count({
      where: {
        workspaceId,
        status
      }
    });
  };

export const findActiveSprint =
  async (
    workspaceId: string
  ) => {

    return prisma.sprint.findFirst({
      where: {
        workspaceId,
        status: "ACTIVE"
      },

      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true
      }
    });
  };

export const countRecentActivity =
  async (
    workspaceId: string
  ) => {

    const thirtyDaysAgo =
      new Date();

    thirtyDaysAgo.setDate(
      thirtyDaysAgo.getDate() - 30
    );

    return prisma.activityEvent.count({
      where: {
        workspaceId,

        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });
  };