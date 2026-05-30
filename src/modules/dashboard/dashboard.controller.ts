import {
  Request,
  Response
} from "express";

import {
  apiResponse
} from "../../core/responses/apiResponse";

import {
  getWorkspaceDashboard
} from "./dashboard.service";

export const getDashboard =
  async (
    req: Request,
    res: Response
  ) => {

    const dashboard =
      await getWorkspaceDashboard(
        req.workspace!.id
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Dashboard fetched successfully",

      data: dashboard
    });
  };