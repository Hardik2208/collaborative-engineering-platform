import { prisma }
from "../../shared/prisma/prisma.service";

import {
  TaskStatus
} from "@prisma/client";

export const createTask =
  async (
    data: {
      title: string;
      description?: string;
      priority:
        | "LOW"
        | "MEDIUM"
        | "HIGH"
        | "CRITICAL";

      workspaceId: string;

      sprintId?: string;

      taskGroupId: string;

      assignedToId?: string;

      createdById: string;

      status: "TODO";
    }
  ) => {

    return prisma.task.create({
      data
    });
  };

export const findTaskById =
  async (
    taskId: string
  ) => {

    return prisma.task.findUnique({
      where: {
        id: taskId
      },

      include: {
        assignee: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },

        creator: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },

        sprint: true,

        taskGroup: true
      }
    });
  };

export const findTasksByWorkspace =
  async (
    workspaceId: string
  ) => {

    return prisma.task.findMany({
      where: {
        workspaceId
      },

      include: {
        assignee: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },

        creator: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        },

        sprint: true,

        taskGroup: true
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  };

export const findSprintById =
  async (
    sprintId: string
  ) => {

    return prisma.sprint.findUnique({
      where: {
        id: sprintId
      }
    });
  };

export const findTaskGroupById =
  async (
    taskGroupId: string
  ) => {

    return prisma.taskGroup.findUnique({
      where: {
        id: taskGroupId
      }
    });
  };

export const findUserById =
  async (
    userId: string
  ) => {

    return prisma.user.findUnique({
      where: {
        id: userId
      }
    });
  };

  export const updateTaskStatus =
  async (
    taskId: string,
    status: TaskStatus
  ) => {

    return prisma.task.update({
      where: {
        id: taskId
      },

      data: {
        status
      }
    });
  };

  export const assignTaskToUser =
  async (
    taskId: string,
    assignedToId: string
  ) => {

    return prisma.task.update({
      where: {
        id: taskId
      },

      data: {
        assignedToId
      }
    });
  };

  export const updateTaskGroup =
  async (
    taskId: string,
    taskGroupId: string
  ) => {

    return prisma.task.update({
      where: {
        id: taskId
      },

      data: {
        taskGroupId
      }
    });
  };