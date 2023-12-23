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

export const fetchQuestions = async (id) => {
  try {
    //const { id } = params;
    console.log(id);
    connectMongoDB();
    const questions = await Questions.find({
      quiz_id: id,
    }).sort({ question_id: 1 });
    console.log(questions);
    return questions;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching answers");
  }
};
