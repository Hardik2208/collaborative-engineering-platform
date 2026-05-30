import {
  BadRequestError
} from "../../core/errors/BadRequestError";

import {
  updateTaskGroup
} from "./task.repository";

import {
  NotFoundError
} from "../../core/errors/NotFoundError";

import {
  findWorkspaceMembership
} from "../workspace/workspaceMember.repository";

import {
  assignTaskToUser
} from "./task.repository";

import {
  TaskStatus
} from "@prisma/client";

import {
  updateTaskStatus
} from "./task.repository";

import {
  createActivityEvent
} from "../activity/activity.service";

import {
  ACTIVITY_TYPES
} from "../activity/activity.constants";

import {
  createTask,
  findSprintById,
  findTaskById,
  findTaskGroupById,
  findTasksByWorkspace,
  findUserById
} from "./task.repository";

export const createTaskService =
  async (
    workspaceId: string,
    createdById: string,
    payload: {
      title: string;
      description?: string;
      priority:
        | "LOW"
        | "MEDIUM"
        | "HIGH"
        | "CRITICAL";
      sprintId?: string;
      taskGroupId: string;
      assignedToId?: string;
    }
  ) => {

    const taskGroup =
      await findTaskGroupById(
        payload.taskGroupId
      );

    if (!taskGroup) {
      throw new NotFoundError(
        "Task group not found"
      );
    }

    if (
      taskGroup.workspaceId !==
      workspaceId
    ) {
      throw new BadRequestError(
        "Task group does not belong to workspace"
      );
    }

    if (payload.sprintId) {

      const sprint =
        await findSprintById(
          payload.sprintId
        );

      if (!sprint) {
        throw new NotFoundError(
          "Sprint not found"
        );
      }

      if (
        sprint.workspaceId !==
        workspaceId
      ) {
        throw new BadRequestError(
          "Sprint does not belong to workspace"
        );
      }
    }

    if (payload.assignedToId) {

      const assignee =
        await findUserById(
          payload.assignedToId
        );

      if (!assignee) {
        throw new NotFoundError(
          "Assigned user not found"
        );
      }
    }

    const task =
      await createTask({
        title: payload.title,
        description:
          payload.description,
        priority:
          payload.priority,
        workspaceId,
        sprintId:
          payload.sprintId,
        taskGroupId:
          payload.taskGroupId,
        assignedToId:
          payload.assignedToId,
        createdById,
        status: "TODO"
      });

    await createActivityEvent(
      ACTIVITY_TYPES.TASK_CREATED,
      workspaceId,
      createdById,
      task.id
    );

    return task;
  };

export const getTasksService =
  async (
    workspaceId: string
  ) => {

    return findTasksByWorkspace(
      workspaceId
    );
  };

export const getTaskService =
  async (
    taskId: string
  ) => {

    const task =
      await findTaskById(
        taskId
      );

    if (!task) {

      throw new NotFoundError(
        "Task not found"
      );
    }

    return task;
  };

export const updateTaskStatusService =
  async (
    taskId: string,
    status: TaskStatus,
    actorId: string
  ) => {

    const task =
      await findTaskById(
        taskId
      );

    if (!task) {

      throw new NotFoundError(
        "Task not found"
      );
    }

    const currentStatus =
      task.status;

    const validTransitions: Record<
      TaskStatus,
      TaskStatus[]
    > = {
      TODO: [
        "IN_PROGRESS"
      ],

      IN_PROGRESS: [
        "DONE"
      ],

      DONE: []
    };

    if (
      !validTransitions[
        currentStatus
      ].includes(status)
    ) {

      throw new BadRequestError(
        `Cannot move task from ${currentStatus} to ${status}`
      );
    }

    const updatedTask =
      await updateTaskStatus(
        taskId,
        status
      );

    await createActivityEvent(
      ACTIVITY_TYPES.TASK_STATUS_CHANGED,
      task.workspaceId,
      actorId,
      task.id
    );

    return updatedTask;
  };

export const assignTaskService =
  async (
    taskId: string,
    assignedToId: string,
    actorId: string
  ) => {

    const task =
      await findTaskById(
        taskId
      );

    if (!task) {

      throw new NotFoundError(
        "Task not found"
      );
    }

    const assignee =
      await findUserById(
        assignedToId
      );

    if (!assignee) {

      throw new NotFoundError(
        "User not found"
      );
    }

    const membership =
      await findWorkspaceMembership(
        assignedToId,
        task.workspaceId
      );

    if (!membership) {

      throw new BadRequestError(
        "User is not part of workspace"
      );
    }

    if (
      task.assignedToId ===
      assignedToId
    ) {

      throw new BadRequestError(
        "Task is already assigned to this user"
      );
    }

    const updatedTask =
      await assignTaskToUser(
        taskId,
        assignedToId
      );

    await createActivityEvent(
      ACTIVITY_TYPES.TASK_ASSIGNED,
      task.workspaceId,
      actorId,
      task.id
    );

    return updatedTask;
  };

export const moveTaskService =
  async (
    taskId: string,
    taskGroupId: string,
    actorId: string
  ) => {

    const task =
      await findTaskById(
        taskId
      );

    if (!task) {

      throw new NotFoundError(
        "Task not found"
      );
    }

    const taskGroup =
      await findTaskGroupById(
        taskGroupId
      );

    if (!taskGroup) {

      throw new NotFoundError(
        "Task group not found"
      );
    }

    if (
      taskGroup.workspaceId !==
      task.workspaceId
    ) {

      throw new BadRequestError(
        "Task group does not belong to task workspace"
      );
    }

    if (
      task.taskGroupId ===
      taskGroupId
    ) {

      throw new BadRequestError(
        "Task already belongs to this task group"
      );
    }

    const updatedTask =
      await updateTaskGroup(
        taskId,
        taskGroupId
      );

    await createActivityEvent(
      ACTIVITY_TYPES.TASK_MOVED,
      task.workspaceId,
      actorId,
      task.id
    );

    return updatedTask;
  };