import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, { message: "Username is required" })
      .min(3, { message: "Username must be at least 3 characters" })
      .max(30, { message: "Username too long" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
