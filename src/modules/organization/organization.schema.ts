import { z }
from "zod";

export const createOrganizationSchema =
  z.object({

    name: z
      .string()
      .min(3)
      .max(100),

    slug: z
      .string()
      .min(3)
      .max(50)
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must contain only lowercase letters, numbers and hyphens"
      )
  });

  import { OrganizationRole } from "@prisma/client";

export const addMemberSchema =
  z.object({
    email: z
      .string()
      .email(),

    role: z.nativeEnum(
      OrganizationRole
    )
  });