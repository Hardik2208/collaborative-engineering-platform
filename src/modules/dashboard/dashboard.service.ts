import {
  countTasks,
  countTasksByStatus,
  findActiveSprint,
  countRecentActivity
} from "./dashboard.repository";

export const getWorkspaceDashboard =
  async (
    workspaceId: string
  ) => {

    const [
      totalTasks,
      todoTasks,
      inProgressTasks,
      doneTasks,
      activeSprint,
      recentActivityCount
    ] = await Promise.all([
      countTasks(workspaceId),

      countTasksByStatus(
        workspaceId,
        "TODO"
      ),

      countTasksByStatus(
        workspaceId,
        "IN_PROGRESS"
      ),

      countTasksByStatus(
        workspaceId,
        "DONE"
      ),

      findActiveSprint(
        workspaceId
      ),

      countRecentActivity(
        workspaceId
      )
    ]);

    return {
      totalTasks,

      todoTasks,

      inProgressTasks,

      doneTasks,

      activeSprint,

      recentActivityCount
    };
  };