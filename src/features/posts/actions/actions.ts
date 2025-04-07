"use server";

import "server-only";
import { prisma, SafeUser } from "@/lib/prisma";
import { CommentFormState, PostFormState } from "../lib/types";
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
  const currentUser = (await getCurrentUser()) as SafeUser;
  console.log(post);
  console.log(currentUser);

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

export async function createComment(
  content: string,
  postId: string
): Promise<CommentFormState> {
  if (content === "") return { text: content };
  const currentUser = await getCurrentUser();

  if (!currentUser) return { error: "Unauthorized", text: content };
  await prisma.comment.create({
    data: {
      content,
      user_id: currentUser?.id,
      post_id: postId,
    },
  });
  revalidatePath(`/post/${postId}`);
  return { text: content };
}
