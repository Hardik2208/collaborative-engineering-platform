import {
  Request,
  Response
} from "express";

import {
  apiResponse
} from "../../core/responses/apiResponse";

import {
  createTaskGroupService,
  getTaskGroups
} from "./taskGroup.service";

export const createTaskGroup =
  async (
    req: Request,
    res: Response
  ) => {

    const { name } =
      req.body;

    const taskGroup =
      await createTaskGroupService(
        req.workspace!.workspaceId,
        name
      );

    return apiResponse(res, {
      success: true,

      statusCode: 201,

      message:
        "Task group created successfully",

      data: taskGroup
    });
  };

export const getTaskGroupsList =
  async (
    req: Request,
    res: Response
  ) => {

    const taskGroups =
      await getTaskGroups(
        req.workspace!.workspaceId
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Task groups fetched successfully",

      data: taskGroups
    });
  };