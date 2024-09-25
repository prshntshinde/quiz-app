import connectMongoDB from "@/libs/mongodb";
import { Questions } from "@/models/quiz";

export async function getAllQuestions() {
  try {
    await connectMongoDB();
    const questions = await Questions.find();
    return questions;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch questions");
  }
}
