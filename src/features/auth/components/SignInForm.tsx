import React, { useActionState } from "react";
import Form from "next/form";
import { signUp } from "../actions/actions";
import { Input } from "@/components/ui/input";

type SignUpFormState = {
  errors?: {
    email?: string;
    password?: string;
  };
};

const initialState: SignUpFormState = {};

export default function SignUpForm() {
  const [formState, signUpAction] = useActionState<SignUpFormState>(
    signUp,
    initialState
  );

  return (
    <Form action={signUpAction}>
      <div>
        <Input />
        {formState.errors?.email && <p>{formState.errors?.email}</p>}
      </div>
    </Form>
  );
}
