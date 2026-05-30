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

import {
  authLimiter
} from "../../core/middleware/rateLimit.middleware";

const router = Router();

router.post(
  "/register",

  authLimiter,

  validate(
    registerSchema
  ),

  asyncHandler(
    register
  )
);

router.post(
  "/login",

  authLimiter,

  validate(
    loginSchema
  ),

  asyncHandler(
    login
  )
);

router.post(
  "/refresh",

  authLimiter,

  validate(
    refreshSchema
  ),

  asyncHandler(
    refresh
  )
);

router.post(
  "/logout",

  authLimiter,

  validate(
    refreshSchema
  ),

  asyncHandler(
    logout
  )
);

router.get(
  "/me",

  asyncHandler(
    authenticate
  ),

  asyncHandler(
    me
  )
);

export default router;