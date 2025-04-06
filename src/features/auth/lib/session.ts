import { redis } from "@/lib/redis";
import { Cookies } from "./types";
import { SafeUser } from "@/lib/prisma";
import crypto from "crypto";
import { COOKIE_SESSION_KEY, SESSION_EXPIRATION_SECONDS } from "./constants";

export async function createUserSession(
  user: SafeUser,
  cookies: Pick<Cookies, "set">
) {
  try {
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();

    await redis.set(
      `session:${sessionId}`,
      { id: user.id },
      {
        ex: SESSION_EXPIRATION_SECONDS,
      }
    );
    setCookie(sessionId, cookies);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}
