import { prisma } from "../../shared/prisma/prisma.service";


export const countTasks =
  async (
    workspaceId: string
  ) => {

    console.log("DASHBOARD REPOSITORY LOADED");

console.log(
  "COUNT TASKS CALLED",
  workspaceId
);

    const tasks =
      await prisma.task.findMany({
        where: {
          workspaceId
        },

        select: {
          id: true,
          title: true,
          workspaceId: true
        }
      });

    console.log(
      "COUNT TASKS",
      workspaceId,
      tasks.length
    );

    return tasks.length;
  };

export const countTasksByStatus =
  async (
    workspaceId: string,
    status:
      | "TODO"
      | "IN_PROGRESS"
      | "DONE"
  ) => {

    console.log("DASHBOARD REPOSITORY LOADED");

console.log(
  "COUNT TASKS CALLED",
  workspaceId
);

    const tasks =
      await prisma.task.findMany({
        where: {
          workspaceId,
          status
        },

        select: {
          id: true,
          status: true
        }
      });

    console.log(
      "COUNT STATUS",
      workspaceId,
      status,
      tasks.length
    );

    return tasks.length;
  };

export const findActiveSprint =
  async (
    workspaceId: string
  ) => {

    console.log("DASHBOARD REPOSITORY LOADED");

console.log(
  "COUNT TASKS CALLED",
  workspaceId
);

    const sprint =
      await prisma.sprint.findFirst({
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

    console.log(
      "ACTIVE SPRINT",
      workspaceId,
      sprint?.id
    );

    return sprint;
  };

export const countRecentActivity =
  async (
    workspaceId: string
  ) => {

    console.log("DASHBOARD REPOSITORY LOADED");

console.log(
  "COUNT TASKS CALLED",
  workspaceId
);
    const thirtyDaysAgo =
      new Date();

    thirtyDaysAgo.setDate(
      thirtyDaysAgo.getDate() - 30
    );

    const count =
      await prisma.activityEvent.count({
        where: {
          workspaceId,

          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      });

    console.log(
      "RECENT ACTIVITY",
      workspaceId,
      count
    );

    return count;
  };