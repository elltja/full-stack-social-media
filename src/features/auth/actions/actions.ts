"use server";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "../lib/schemas";
import {
  SignInFormInputs,
  SignUpFormInputs,
  SignUpFormState,
} from "../lib/types";
import { generateSalt, hashPassword } from "../lib/password";
import { createUserSession } from "../lib/session";
import { cookies } from "next/headers";

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

  const [existingUsername, existingEmail] = await Promise.all([
    prisma.user.findUnique({ where: { account_name: username } }),
    prisma.user.findUnique({ where: { email } }),
  ]);

  const fieldErrors: Partial<SignUpFormInputs> = {};

  if (existingUsername) fieldErrors.username = "Username is already taken";
  if (existingEmail)
    fieldErrors.email = "An account with this email already exists";

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, inputs };
  }

  const salt = generateSalt();
  const hashedPassword = await hashPassword(password, salt);
  const user = await prisma.user.create({
    data: {
      account_name: username,
      email,
      password: hashedPassword,
      salt,
    },
  });

  await createUserSession(user, await cookies());

  return { inputs };
}

export async function signIn({ email, password }: SignInFormInputs) {
  // TODO
}
