import {
  Request,
  Response
} from "express";

import {
  apiResponse
} from "../../core/responses/apiResponse";

import {
  getWorkspaceActivity
} from "./activity.service";

export const getActivity =
  async (
    req: Request,
    res: Response
  ) => {

    const activity =
      await getWorkspaceActivity(
        req.workspace!.workspaceId
      );

    return apiResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Activity fetched successfully",
      data: activity
    });
  };