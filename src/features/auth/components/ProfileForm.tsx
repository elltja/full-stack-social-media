"use client";

import React, { useActionState } from "react";
import ProfilePictureUpload from "../../posts/components/ProfilePictureUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProfileFormState } from "../lib/types";
import { createProfile } from "../actions/actions";
import Form from "next/form";
import { useAuth } from "@/providers/AuthProvider";
import { SafeUser } from "@/lib/prisma";

export default function ProfileForm() {
  const user = useAuth() as SafeUser;

  const initialState: ProfileFormState = {
    inputs: {
      name: user.name || "",
      bio: user.bio || "",
    },
  };
  const [formState, formAction] = useActionState(createProfile, initialState);
  return (
    <>
      <Form action={formAction} className="w-full h-fit flex flex-col gap-5">
        <ProfilePictureUpload />

        <div className="flex flex-col gap-1">
          <Label>Full name</Label>
          <Input
            aria-invalid={!!formState.fieldErrors?.name}
            placeholder="John Doe"
            name="name"
            defaultValue={formState.inputs.name}
          />
          {formState.fieldErrors?.name && (
            <p className="text-destructive">{formState.fieldErrors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Bio</Label>
          <Textarea
            aria-invalid={!!formState.fieldErrors?.bio}
            className="resize-none field-sizing-content max-h-96"
            placeholder="Describe your profile"
            defaultValue={formState.inputs.bio}
            name="bio"
          />
          {formState.fieldErrors?.bio && (
            <p className="text-destructive">{formState.fieldErrors.bio}</p>
          )}
        </div>

        <Button type="submit" className="cursor-pointer">
          Save and Continue
        </Button>
      </Form>
    </>
  );
}
