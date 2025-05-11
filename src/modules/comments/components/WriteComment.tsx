"use client";

import React, { useActionState } from "react";
import Form from "next/form";
import { createComment } from "../actions/action";
import { CommentFormState } from "../lib/types";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialFormState: CommentFormState = {
  text: "",
};

export default function WriteComment({ postId }: { postId: string }) {
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) =>
      await createComment(formData.get("text") as string, postId),
    initialFormState
  );
  return (
    <Form
      action={formAction}
      className="w-full h-fit bg-white rounded-md shadow flex flex-col p-5 gap-5"
    >
      <textarea
        placeholder="Write a comment"
        className="flex-1 h-[30px] field-sizing-content max-h-96 py-2 px-4 outline-none bg-gray-100 rounded-lg resize-none w-full"
        name="text"
        defaultValue={formState.text}
      />
      <Button className="cursor-pointer w-[7em]">
        {isPending ? <LoaderCircle className="animate-spin" /> : "Comment"}
      </Button>
    </Form>
  );
}
