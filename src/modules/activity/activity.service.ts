import {
  createActivityEvent as createActivityEventRepository,
  findWorkspaceActivity
} from "./activity.repository";

export const createActivityEvent =
  async (
    action: string,
    workspaceId: string,
    actorId: string,
    taskId?: string
  ) => {

    return createActivityEventRepository(
      action,
      workspaceId,
      actorId,
      taskId
    );
  };

export const getWorkspaceActivity =
  async (
    workspaceId: string,
    page: number,
    limit: number
  ) => {

    const {
      activities,
      total
    } =
      await findWorkspaceActivity(
        workspaceId,
        page,
        limit
      );

    return {
      items: activities,

      pagination: {
        page,
        limit,
        total,

        totalPages:
          Math.ceil(
            total / limit
          )
      }
    };
  };