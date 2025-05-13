import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(1, "Bio is required"),
});

export type ProfileInputs = z.infer<typeof profileSchema>;
