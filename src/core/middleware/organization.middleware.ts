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

interface OrganizationParams {
  slug: string;
}

export const requireOrganizationAccess =
  async (
    req: Request<OrganizationParams>,
    _: Response,
    next: NextFunction
  ) => {

    const slug =
      req.params.slug;

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