import {
  NextFunction,
  Request,
  Response
} from "express";

import { OrganizationRole }
from "@prisma/client";

import {
  ForbiddenError
} from "../errors/ForbiddenError";

export const requireOrganizationRole =
  (
    allowedRoles: OrganizationRole[]
  ) => {

    return (
      req: Request,
      _: Response,
      next: NextFunction
    ) => {

      if (!req.organization) {

        throw new ForbiddenError(
          "Organization context missing"
        );
      }

      if (
        !allowedRoles.includes(
          req.organization.role
        )
      ) {

        throw new ForbiddenError(
          "Insufficient permissions"
        );
      }

      next();
    };
  };