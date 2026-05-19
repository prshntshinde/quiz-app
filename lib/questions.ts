import connectMongoDB from "@/libs/mongodb";
import { Questions } from "@/models/quiz";
import mongoose from "mongoose";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

interface QuestionResult {
  _id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: number;
  explanation: string;
  quiz_id: string;
  question_id: number;
  isUsed: boolean;
}

interface GetAllQuestionsResult {
  questions: QuestionResult[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getAllQuestions(
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): Promise<GetAllQuestionsResult> {
  try {
    await connectMongoDB();
    const query = {
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };

    const skip = (page - 1) * limit;
    const [questions, total] = await Promise.all([
      Questions.find(query).skip(skip).limit(limit).lean(),
      Questions.countDocuments(query),
    ]);

    return {
      questions: questions.map((q) => ({
        _id: String(q._id),
        question: q.question,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        answer: q.answer,
        explanation: q.explanation || "",
        quiz_id: String(q.quiz_id),
        question_id: q.question_id,
        isUsed: q.isUsed || false,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function getQuestionById(
  id: string
): Promise<QuestionResult | null> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    await connectMongoDB();
    const query = {
      _id: id,
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };
    const question = await Questions.findOne(query).lean();
    console.log(`getQuestionById(${id}) result:`, question ? "Found" : "Not Found");
    if (!question) return null;
    return {
      _id: String(question._id),
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      answer: question.answer,
      explanation: question.explanation || "",
      quiz_id: String(question.quiz_id),
      question_id: question.question_id,
      isUsed: question.isUsed || false,
    };
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return null;
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(error);
    throw new Error("Failed to fetch question: " + message);
  }
}