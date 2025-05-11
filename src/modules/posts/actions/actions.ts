"use server";

import "server-only";
import { prisma } from "@/lib/server/prisma";
import { PostFormState } from "../lib/types";
import { getCurrentUser } from "@/modules/auth/lib/user";
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

  const currentUser = await getCurrentUser();

  await prisma.post.create({
    data: {
      content: text,
      author_id: currentUser.id,
    },
  });
  revalidatePath("/");
  return { text: "" };
}

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
  await prisma.post.delete({
    where: { id: postId },
  });
  revalidatePath("/");
  redirect("/");
}
