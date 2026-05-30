import { Router }
from "express";

import {
  authenticate
} from "../../core/middleware/auth.middleware";

import {
  requireOrganizationAccess
} from "../../core/middleware/organization.middleware";

import {
  requireOrganizationRole
} from "../../core/middleware/rbac.middleware";

import {
  validate
} from "../../core/middleware/validate.middleware";

import {
  asyncHandler
} from "../../core/utils/asyncHandler";

import {
  createWorkspaceSchema
} from "./workspace.schema";

import {
  createWorkspace,
  getWorkspaces
} from "./workspace.controller";

import {
  getWorkspace
} from "./workspace.controller";

import {
  requireWorkspaceAccess
} from "../../core/middleware/workspace.middleware";

import sprintRoutes
from "../sprint/sprint.routes";

import taskGroupRoutes
from "../task-group/taskGroup.routes";

import taskRoutes
from "../task/task.routes";

import activityRoutes
from "../activity/activity.routes";

const router = Router({ mergeParams: true });

router.post(
  "/",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireOrganizationRole([
      "OWNER",
      "ADMIN"
    ])
  ),

  validate(
    createWorkspaceSchema
  ),

  asyncHandler(
    createWorkspace
  )
);

router.get(
  "/",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    getWorkspaces
  )
);

router.use(
  "/:workspaceSlug/sprints",
  sprintRoutes
);

router.use(
  "/:workspaceSlug/task-groups",
  taskGroupRoutes
);

router.use(
  "/:workspaceSlug/tasks",
  taskRoutes
);

router.use(
  "/:workspaceSlug/activity",
  activityRoutes
);

router.get(
  "/:workspaceSlug",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  asyncHandler(
    getWorkspace
  )
);

export default router;