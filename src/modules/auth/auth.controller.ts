import {
  Request,
  Response
} from "express";

import {
  loginUser,
  registerUser,
  logoutUser
} from "./auth.service";

import {
  apiResponse
} from "../../core/responses/apiResponse";

import {
  refreshAccessToken
} from "./auth.service";

export const register =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      fullName,
      email,
      password
    } = req.body;

    const result =
      await registerUser(
        fullName,
        email,
        password
      );

    return apiResponse(res, {
      success: true,

      statusCode: 201,

      message:
        "User registered successfully",

      data: result
    });
  };

export const login =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      email,
      password
    } = req.body;

    const result =
      await loginUser(
        email,
        password
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "User logged in successfully",

      data: result
    });
  };

export const me =
  async (
    req: Request,
    res: Response
  ) => {

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Current user fetched",

      data: req.user
    });
  };

  export const refresh =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      refreshToken
    } = req.body;

    const result =
      await refreshAccessToken(
        refreshToken
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Token refreshed successfully",

      data: result
    });
  };

  export const logout =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      refreshToken
    } = req.body;

    await logoutUser(
      refreshToken
    );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Logged out successfully"
    });
  };