import {
  NextFunction,
  Request,
  Response
} from "express";

import {
  ForbiddenError
} from "../errors/ForbiddenError";

import {
  findOrganizationMembership
} from "../../modules/organization/organization.repository";

export const requireOrganizationAccess =
  async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {

    const slug =
      String(req.params.slug);

    const membership =
      await findOrganizationMembership(
        req.user!.id,
        slug
      );

    if (!membership) {

      throw new ForbiddenError(
        "Access denied to organization"
      );
    }

    req.organization = {
      organizationId:
        membership.organization.id,

      organizationSlug:
        membership.organization.slug,

      role:
        membership.role
    };

    next();
  };