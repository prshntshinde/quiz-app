import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";
import mongoose from "mongoose";

interface HistoryEntry {
  title: string;
  description: string;
  updatedAt: string;
}

interface QuizResult {
  _id: string;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
  history?: HistoryEntry[];
}

function toQuizResult(doc: mongoose.Document): QuizResult {
  const obj = doc.toObject();
  return {
    _id: String(obj._id),
    title: obj.title as string,
    description: obj.description as string,
    isComplete: obj.isComplete as boolean,
    isActive: obj.isActive as boolean,
  };
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

interface GetAllQuizzesResult {
  quizzes: QuizResult[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getQuizCount(): Promise<number> {
  try {
    await connectMongoDB();
    return await Quiz.countDocuments({
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to count quizzes.");
  }
}

export async function getQuizTitles(): Promise<Array<{ _id: string; title: string }>> {
  try {
    await connectMongoDB();
    const docs = await Quiz.find({
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    })
      .select("_id title")
      .sort({ title: 1 })
      .lean();
    return docs.map((d) => ({ _id: String(d._id), title: d.title }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch quiz titles.");
  }
}

export async function getAllQuizzes(): Promise<QuizResult[]> {
  try {
    await connectMongoDB();
    const query = {
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };
    const quizzes = await Quiz.find(query).lean();
    console.log("getAllQuizzes found count:", quizzes.length);
    return quizzes.map((q) => ({
      _id: String(q._id),
      title: q.title,
      description: q.description,
      isComplete: q.isComplete ?? false,
      isActive: q.isActive ?? true,
      history: q.history?.map((h) => ({
        title: h.title as string,
        description: h.description as string,
        updatedAt: String(h.updatedAt),
      })) ?? [],
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch quizzes.");
  }
}

export async function getAllQuizzesPaginated(
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): Promise<GetAllQuizzesResult> {
  try {
    await connectMongoDB();
    const query = {
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };

    const skip = (page - 1) * limit;
    const [quizzes, total] = await Promise.all([
      Quiz.find(query).sort({ createdAt: -1, _id: 1 }).skip(skip).limit(limit).lean(),
      Quiz.countDocuments(query),
    ]);

    return {
      quizzes: quizzes.map((q) => ({
        _id: String(q._id),
        title: q.title,
        description: q.description,
        isComplete: q.isComplete ?? false,
        isActive: q.isActive ?? true,
        history: q.history?.map((h) => ({
          title: h.title as string,
          description: h.description as string,
          updatedAt: String(h.updatedAt),
        })) ?? [],
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch quizzes.");
  }
}

export async function getQuizById(
  id: string
): Promise<QuizResult | null> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    await connectMongoDB();
    const query = {
      _id: id,
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };
    const quiz = await Quiz.findOne(query).lean();
    console.log(`getQuizById(${id}) result:`, quiz ? "Found" : "Not Found");
    if (!quiz) return null;
    return {
      _id: String(quiz._id),
      title: quiz.title,
      description: quiz.description,
      isComplete: quiz.isComplete ?? false,
      isActive: quiz.isActive ?? true,
      history: quiz.history?.map((h) => ({
        title: h.title as string,
        description: h.description as string,
        updatedAt: String(h.updatedAt),
      })) ?? [],
    };
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return null;
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(error);
    throw new Error("Failed to fetch quiz: " + message);
  }
}