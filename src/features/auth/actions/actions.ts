"use server";

import { signUpSchema } from "../lib/schemas";
import { SignUpFormInputs, SignUpFormState } from "../lib/types";

export async function signUp({
  username,
  email,
  password,
  confirmPassword,
}: SignUpFormInputs): Promise<SignUpFormState> {
  const inputs = {
    username,
    email,
    password,
    confirmPassword,
  };

  const results = signUpSchema.safeParse(inputs);
  const errors = results.error?.format();

  if (!results.success) {
    return {
      fieldErrors: {
        username: errors?.username?._errors[0],
        email: errors?.email?._errors[0],
        password: errors?.password?._errors[0],
        confirmPassword: errors?.confirmPassword?._errors[0],
      },
      inputs,
    };
  }

  return { inputs };
}
