import { env } from "@/env";
import { Redis } from "@upstash/redis";
import "server-only";

export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});
