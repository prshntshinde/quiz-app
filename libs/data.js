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
      quiz_id: "65531a4d648c5735c92b553d",
    }).sort({ question_id: 1 });
    console.log(questions);
    return questions;
  } catch (error) {
    console.log(error);
    throw new Error("Error while fetching answers");
  }
};
