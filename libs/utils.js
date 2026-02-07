import { clsx } from "clsx";
import { twMerge as tailwindMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes using clsx and tailwind-merge.
 * @param {...any} inputs - Class names or objects.
 * @returns {string} - Merged class names.
 */
export function twMerge(...inputs) {
  return tailwindMerge(clsx(inputs));
}

/**
 * Sanitizes data for Next.js serialization by converting complex types (Dates, ObjectIds)
 * into plain JavaScript primitives.
 * 
 * @param {any} obj - The object or array to sanitize.
 * @returns {any} - The sanitized data.
 */
export const sanitizeData = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;

  // Handle Dates
  if (obj instanceof Date) return obj.toISOString();

  // Handle Arrays
  if (Array.isArray(obj)) return obj.map(sanitizeData);

  // Handle Mongoose ObjectIds or similar BSON types
  // Even with .lean(), _id is often an object with a toString() method
  if (
    obj.toString &&
    typeof obj.toString === "function" &&
    typeof obj.constructor === "function" &&
    obj.constructor.name !== "Object"
  ) {
    const s = obj.toString();
    if (s !== "[object Object]") return s;
  }

  // Handle Regular Objects
  const sanitized = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value !== "function" && key !== "constructor" && key !== "toString") {
        sanitized[key] = sanitizeData(value);
      }
    }
  }
  return sanitized;
};
