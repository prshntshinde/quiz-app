import { Questions, Quiz } from "@/models/quiz";
import connectMongoDB from "./mongodb";

export const fetchQuizzes = async () => {
  try {
    connectMongoDB();
    const quizzes = await Quiz.find();
    return quizzes;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Quizzes.");
  }
};

export const fetchQuestions = async () => {
  try {
    //const { id } = params;
    connectMongoDB();
    const questions = await Questions.find({
      quiz_id: "657e92701ab7a0a02c8314fe",
    }).sort({ question_id: 1 });
    console.log(questions);
    return questions;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching answers");
  }
};
