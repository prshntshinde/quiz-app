import { clsx, type ClassValue } from "clsx";
import { twMerge as tailwindMerge } from "tailwind-merge";

export function twMerge(...inputs: ClassValue[]): string {
  return tailwindMerge(clsx(inputs));
}

export function sanitizeData(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") return obj;

  if (obj instanceof Date) return obj.toISOString();

  if (Array.isArray(obj)) return obj.map((item) => sanitizeData(item));

  if (
    "toString" in obj &&
    typeof obj.toString === "function" &&
    "constructor" in obj &&
    typeof (obj as { constructor: { name: string } }).constructor === "function" &&
    (obj as { constructor: { name: string } }).constructor.name !== "Object"
  ) {
    const str = obj.toString();
    if (str !== "[object Object]") return str;
  }

  const sanitized: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = (obj as Record<string, unknown>)[key];
      if (
        typeof value !== "function" &&
        key !== "constructor" &&
        key !== "toString"
      ) {
        sanitized[key] = sanitizeData(value);
      }
    }
  }
  return sanitized;
}