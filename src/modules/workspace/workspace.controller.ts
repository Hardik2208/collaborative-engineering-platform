import {
  Request,
  Response
} from "express";

import {
  apiResponse
} from "../../core/responses/apiResponse";

import {
  createWorkspaceService,
  getOrganizationWorkspaces
} from "./workspace.service";

export const createWorkspace =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      name,
      slug
    } = req.body;

    const workspace =
      await createWorkspaceService(
        req.organization!
          .organizationId,

        req.user!.id,

        name,

        slug
      );

    return apiResponse(res, {
      success: true,

      statusCode: 201,

      message:
        "Workspace created successfully",

      data: workspace
    });
  };

export const getWorkspaces =
  async (
    req: Request,
    res: Response
  ) => {

    const workspaces =
      await getOrganizationWorkspaces(
        req.organization!
          .organizationId
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Workspaces fetched successfully",

      data: workspaces
    });
  };

export const getWorkspace =
  async (
    req: Request,
    res: Response
  ) => {

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Workspace fetched successfully",

      data: req.workspace
    });
  };