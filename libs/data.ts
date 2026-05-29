import { Questions, Quiz } from "@/models/quiz";
import connectMongoDB from "./mongodb";
import { sanitizeData } from "@/lib/utils";

export async function fetchQuizzes() {
  try {
    await connectMongoDB();
    const quizzes = await Quiz.find({
    $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
  }).select("_id title description isComplete isActive").lean();

    return sanitizeData(quizzes);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Quizzes.");
  }
}

export async function fetchQuestions(id: string) {
  try {
    await connectMongoDB();
    const questions = await Questions.find({
      quiz_id: id,
      isUsed: false,
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    })
      .sort({ question_id: 1 })
      .lean();

    return sanitizeData(questions);
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching questions");
  }
}