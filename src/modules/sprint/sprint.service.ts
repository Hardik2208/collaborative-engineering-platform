import {
  BadRequestError
} from "../../core/errors/BadRequestError";

import {
  createSprint,
  findSprintsByWorkspace
} from "./sprint.repository";

import {
  createActivityEvent
} from "../activity/activity.repository";

import {
  NotFoundError
} from "../../core/errors/NotFoundError";

import {
  SprintStatus
} from "@prisma/client";

import {
  findSprintById,
  findActiveSprintByWorkspace,
  updateSprintStatus
} from "./sprint.repository";

import {
  ACTIVITY_TYPES
} from "../activity/activity.constants";

export const createSprintService =
  async (
    workspaceId: string,
    actorId: string,
    name: string,
    startDate: Date,
    endDate: Date
  ) => {

    if (
      endDate <= startDate
    ) {

      throw new BadRequestError(
        "End date must be after start date"
      );
    }

    const sprint =
      await createSprint(
        workspaceId,
        name,
        startDate,
        endDate
      );

    await createActivityEvent(
      "SPRINT_CREATED",
      workspaceId,
      actorId
    );

    return sprint;
  };

export const getWorkspaceSprints =
  async (
    workspaceId: string
  ) => {

    return findSprintsByWorkspace(
      workspaceId
    );
  };

  export const startSprintService =
  async (
    sprintId: string,
    actorId: string
  ) => {

    const sprint =
      await findSprintById(
        sprintId
      );

    if (!sprint) {

      throw new NotFoundError(
        "Sprint not found"
      );
    }

    if (
      sprint.status !==
      SprintStatus.PLANNED
    ) {

      throw new BadRequestError(
        "Only planned sprints can be started"
      );
    }

    const activeSprint =
      await findActiveSprintByWorkspace(
        sprint.workspaceId
      );

    if (activeSprint) {

      throw new BadRequestError(
        "An active sprint already exists"
      );
    }

    const updatedSprint =
      await updateSprintStatus(
        sprintId,
        SprintStatus.ACTIVE
      );

    await createActivityEvent(
      ACTIVITY_TYPES.SPRINT_STARTED,
      sprint.workspaceId,
      actorId
    );

    return updatedSprint;
  };

export const completeSprintService =
  async (
    sprintId: string,
    actorId: string
  ) => {

    const sprint =
      await findSprintById(
        sprintId
      );

    if (!sprint) {

      throw new NotFoundError(
        "Sprint not found"
      );
    }

    if (
      sprint.status !==
      SprintStatus.ACTIVE
    ) {

      throw new BadRequestError(
        "Only active sprints can be completed"
      );
    }

    const updatedSprint =
      await updateSprintStatus(
        sprintId,
        SprintStatus.COMPLETED
      );

    await createActivityEvent(
      ACTIVITY_TYPES.SPRINT_COMPLETED,
      sprint.workspaceId,
      actorId
    );

    return updatedSprint;
  };