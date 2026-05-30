import { Router }
from "express";

import {
  login,
  me,
  register,
  refresh,
  logout
} from "./auth.controller";

import {
  loginSchema,
  registerSchema,
  refreshSchema
} from "./auth.schema";

import {
  validate
} from "../../core/middleware/validate.middleware";

import {
  asyncHandler
} from "../../core/utils/asyncHandler";

import {
  authenticate
} from "../../core/middleware/auth.middleware";

const router = Router();

router.post(
  "/register",

  validate(registerSchema),

  asyncHandler(register)
);

router.post(
  "/login",

  validate(loginSchema),

  asyncHandler(login)
);

router.post(
  "/refresh",

  validate(
    refreshSchema
  ),

  asyncHandler(
    refresh
  )
);

router.get(
  "/me",

  asyncHandler(authenticate),

  asyncHandler(me)
);

router.post(
  "/logout",

  validate(
    refreshSchema
  ),

  asyncHandler(
    logout
  )
);

export default router;