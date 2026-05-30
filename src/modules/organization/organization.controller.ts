import {
  Request,
  Response
} from "express";

import {
  apiResponse
} from "../../core/responses/apiResponse";

import {
  createOrganization
} from "./organization.service";

import {
  getMyOrganizations
} from "./organization.service";

import {
  getOrganizationMembers
} from "./organization.service";

import {
  addMember
} from "./organization.service";

export const create =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      name,
      slug
    } = req.body;

    const organization =
      await createOrganization(
        req.user!.id,
        name,
        slug
      );

    return apiResponse(res, {
      success: true,

      statusCode: 201,

      message:
        "Organization created successfully",

      data: organization
    });
  };

  export const getMine =
  async (
    req: Request,
    res: Response
  ) => {

    const organizations =
      await getMyOrganizations(
        req.user!.id
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Organizations fetched successfully",

      data: organizations
    });
  };

  export const getBySlug =
  async (
    req: Request,
    res: Response
  ) => {

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Organization fetched successfully",

      data: req.organization
    });
  };

  export const getMembers =
  async (
    req: Request,
    res: Response
  ) => {

    const members =
      await getOrganizationMembers(
        req.organization!
          .organizationId
      );

    return apiResponse(res, {
      success: true,

      statusCode: 200,

      message:
        "Organization members fetched successfully",

      data: members
    });
  };

  export const inviteMember =
  async (
    req: Request,
    res: Response
  ) => {

    const {
      email,
      role
    } = req.body;

    const member =
      await addMember(
        email,
        role,
        req.organization!
          .organizationId
      );

    return apiResponse(res, {
      success: true,

      statusCode: 201,

      message:
        "Member added successfully",

      data: member
    });
  };