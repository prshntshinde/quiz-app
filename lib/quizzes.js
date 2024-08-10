import connectMongoDB from "@/libs/mongodb";
import { Quiz } from "@/models/quiz";

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
