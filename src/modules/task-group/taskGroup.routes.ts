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
  createTaskGroupSchema
} from "./taskGroup.schema";

import {
  createTaskGroup,
  getTaskGroupsList
} from "./taskGroup.controller";

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
    createTaskGroupSchema
  ),

  asyncHandler(
    createTaskGroup
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
    getTaskGroupsList
  )
);

export default router;