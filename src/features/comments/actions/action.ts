"use server";

import { getCurrentUser } from "@/features/auth/lib/user";
import { prisma } from "@/lib/server/prisma";
import { revalidatePath } from "next/cache";
import "server-only";
import { CommentFormState } from "../lib/types";

export async function createComment(
  content: string,
  postId: string
): Promise<CommentFormState> {
  if (content === "") return { text: content };
  const currentUser = await getCurrentUser();

  await prisma.comment.create({
    data: {
      content,
      user_id: currentUser?.id,
      post_id: postId,
    },
  });
  revalidatePath(`/post/${postId}`);
  return { text: "" };
}
