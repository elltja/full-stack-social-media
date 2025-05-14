"use server";

import { prisma } from "@/lib/server/prisma";
import { revalidatePath } from "next/cache";
import "server-only";

export async function savePost(postId: string, userId: string) {
  try {
    await prisma.save.create({
      data: {
        post_id: postId,
        user_id: userId,
      },
    });
    revalidatePath("/saves");
  } catch (error) {
    console.error("Error saving post:", error);
    throw new Error("Failed to save the post. Please try again later.");
  }
}

export async function unSavePost(postId: string, userId: string) {
  try {
    await prisma.save.delete({
      where: {
        user_id_post_id: {
          post_id: postId,
          user_id: userId,
        },
      },
    });
    revalidatePath("/saves");
  } catch (error) {
    console.error("Error unsaving post: ", error);
    throw new Error("Failed to unsave the post. Please try again later");
  }
}
