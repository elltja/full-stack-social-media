export type ProfileInputs = {
  name: string;
  bio: string;
};

export type ProfileFormState = {
  inputs: ProfileInputs;
  fieldErrors?: Partial<ProfileInputs>;
  error?: string;
};
