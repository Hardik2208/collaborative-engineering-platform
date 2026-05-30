import { prisma }
from "../../shared/prisma/prisma.service";

export const findWorkspaceMembership =
  async (
    userId: string,
    workspaceId: string
  ) => {

    return prisma.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId
        }
      }
    });
  };