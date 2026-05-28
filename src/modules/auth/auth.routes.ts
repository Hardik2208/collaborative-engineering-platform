import { Router }
from "express";

import {
  login,
  me,
  register
} from "./auth.controller";

import {
  loginSchema,
  registerSchema
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

router.get(
  "/me",

  asyncHandler(authenticate),

  asyncHandler(me)
);

export default router;