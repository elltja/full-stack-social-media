import { z } from "zod";
import { signUpSchema } from "./schemas";

export type SignUpFormInputs = z.infer<typeof signUpSchema>;

export type SignUpFormState = {
  inputs: SignUpFormInputs;
  fieldErrors?: Partial<SignUpFormInputs>;
  error?: string;
};
