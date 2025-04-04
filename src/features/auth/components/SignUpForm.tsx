"use client";

import React, { useActionState } from "react";
import Form from "next/form";
import { signUp } from "../actions/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { parseFormData } from "@/lib/utils";
import { SignUpFormState } from "../lib/types";
import { LoaderCircle } from "lucide-react";

const initialState: SignUpFormState = {
  inputs: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

export default function SignUpForm() {
  const [formState, signUpAction, isPending] = useActionState(
    parseFormData<SignUpFormState>(signUp),
    initialState
  );

  return (
    <Form action={signUpAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <Label htmlFor="signup-username-input">Unique username</Label>
        <Input
          id="signup-username-input"
          name="username"
          type="text"
          placeholder="Unique username"
          defaultValue={formState.inputs.username}
          aria-invalid={!!formState.fieldErrors?.username}
        />
        {formState.fieldErrors?.username && (
          <p className="text-destructive text-sm">
            {formState.fieldErrors?.username}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="signup-email-input">Email</Label>
        <Input
          aria-invalid={!!formState.fieldErrors?.email}
          type="email"
          name="email"
          id="signup-email-input"
          placeholder="Email"
          defaultValue={formState.inputs.email}
        />
        {formState.fieldErrors?.email && (
          <p className="text-destructive text-sm my-0">
            {formState.fieldErrors?.email}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="signup-password-input">Password</Label>
        <Input
          aria-invalid={!!formState.fieldErrors?.password}
          type="password"
          name="password"
          id="signup-password-input"
          placeholder="••••••••••"
          defaultValue={formState.inputs.password}
        />
        {formState.fieldErrors?.password && (
          <p className="text-destructive text-sm">
            {formState.fieldErrors?.password}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="confirm-password-input">Confirm password</Label>
        <Input
          aria-invalid={!!formState.fieldErrors?.confirmPassword}
          type="password"
          name="confirmPassword"
          id="confirm-password-input"
          placeholder="••••••••••"
          defaultValue={formState.inputs.confirmPassword}
        />
        {formState.fieldErrors?.confirmPassword && (
          <p className="text-destructive text-sm">
            {formState.fieldErrors?.confirmPassword}
          </p>
        )}
      </div>

      <Button type="submit" className="cursor-pointer">
        {isPending ? <LoaderCircle className="animate-spin" /> : "Sign Up"}
      </Button>
    </Form>
  );
}
