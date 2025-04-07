import { prisma, SafeUser } from "@/lib/prisma";
import { getUserSession } from "./sessionUtils";
import { cache } from "react";
import { cookies } from "next/headers";

async function _getCurrentUser() {
  const userSession = await getUserSession(await cookies());
  if (!userSession) return null;
  const fullUser = (await prisma.user.findUnique({
    where: { id: userSession.id },
  })) as SafeUser;

  if (!fullUser) return null;

  return fullUser;
}

export async function isAuthenticated(): Promise<boolean> {
  const userSession = await getUserSession(await cookies());

  return !!userSession;
}

export const getCurrentUser = cache(_getCurrentUser);
