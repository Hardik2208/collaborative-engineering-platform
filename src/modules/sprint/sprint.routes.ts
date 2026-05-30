import { Router } from "express";

import { authenticate }
from "../../core/middleware/auth.middleware";

import { requireOrganizationAccess }
from "../../core/middleware/organization.middleware";

import { requireWorkspaceAccess }
from "../../core/middleware/workspace.middleware";

import { requireOrganizationRole }
from "../../core/middleware/rbac.middleware";

import { validate }
from "../../core/middleware/validate.middleware";

import { asyncHandler }
from "../../core/utils/asyncHandler";

import {
  createSprintSchema
} from "./sprint.schema";

import {
  createSprint,
  getSprints
} from "./sprint.controller";

import {
  startSprint,
  completeSprint
} from "./sprint.controller";

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
    createSprintSchema
  ),

  asyncHandler(
    createSprint
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
    getSprints
  )
);

router.patch(
  "/:sprintId/start",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  asyncHandler(
    startSprint
  )
);

router.patch(
  "/:sprintId/complete",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireWorkspaceAccess
  ),

  asyncHandler(
    completeSprint
  )
);

export default router;