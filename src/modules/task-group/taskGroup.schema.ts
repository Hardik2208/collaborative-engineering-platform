import { z }
from "zod";

export const createTaskGroupSchema =
  z.object({
    name: z
      .string()
      .min(2)
      .max(100)
  });