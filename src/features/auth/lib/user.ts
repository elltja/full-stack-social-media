import { prisma, PublicUser } from "@/lib/server/prisma";
import { getUserSession } from "./sessionUtils";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function _getCurrentUser() {
  const userSession = await getUserSession(await cookies());
  if (!userSession) redirect("/accounts/login");
  const user = await prisma.user.findUnique({
    where: { id: userSession.id },
  });

  if (!user) redirect("/accounts/login");

  return user as PublicUser;
}

export async function isAuthenticated(): Promise<boolean> {
  const userSession = await getUserSession(await cookies());

  return !!userSession;
}

export const getCurrentUser = cache(_getCurrentUser);
