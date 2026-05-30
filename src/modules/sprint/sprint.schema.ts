import { z } from "zod";

export const createSprintSchema =
  z.object({
    name: z
      .string()
      .min(3)
      .max(100),

    startDate: z.coerce.date(),

    endDate: z.coerce.date()
  });