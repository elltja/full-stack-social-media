"use server";
import "server-only";

import { prisma } from "@/lib/prisma";
import { PostFormState } from "../lib/types";
import { getCurrentUser } from "@/features/auth/lib/user";
import { redirect } from "next/navigation";

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

  return { text: "" };
}
