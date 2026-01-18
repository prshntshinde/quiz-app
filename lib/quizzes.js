import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";
import mongoose from "mongoose";

export async function getAllQuizzes() {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    const quizzes = await Quiz.find();
    return quizzes;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch quizzes.");
  }
}
export async function getQuizById(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    await connectMongoDB();
    const quiz = await Quiz.findById(id);
    return quiz;
  } catch (error) {
    if (error.name === "CastError") {
      return null;
    }
    console.log(error);
    throw new Error("Failed to fetch quiz: " + error.message);
  }
}
