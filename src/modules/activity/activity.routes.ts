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
  asyncHandler
} from "../../core/utils/asyncHandler";

import {
  getActivity
} from "./activity.controller";

const router = Router({
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
    getActivity
  )
);

export default router;