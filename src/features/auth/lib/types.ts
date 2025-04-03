import { z } from "zod";
import { SessionSchema, signUpSchema } from "./schemas";

export type SignUpFormInputs = z.infer<typeof signUpSchema>;

export type SignUpFormState = {
  inputs: SignUpFormInputs;
  fieldErrors?: Partial<SignUpFormInputs>;
  error?: string;
};

export type SignInFormInputs = Omit<
  SignUpFormInputs,
  "confirmPassword" | "username"
>;

export type SignInFormState = {
  inputs: SignInFormInputs;
  fieldErrors?: Partial<SignInFormInputs>;
  error?: string;
};

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export type SessionSchema = z.infer<typeof SessionSchema>;
