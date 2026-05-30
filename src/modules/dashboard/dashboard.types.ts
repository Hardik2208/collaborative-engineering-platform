export interface DashboardOverview {
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  doneTasks: number;

  totalSprints: number;
  activeSprints: number;
  completedSprints: number;

  totalMembers: number;
}

export interface SprintProgress {
  sprintId: string;
  sprintName: string;
  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;
}