import { Questions, Quiz } from "@/models/quiz";
import connectMongoDB from "./mongodb";

// Helper to sanitize Mongoose data for Next.js serialization
// Specifically converts ObjectIds to strings and Dates to ISO strings
const sanitizeData = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;

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
      sanitized[key] = sanitizeData(obj[key]);
    }
  }
  return sanitized;
};

export const fetchQuizzes = async () => {
  try {
    await connectMongoDB();
    const quizzes = await Quiz.find().lean();

    return sanitizeData(quizzes);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Quizzes.");
  }
};

export const fetchQuestions = async (id) => {
  try {
    await connectMongoDB();
    const questions = await Questions.find({
      quiz_id: id,
      isUsed: false,
    }).sort({ question_id: 1 }).lean();

    return sanitizeData(questions);
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching answers");
  }
};
