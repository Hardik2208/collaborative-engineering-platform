import {
  Request,
  Response
} from "express";

import {
  apiResponse
} from "../../core/responses/apiResponse";

import {
  moveTaskService
} from "./task.service";

import {
  updateTaskStatusService
} from "./task.service";

import {
  assignTaskService
} from "./task.service";

import {
  createTaskService,
  getTaskService,
  getTasksService
} from "./task.service";

export const createTask =
  async (
    req: Request,
    res: Response
  ) => {

    const task =
      await createTaskService(
        req.workspace!.workspaceId,
        req.user!.id,
        req.body
      );

    return apiResponse(res, {
      success: true,
      statusCode: 201,
      message:
        "Task created successfully",
      data: task
    });
  };

export const getTasks =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      status,
      assignedToId,
      sprintId,
      taskGroupId,
      page = "1",
      limit = "20"
    } = req.query;

    const tasks =
      await getTasksService(
        req.workspace!.workspaceId,

        {
          status:
            typeof status ===
            "string"
              ? status
              : undefined,

          assignedToId:
            typeof assignedToId ===
            "string"
              ? assignedToId
              : undefined,

          sprintId:
            typeof sprintId ===
            "string"
              ? sprintId
              : undefined,

          taskGroupId:
            typeof taskGroupId ===
            "string"
              ? taskGroupId
              : undefined,

          page:
            Number(page),

          limit:
            Number(limit)
        }
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Tasks fetched successfully",

      data: tasks
    });
  };

export const getTask =
  async (
    req: Request,
    res: Response
  ) => {

    const taskId =
      req.params.taskId;

    if (
      !taskId ||
      Array.isArray(taskId)
    ) {
      throw new Error(
        "Invalid task id"
      );
    }

    const task =
      await getTaskService(
        taskId
      );

    return apiResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Task fetched successfully",
      data: task
    });
  };

  export const updateTaskStatus =
  async (
    req: Request,
    res: Response
  ) => {

    const taskId =
      req.params.taskId;

    if (
      !taskId ||
      Array.isArray(taskId)
    ) {

      throw new Error(
        "Invalid task id"
      );
    }

    const {
      status
    } = req.body;

    const task =
      await updateTaskStatusService(
  taskId,
  status,
  req.user!.id
);

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Task status updated successfully",

      data: task
    });
  };

  export const assignTask =
  async (
    req: Request,
    res: Response
  ) => {

    const taskId =
      req.params.taskId;

    if (
      !taskId ||
      Array.isArray(taskId)
    ) {

      throw new Error(
        "Invalid task id"
      );
    }

    const {
      assignedToId
    } = req.body;

    const task =
      await assignTaskService(
        taskId,
        assignedToId,
        req.user!.id
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Task assigned successfully",

      data: task
    });
  };

  export const moveTask =
  async (
    req: Request,
    res: Response
  ) => {

    const taskId =
      req.params.taskId;

    if (
      !taskId ||
      Array.isArray(taskId)
    ) {

      throw new Error(
        "Invalid task id"
      );
    }

    const {
      taskGroupId
    } = req.body;

    const task =
      await moveTaskService(
        taskId,
        taskGroupId,
        req.user!.id
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Task moved successfully",

      data: task
    });
  };