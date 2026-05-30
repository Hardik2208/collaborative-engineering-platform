import { OrganizationRole }
from "@prisma/client";

export interface OrganizationMembershipContext {
  organizationId: string;

  organizationSlug: string;

  role: OrganizationRole;
}