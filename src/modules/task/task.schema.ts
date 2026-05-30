import { z } from "zod";

export const createTaskSchema =
  z.object({
    title: z
      .string()
      .min(3)
      .max(200),

    description: z
      .string()
      .optional(),

    priority: z.enum([
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL"
    ]),

    sprintId: z
      .string()
      .uuid()
      .optional(),

    taskGroupId: z
      .string()
      .uuid(),

    assignedToId: z
      .string()
      .uuid()
      .optional()
  });

export const updateTaskStatusSchema =
  z.object({
    status: z.enum([
      "TODO",
      "IN_PROGRESS",
      "DONE"
    ])
  });

  export const assignTaskSchema = z.object({
  assignedToId: z.string().uuid(),
});

export const moveTaskSchema =
  z.object({
    taskGroupId:
      z.string().uuid()
  });