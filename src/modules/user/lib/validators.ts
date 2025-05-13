import { profileSchema } from "./schemas";

export function validateProfileForm(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    bio: formData.get("bio") as string,
  };

  const parsed = profileSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
    return { inputs: raw, fieldErrors };
  }

  return { inputs: parsed.data };
}
