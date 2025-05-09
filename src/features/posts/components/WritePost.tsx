"use client";

import React, { useActionState } from "react";
import Form from "next/form";
import { createPost } from "../actions/actions";
import { PostFormState } from "../lib/types";
import ProfilePicture from "@/components/ProfilePicture";
import { LoaderCircle, MapPin, Upload } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const initialFormState: PostFormState = {
  text: "",
};

export default function WritePost() {
  const user = useAuth();

  const [formState, formAction, isPending] = useActionState(
    createPost,
    initialFormState
  );
  return (
    <Form
      action={formAction}
      className="w-full h-fit bg-white rounded-md shadow flex flex-col p-5 gap-5"
    >
      <div className="w-full flex gap-3 items-start">
        <div className="h-fit w-fit my-1">
          <ProfilePicture
            src={user?.avatar_url ?? ""}
            name={user?.name || ""}
            username={user.account_name}
          />
        </div>
        <div className="flex flex-col w-full">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 h-fit field-sizing-content max-h-96 py-2 px-4 outline-none bg-gray-100 rounded-lg resize-none"
            name="text"
            defaultValue={formState.text}
          />
          {formState.error && (
            <p className="text-destructive">{formState.error}</p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 text-gray-400 *:cursor-pointer">
          <ImageUploader />
          <Upload />
          <MapPin />
        </div>
        <Button className="cursor-pointer w-[5em]">
          {isPending ? <LoaderCircle className="animate-spin" /> : "Post"}
        </Button>
      </div>
    </Form>
  );
}
