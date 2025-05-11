"use server";

import { prisma } from "@/lib/server/prisma";
import "server-only";

export async function likePost(postId: string, userId: string) {
  try {
    await prisma.like.create({
      data: {
        post_id: postId,
        user_id: userId,
      },
    });
  } catch (error) {
    console.error("Error liking post:", error);
    throw new Error("Failed to like the post. Please try again later.");
  }
}

export async function unLikePost(postId: string, userId: string) {
  try {
    await prisma.like.delete({
      where: {
        user_id_post_id: {
          post_id: postId,
          user_id: userId,
        },
      },
    });
  } catch (error) {
    console.error("Error unliking post: ", error);
    throw new Error("Failed to like the post. Please try again later");
  }
}
