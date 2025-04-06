"use server";

import "server-only";
import { prisma } from "@/lib/prisma";
import { PostFormState } from "../lib/types";
import { getCurrentUser } from "@/features/auth/lib/user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(
  state: PostFormState,
  formData: unknown
): Promise<PostFormState> {
  if (!(formData instanceof FormData)) {
    return { error: "Invalid request", text: "" };
  }
  const text = formData.get("text") as string;

  if (typeof text !== "string") {
    return { error: "Invalid request", text: "" };
  }

  if (text === "") return { text: "" };

  const user = await getCurrentUser();

  if (!user) {
    redirect("/accounts/signin");
  }

  await prisma.post.create({
    data: {
      content: text,
      author_id: user.id,
    },
  });
  revalidatePath("/");
  return { text: "" };
}

export async function likePost(postId: string, userId: string) {
  await prisma.like.create({
    data: {
      post_id: postId,
      user_id: userId,
    },
  });
}

export async function unLikePost(postId: string, userId: string) {
  await prisma.like.delete({
    where: {
      user_id_post_id: {
        post_id: postId,
        user_id: userId,
      },
    },
  });
}

export async function savePost(postId: string, userId: string) {
  await prisma.save.create({
    data: {
      post_id: postId,
      user_id: userId,
    },
  });
}

export async function unSavePost(postId: string, userId: string) {
  await prisma.save.delete({
    where: {
      user_id_post_id: {
        post_id: postId,
        user_id: userId,
      },
    },
  });
}
