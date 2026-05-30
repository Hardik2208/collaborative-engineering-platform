import { prisma }
from "../../shared/prisma/prisma.service";

import {
  SprintStatus
} from "@prisma/client";

export const createSprint =
  async (
    workspaceId: string,
    name: string,
    startDate: Date,
    endDate: Date
  ) => {

    return prisma.sprint.create({
      data: {
        workspaceId,
        name,
        status: "PLANNED",
        startDate,
        endDate
      }
    });
  };

export const findSprintsByWorkspace =
  async (
    workspaceId: string
  ) => {

    return prisma.sprint.findMany({
      where: {
        workspaceId
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

export const findActiveSprintByWorkspace =
  async (
    workspaceId: string
  ) => {

    return prisma.sprint.findFirst({
      where: {
        workspaceId,
        status: "ACTIVE"
      }
    });
  };

export const updateSprintStatus =
  async (
    sprintId: string,
    status: SprintStatus
  ) => {

    return prisma.sprint.update({
      where: {
        id: sprintId
      },

      data: {
        status
      }
    });
  };