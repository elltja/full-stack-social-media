"use server";

import { prisma } from "@/lib/server/prisma";
import { getCurrentUser } from "@/modules/auth/lib/user";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import "server-only";
import { ProfileFormState } from "../lib/types";
import { deleteUploadedFile, uploadFile } from "../lib/uploadFile";
import { validateProfileForm } from "../lib/validateForm";

export async function createProfile(
  _: ProfileFormState,
  formData: unknown
): Promise<ProfileFormState> {
  if (!(formData instanceof FormData)) {
    return { error: "Invalid request", inputs: { bio: "", name: "" } };
  }
  const { inputs, fieldErrors } = validateProfileForm(formData);

  if (fieldErrors) {
    return { inputs, fieldErrors };
  }

  if (fieldErrors) {
    return { inputs, fieldErrors };
  }

  try {
    const currentUser = await getCurrentUser();

    if (currentUser.avatar_url) {
      await deleteUploadedFile(currentUser.avatar_url);
    }

    const file = formData.get("avatar") as unknown;

    const avatarUrl = await uploadAvatarImage(file);

    await updateUserProfile(currentUser.id, {
      name: inputs.name,
      bio: inputs.bio,
      avatarUrl,
    });

    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { inputs, error: "Internal server error" };
  }
}

async function updateUserProfile(
  userId: string,
  data: { name: string; bio: string; avatarUrl: string | null }
) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      bio: data.bio,
      profile_completed: true,
      avatar_url: data.avatarUrl,
    },
  });
}
async function uploadAvatarImage(file: unknown) {
  if (file instanceof File && file.size !== 0) {
    try {
      const publicId = await uploadFile(file);
      return getCloudinaryUrl(publicId);
    } catch (error) {
      console.error(error);
      throw new Error("Error uploading image: " + error);
    }
  }
  return null;
}

function getCloudinaryUrl(publicId: string): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
}
