import connectMongoDB from "@/libs/mongodb";
import { Quiz, type IQuizDocument } from "@/models/quiz";
import mongoose from "mongoose";

export async function getAllQuizzes(): Promise<IQuizDocument[]> {
  try {
    await connectMongoDB();
    const query = {
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };
    const quizzes = await Quiz.find(query);
    console.log("getAllQuizzes found count:", quizzes.length);
    return quizzes;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch quizzes.");
  }
}

export async function getQuizById(
  id: string
): Promise<IQuizDocument | null> {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    await connectMongoDB();
    const query = {
      _id: id,
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };
    const quiz = await Quiz.findOne(query);
    console.log(`getQuizById(${id}) result:`, quiz ? "Found" : "Not Found");
    return quiz;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return null;
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(error);
    throw new Error("Failed to fetch quiz: " + message);
  }
}