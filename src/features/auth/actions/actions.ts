"use server";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "../lib/schemas";
import type {
  ProfileFormState,
  SignInFormInputs,
  SignInFormState,
  SignUpFormInputs,
  SignUpFormState,
} from "../lib/types";
import { comparePasswords, generateSalt, hashPassword } from "../lib/password";
import { createUserSession } from "../lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";
import { getCurrentUser } from "../lib/user";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { COOKIE_SESSION_KEY } from "../lib/constants";
import { redis } from "@/lib/redis";

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

  try {
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

    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { inputs, error: "Internal server error" };
  }
}

export async function signIn({
  email,
  password,
}: SignInFormInputs): Promise<SignInFormState> {
  const inputs = {
    email,
    password,
  };

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      omit: {
        password: false,
        salt: false,
      },
    });

    if (!user) {
      return { fieldErrors: { email: "User does not exist" }, inputs };
    }

    const isCorrectPassword = comparePasswords({
      hashedPassword: user?.password,
      salt: user?.salt,
      password,
    });

    if (!isCorrectPassword) {
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

export async function createProfile(
  state: ProfileFormState,
  formData: unknown
): Promise<ProfileFormState> {
  if (!(formData instanceof FormData)) {
    return { error: "Invalid request", inputs: { bio: "", name: "" } };
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const inputs = {
    name,
    bio,
  };
  const fieldErrors: ProfileFormState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Name is required";
  if (!bio) fieldErrors.bio = "Bio is required";

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors, inputs };

  try {
    const user = await getCurrentUser();

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        name,
        bio,
        profile_completed: true,
      },
    });

    // TODO: File upload

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
