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

    const {
      page = "1",
      limit = "20"
    } = req.query;

    const activity =
      await getWorkspaceActivity(
        req.workspace!.workspaceId,

        Number(page),

        Number(limit)
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Activity fetched successfully",

      data: activity
    });
  };