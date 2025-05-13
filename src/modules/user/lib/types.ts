export type ProfileInputs = {
  name: string;
  bio: string;
};

type ProfileFieldErrors = Partial<ProfileInputs> & { avatar?: string };

export type ProfileFormState = {
  inputs: ProfileInputs;
  fieldErrors?: ProfileFieldErrors;
  error?: string;
};
