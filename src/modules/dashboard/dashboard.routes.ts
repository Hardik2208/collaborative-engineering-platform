import { Router } from "express";

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
  asyncHandler
} from "../../core/utils/asyncHandler";

import {
  getDashboard
} from "./dashboard.controller";

const router =
  Router({
    mergeParams: true
  });

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
    getDashboard
  )
);

export default router;