import {
  ConflictError
} from "../../core/errors/ConflictError";

import {
  createTaskGroup,
  findTaskGroupByName,
  findTaskGroupsByWorkspace
} from "./taskGroup.repository";

export const createTaskGroupService =
  async (
    workspaceId: string,
    name: string
  ) => {

    const existingTaskGroup =
      await findTaskGroupByName(
        workspaceId,
        name
      );

    if (existingTaskGroup) {

      throw new ConflictError(
        "Task group already exists"
      );
    }

    return createTaskGroup(
      workspaceId,
      name
    );
  };

export const getTaskGroups =
  async (
    workspaceId: string
  ) => {

    return findTaskGroupsByWorkspace(
      workspaceId
    );
  };