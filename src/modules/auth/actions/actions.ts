"use server";

import { prisma } from "@/lib/server/prisma";
import type {
  SignInFormState,
  SignUpFormInputs,
  SignUpFormState,
} from "../lib/types";
import { comparePasswords, generateSalt, hashPassword } from "../lib/password";
import { createUserSession } from "../lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { COOKIE_SESSION_KEY } from "../lib/constants";
import { redis } from "@/lib/server/redis";
import { validateSignInForm, validateSignUpForm } from "../lib/validators";

export async function signUp(
  _: SignUpFormState,
  formData: unknown
): Promise<SignUpFormState> {
  if (!(formData instanceof FormData)) {
    return {
      error: "Invalid request",
      inputs: { username: "", email: "", password: "", confirmPassword: "" },
    };
  }
  const { inputs, fieldErrors } = validateSignUpForm(formData);

  if (fieldErrors) {
    return {
      fieldErrors,
      inputs,
    };
  }

  try {
    const [existingUsername, existingEmail] = await Promise.all([
      prisma.user.findUnique({ where: { account_name: inputs.username } }),
      prisma.user.findUnique({ where: { email: inputs.email } }),
    ]);

    const fieldErrors: Partial<SignUpFormInputs> = {};

    if (existingUsername) fieldErrors.username = "Username is already taken";
    if (existingEmail)
      fieldErrors.email = "An account with this email already exists";

    if (Object.keys(fieldErrors).length > 0) {
      return { fieldErrors, inputs };
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(inputs.password, salt);
    const user = await prisma.user.create({
      data: {
        account_name: inputs.username,
        email: inputs.email,
        password: hashedPassword,
        salt,
      },
    });

    await createUserSession(user, await cookies());

    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { inputs, error: "Internal server error" };
  }
}

export async function signIn(
  _: SignInFormState,
  formData: unknown
): Promise<SignInFormState> {
  if (!(formData instanceof FormData)) {
    return {
      error: "Invalid request",
      inputs: { email: "", password: "" },
    };
  }

  const { inputs, fieldErrors } = validateSignInForm(formData);

  if (fieldErrors) return { fieldErrors, inputs };

  try {
    const user = await prisma.user.findUnique({
      where: { email: inputs.email },
      omit: {
        password: false,
        salt: false,
      },
    });

    if (!user) {
      return { fieldErrors: { email: "User does not exist" }, inputs };
    }

    const isCorrectPassword = await comparePasswords({
      hashedPassword: user?.password,
      salt: user?.salt,
      password: inputs.password,
    });

    if (isCorrectPassword !== true) {
      return { fieldErrors: { password: "Incorrect password" }, inputs };
    }

    await createUserSession(user, await cookies());

    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return { inputs, error: "Internal server error" };
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_SESSION_KEY)?.value;

  if (sessionId == null) return null;

  await redis.del(`session:${sessionId}`);
  cookieStore.delete(COOKIE_SESSION_KEY);

  redirect("/accounts/signin");
}
