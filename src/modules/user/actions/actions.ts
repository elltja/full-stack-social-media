"use server";

import { prisma } from "@/lib/server/prisma";
import { getCurrentUser } from "@/modules/auth/lib/user";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import "server-only";
import { ProfileFormState } from "../lib/types";

export async function createProfile(
  _: ProfileFormState,
  formData: unknown
): Promise<ProfileFormState> {
  if (!(formData instanceof FormData)) {
    return { error: "Invalid request", inputs: { bio: "", name: "" } };
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const inputs = {
    name,
    bio,
  };
  const fieldErrors: ProfileFormState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Name is required";
  if (!bio) fieldErrors.bio = "Bio is required";

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors, inputs };

  try {
    const currentUser = await getCurrentUser();

    await prisma.user.update({
      where: { id: currentUser?.id },
      data: {
        name,
        bio,
        profile_completed: true,
      },
    });

    // TODO: File upload

    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { inputs, error: "Internal server error" };
  }
}

export async function followUser(userId: string) {
  const currentUser = await getCurrentUser();
  await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      following: {
        connect: {
          id: userId,
        },
      },
    },
  });
  revalidatePath("/");
}

export async function getUserFollowing(currentUserId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
    select: {
      following: {
        select: {
          id: true,
        },
      },
    },
  });
  const followers = user?.following;
  return followers ?? [];
}
