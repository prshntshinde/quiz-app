import { clsx } from "clsx";
import { twMerge as twMergeOriginal } from "tailwind-merge";

export function twMerge(...args) {
  return twMergeOriginal(clsx(args));
}
