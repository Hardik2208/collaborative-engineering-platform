import { Router }
from "express";

import {
  authenticate
} from "../../core/middleware/auth.middleware";

import {
  validate
} from "../../core/middleware/validate.middleware";

import {
  asyncHandler
} from "../../core/utils/asyncHandler";

import {
  create
} from "./organization.controller";

import {
  createOrganizationSchema
} from "./organization.schema";

import {
  getMine
} from "./organization.controller";

import {
  requireOrganizationAccess
} from "../../core/middleware/organization.middleware";

import {
  getBySlug
} from "./organization.controller";

import {
  getMembers
} from "./organization.controller";

import {
  requireOrganizationRole
} from "../../core/middleware/rbac.middleware";

import {
  inviteMember
} from "./organization.controller";

import {
  addMemberSchema
} from "./organization.schema";

import workspaceRoutes
from "../workspace/workspace.routes";

const router = Router();


router.post(
  "/",

  asyncHandler(authenticate),

  validate(
    createOrganizationSchema
  ),

  asyncHandler(create)
);

router.get(
  "/my",

  asyncHandler(authenticate),

  asyncHandler(getMine)
);

router.use(
  "/:slug/workspaces",
  workspaceRoutes
);


router.get(
  "/:slug",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(getBySlug)
);

router.get(
  "/:slug/members",

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

  asyncHandler(
    getMembers
  )
);

router.post(
  "/:slug/members",

  asyncHandler(authenticate),

  asyncHandler(
    requireOrganizationAccess
  ),

  asyncHandler(
    requireOrganizationRole([
      "OWNER"
    ])
  ),

  validate(
    addMemberSchema
  ),

  asyncHandler(
    inviteMember
  )
);

export default router;