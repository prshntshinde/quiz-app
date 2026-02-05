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
  if (obj.toString && typeof obj.toString === "function" && obj.constructor.name !== "Object") {
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
