import { OrganizationRole } from "@prisma/client";

import {
  ConflictError
} from "../../core/errors/ConflictError";

import {
  NotFoundError
} from "../../core/errors/NotFoundError";

import {
  createOrganizationWithOwner,
  findOrganizationBySlug,
  findOrganizationsByUserId,
  findOrganizationMembers,
  findUserByEmail,
  findExistingMembership,
  createMembership
} from "./organization.repository";

export const createOrganization =
  async (
    userId: string,
    name: string,
    slug: string
  ) => {

    const existingOrganization =
      await findOrganizationBySlug(
        slug
      );

    if (existingOrganization) {

      throw new ConflictError(
        "Organization slug already exists"
      );
    }

    const organization =
      await createOrganizationWithOwner(
        userId,
        name,
        slug
      );

    return organization;
  };

  export const getMyOrganizations =
  async (
    userId: string
  ) => {

    const memberships =
      await findOrganizationsByUserId(
        userId
      );

    return memberships.map(
      (membership) => ({
        role: membership.role,

        organization: {
          id: membership.organization.id,

          name:
            membership.organization.name,

          slug:
            membership.organization.slug,

          createdAt:
            membership.organization.createdAt
        }
      })
    );
  };

  export const getOrganizationMembers =
  async (
    organizationId: string
  ) => {

    const members =
      await findOrganizationMembers(
        organizationId
      );

    return members.map(
      (member) => ({
        role: member.role,

        joinedAt:
          member.createdAt,

        user: {
          id:
            member.user.id,

          fullName:
            member.user.fullName,

          email:
            member.user.email
        }
      })
    );
  };

  export const addMember =
  async (
    email: string,
    role: OrganizationRole,
    organizationId: string
  ) => {

    const user =
      await findUserByEmail(
        email
      );

    if (!user) {

      throw new NotFoundError(
        "User not found"
      );
    }

    const existingMembership =
      await findExistingMembership(
        user.id,
        organizationId
      );

    if (existingMembership) {

      throw new ConflictError(
        "User already belongs to organization"
      );
    }

    const membership =
      await createMembership(
        user.id,
        organizationId,
        role
      );

    return {
      role:
        membership.role,

      user:
        membership.user
    };
  };