import { redis } from "@/lib/server/redis";
import { Cookies, SessionSchema } from "./types";
import { COOKIE_SESSION_KEY } from "./constants";

export async function getUserSession(cookies: Pick<Cookies, "get">) {
  try {
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
    if (!sessionId) return null;
    const userSession = await getSessionById(sessionId);
    return userSession ?? null;
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
}

async function getSessionById(sessionId: string) {
  return (await redis.get(`session:${sessionId}`)) as SessionSchema;
}
