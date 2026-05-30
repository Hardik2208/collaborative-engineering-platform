import {
  ConflictError
} from "../../core/errors/ConflictError";

import {
  createWorkspace,
  findWorkspaceBySlug,
  findWorkspacesByOrganization
} from "./workspace.repository";

export const createWorkspaceService =
  async (
    organizationId: string,
    creatorUserId: string,
    name: string,
    slug: string
  ) => {

    const existingWorkspace =
      await findWorkspaceBySlug(
        organizationId,
        slug
      );

    if (existingWorkspace) {

      throw new ConflictError(
        "Workspace slug already exists"
      );
    }

    return createWorkspace(
      organizationId,
      name,
      slug,
      creatorUserId
    );
  };

export const getOrganizationWorkspaces =
  async (
    organizationId: string
  ) => {

    return findWorkspacesByOrganization(
      organizationId
    );
  };