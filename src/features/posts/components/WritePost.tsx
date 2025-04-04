"use client";

import React, { useActionState } from "react";
import WritePostHeader from "./WritePostHeader";
import WritePostFooter from "./WritePostFooter";
import Form from "next/form";
import { createPost } from "../actions/actions";
import { PostFormState } from "../lib/types";

const initialFormState: PostFormState = {
  text: "",
};

export default function WritePost() {
  const [formState, formAction] = useActionState(createPost, initialFormState);
  return (
    <Form
      action={formAction}
      className="w-full h-fit bg-white rounded-md shadow flex flex-col p-5 gap-5"
    >
      <WritePostHeader
        textContent={formState.text}
        error={formState.error || null}
      />
      <WritePostFooter />
    </Form>
  );
}
