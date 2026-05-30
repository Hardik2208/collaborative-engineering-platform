import { Router }
from "express";

import {
  authenticate
} from "../../core/middleware/auth.middleware";

import {
  requireOrganizationAccess
} from "../../core/middleware/organization.middleware";

import {
  requireWorkspaceAccess
} from "../../core/middleware/workspace.middleware";

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
  createTaskSchema
} from "./task.schema";

import {
  createTask,
  getTask,
  getTasks
} from "./task.controller";

import {
  updateTaskStatusSchema
} from "./task.schema";

import {
  updateTaskStatus
} from "./task.controller";

import {
  moveTaskSchema
} from "./task.schema";

import {
  moveTask
} from "./task.controller";

import {
    assignTaskSchema
} from "./task.schema";

import {
  assignTask
} from "./task.controller";

const router = Router({
  mergeParams: true
});

router.post(
  "/",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  asyncHandler(
    requireOrganizationRole([
      "OWNER",
      "ADMIN"
    ])
  ),

  validate(
    createTaskSchema
  ),

  asyncHandler(
    createTask
  )
);
router.patch(
  "/:taskId/task-group",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  validate(
    moveTaskSchema
  ),

  asyncHandler(
    moveTask
  )
);
router.get(
  "/",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  asyncHandler(
    getTasks
  )
);

router.patch(
  "/:taskId/status",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  validate(
    updateTaskStatusSchema
  ),

  asyncHandler(
    updateTaskStatus
  )
);

router.get(
  "/:taskId",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  asyncHandler(
    getTask
  )
);

router.patch(
  "/:taskId/assign",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  validate(
    assignTaskSchema
  ),

  asyncHandler(
    assignTask
  )
);

router.patch(
  "/:taskId/task-group",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  validate(
    moveTaskSchema
  ),

  asyncHandler(
    moveTask
  )
);

export default router;