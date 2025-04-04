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
  const [] = useActionState(createPost, initialFormState);
  return (
    <Form
      action={async () => {
        console.log("posted");
      }}
      className="w-full h-fit bg-white rounded-md shadow flex flex-col p-5 gap-5"
    >
      <WritePostHeader />
      <WritePostFooter />
    </Form>
  );
}
