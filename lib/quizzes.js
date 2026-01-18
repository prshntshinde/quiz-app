import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";
import mongoose from "mongoose";

export async function getAllQuizzes() {
  try {
    // Connect to MongoDB
    await connectMongoDB();
    const query = { $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] };
    const quizzes = await Quiz.find(query);
    console.log("getAllQuizzes found count:", quizzes.length);
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
    const query = { _id: id, $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }] };
    const quiz = await Quiz.findOne(query);
    console.log(`getQuizById(${id}) result:`, quiz ? "Found" : "Not Found");
    return quiz;
  } catch (error) {
    if (error.name === "CastError") {
      return null;
    }
    console.log(error);
    throw new Error("Failed to fetch quiz: " + error.message);
  }
}
