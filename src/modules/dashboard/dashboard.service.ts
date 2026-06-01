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

    console.log(
      "\n=============================="
    );

    console.log(
      "DASHBOARD WORKSPACE:",
      workspaceId
    );

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

    console.log(
      "TOTAL TASKS:",
      totalTasks
    );

    console.log(
      "TODO TASKS:",
      todoTasks
    );

    console.log(
      "IN PROGRESS TASKS:",
      inProgressTasks
    );

    console.log(
      "DONE TASKS:",
      doneTasks
    );

    console.log(
      "ACTIVE SPRINT:",
      activeSprint
    );

    console.log(
      "RECENT ACTIVITY:",
      recentActivityCount
    );

    console.log(
      "==============================\n"
    );

    return {
      totalTasks,

      todoTasks,

      inProgressTasks,

      doneTasks,

      activeSprint,

      recentActivityCount
    };
  };