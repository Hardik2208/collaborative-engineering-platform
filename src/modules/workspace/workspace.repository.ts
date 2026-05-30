import { prisma }
from "../../shared/prisma/prisma.service";

export const createWorkspace =
  async (
    organizationId: string,
    name: string,
    slug: string,
    creatorUserId: string
  ) => {

    return prisma.$transaction(
      async (tx) => {

        const workspace =
          await tx.workspace.create({
            data: {
              organizationId,
              name,
              slug
            }
          });

        await tx.workspaceMember.create({
          data: {
            userId: creatorUserId,
            workspaceId: workspace.id
          }
        });

        return workspace;
      }
    );
  };

export const findWorkspacesByOrganization =
  async (
    organizationId: string
  ) => {

    return prisma.workspace.findMany({
      where: {
        organizationId
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  };

export const findWorkspaceBySlug =
  async (
    organizationId: string,
    workspaceSlug: string
  ) => {

    return prisma.workspace.findFirst({
      where: {
        organizationId,
        slug: workspaceSlug
      }
    });
  };