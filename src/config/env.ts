import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),

  NODE_ENV: z.enum([
    "development",
    "production",
    "test"
  ]),

  DATABASE_URL: z.string(),

  JWT_SECRET: z.string(),

  JWT_EXPIRES_IN: z.string()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors
  );

  process.exit(1);
}

export const env = parsedEnv.data;