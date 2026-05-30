import { prisma }
from "../../shared/prisma/prisma.service";

import { OrganizationRole } from "@prisma/client";

export const findOrganizationBySlug =
  async (
    slug: string
  ) => {

    return prisma.organization.findUnique({
      where: {
        slug
      }
    });
  };

export const createOrganizationWithOwner =
  async (
    userId: string,
    name: string,
    slug: string
  ) => {

    return prisma.$transaction(
      async (tx) => {

        const organization =
          await tx.organization.create({
            data: {
              name,
              slug
            }
          });

        await tx.organizationMember.create({
          data: {
            userId,

            organizationId:
              organization.id,

            role: "OWNER"
          }
        });

        return organization;
      }
    );
  };

  export const findOrganizationsByUserId =
  async (
    userId: string
  ) => {

    return prisma.organizationMember.findMany({
      where: {
        userId
      },

      include: {
        organization: true
      }
    });
  };

  export const findOrganizationMembership =
  async (
    userId: string,
    slug: string
  ) => {

    return prisma.organizationMember.findFirst({
      where: {
        userId,

        organization: {
          slug
        }
      },

      include: {
        organization: true
      }
    });
  };

  export const findOrganizationMembers =
  async (
    organizationId: string
  ) => {

    return prisma.organizationMember.findMany({
      where: {
        organizationId
      },

      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            createdAt: true
          }
        }
      }
    });
  };

  export const findUserByEmail =
  async (
    email: string
  ) => {

    return prisma.user.findUnique({
      where: {
        email
      }
    });
  };

  export const findExistingMembership =
  async (
    userId: string,
    organizationId: string
  ) => {

    return prisma.organizationMember.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId
        }
      }
    });
  };

  export const createMembership =
  async (
    userId: string,
    organizationId: string,
    role: OrganizationRole
  ) => {

    return prisma.organizationMember.create({
      data: {
        userId,
        organizationId,
        role
      },

      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true
          }
        }
      }
    });
  };