"use client";

import React, { useActionState } from "react";
import Form from "next/form";
import { signIn } from "../actions/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { parseFormData } from "../lib/formDataParser";
import { SignInFormState } from "../lib/types";
import { LoaderCircle } from "lucide-react";

const initialState: SignInFormState = {
  inputs: {
    email: "",
    password: "",
  },
};

export default function SignInForm() {
  // const [formState, signUpAction] = useActionState(signUp, initialState);

  const [formState, signInAction, isPending] = useActionState(
    parseFormData<SignInFormState>(signIn),
    initialState
  );

  return (
    <Form action={signInAction} className="flex flex-col gap-5">
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
      <Button type="submit" className="cursor-pointer">
        {isPending ? <LoaderCircle className="animate-spin" /> : "Sign In"}
      </Button>
    </Form>
  );
}
