"use server";

import "server-only";
import { prisma } from "@/lib/server/prisma";
import { getCurrentUser } from "@/modules/auth/lib/user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteUploadedFile } from "@/lib/server/cloudinary";
import { POST_IMAGES_FOLDER_NAME } from "../lib/constants";

export async function deletePost(postId: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) {
    console.error("Someone tried deleting a post which doesn't exist");
    return;
  }
  const currentUser = await getCurrentUser();

  if (currentUser.id !== post?.author_id) {
    console.error("A user tried deleting a post which isn't theirs");
    return;
  }
  await deleteImages(post.image_urls);
  await prisma.post.delete({
    where: { id: postId },
  });
  revalidatePath("/");
  redirect("/");
}

async function deleteImages(urls: string[]) {
  urls.forEach(async (url) => {
    await deleteUploadedFile(url, POST_IMAGES_FOLDER_NAME);
  });
}
