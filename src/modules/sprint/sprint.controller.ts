import {
  Request,
  Response
} from "express";

import {
  apiResponse
} from "../../core/responses/apiResponse";

import {
  createSprintService,
  getWorkspaceSprints
} from "./sprint.service";

import {
  startSprintService,
  completeSprintService
} from "./sprint.service";

export const createSprint =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      name,
      startDate,
      endDate
    } = req.body;

    const sprint =
  await createSprintService(
    req.workspace!.workspaceId,
    req.user!.id,
    name,
    new Date(startDate),
    new Date(endDate)
  );

    return apiResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "Sprint created successfully",
      data: sprint
    });
  };

export const getSprints =
  async (
    req: Request,
    res: Response
  ) => {

    const sprints =
      await getWorkspaceSprints(
        req.workspace!.workspaceId
      );

    return apiResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Sprints fetched successfully",
      data: sprints
    });
  };

export const startSprint =
  async (
    req: Request,
    res: Response
  ) => {

    const sprintId =
      req.params.sprintId;

    if (
      !sprintId ||
      Array.isArray(sprintId)
    ) {

      throw new Error(
        "Invalid sprint id"
      );
    }

    const sprint =
      await startSprintService(
        sprintId,
        req.user!.id
      );

    return apiResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Sprint started successfully",
      data: sprint
    });
  };

export const completeSprint =
  async (
    req: Request,
    res: Response
  ) => {

    const sprintId =
      req.params.sprintId;

    if (
      !sprintId ||
      Array.isArray(sprintId)
    ) {

      throw new Error(
        "Invalid sprint id"
      );
    }

    const sprint =
      await completeSprintService(
        sprintId,
        req.user!.id
      );

    return apiResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Sprint completed successfully",
      data: sprint
    });
  };