import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function sanitizeData(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") return obj;

  if (obj instanceof Date) return obj.toISOString();

  if (Array.isArray(obj)) return obj.map((item) => sanitizeData(item));

  const objToString = Object.prototype.toString;
  if (obj.toString !== objToString) {
    try {
      const str = String(obj);
      if (str !== "[object Object]") return str;
    } catch {
    }
  }

  const sanitized: Record<string, unknown> = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
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