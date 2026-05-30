import { AuthenticatedUser }
from "../auth.types";

import { OrganizationMembershipContext }
from "../organization.types";

import { WorkspaceContext }
from "../workspace.types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;

      organization?: OrganizationMembershipContext;

      workspace?: WorkspaceContext;
    }
  }
}

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

export {};