import { Questions, Quiz } from "@/models/quiz";
import connectMongoDB from "./mongodb";

export const fetchQuizzes = async () => {
  try {
    await connectMongoDB();
    const quizzes = await Quiz.find().lean();
    return quizzes;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Quizzes.");
  }
};

export const fetchQuestions = async (id) => {
  try {
    console.log(id);
    await connectMongoDB();
    const questions = await Questions.find({
      quiz_id: id,
      isUsed: false,
    }).sort({ question_id: 1 }).lean();

    return questions;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching answers");
  }
};
