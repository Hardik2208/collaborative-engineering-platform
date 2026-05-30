import {
  NextFunction,
  Request,
  Response
} from "express";

import {
  ForbiddenError
} from "../errors/ForbiddenError";

import {
  findWorkspaceBySlug
} from "../../modules/workspace/workspace.repository";

export const requireWorkspaceAccess =
  async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {

    const workspaceSlug =
      req.params.workspaceSlug;

    if (
      !workspaceSlug ||
      Array.isArray(workspaceSlug)
    ) {

      throw new ForbiddenError(
        "Invalid workspace slug"
      );
    }

    const workspace =
      await findWorkspaceBySlug(
        req.organization!.organizationId,
        workspaceSlug
      );

    if (!workspace) {

      throw new ForbiddenError(
        "Workspace not found"
      );
    }

    req.workspace = {
      workspaceId:
        workspace.id,

      workspaceSlug:
        workspace.slug,

      workspaceName:
        workspace.name
    };

    next();
  };