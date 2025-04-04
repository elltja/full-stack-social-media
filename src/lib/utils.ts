import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseFormData =
  <T extends { inputs: Record<string, string> }>(
    action: (data: T["inputs"]) => T | Promise<T>
  ) =>
  async (state: T, formData: unknown): Promise<T> => {
    if (!(formData instanceof FormData)) {
      return { ...state, error: "Invalid request" } as T;
    }

    const data = Object.fromEntries(formData.entries()) as T["inputs"];

    return action(data);
  };
