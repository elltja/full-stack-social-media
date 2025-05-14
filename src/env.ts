import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL."),

    UPSTASH_REDIS_REST_URL: z
      .string()
      .min(1, "UPSTASH_REDIS_REST_URL is required."),
    UPSTASH_REDIS_REST_TOKEN: z
      .string()
      .min(1, "UPSTASH_REDIS_REST_TOKEN is required."),

    CLOUDINARY_CLOUD_NAME: z
      .string()
      .min(1, "CLOUDINARY_CLOUD_NAME is required."),
    CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required."),
    CLOUDINARY_API_SECRET: z
      .string()
      .min(1, "CLOUDINARY_API_SECRET is required."),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z
      .string()
      .url("NEXT_PUBLIC_BASE_URL must be a valid URL."),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
