import { Question, Quiz } from "@/models/quiz";
import connectMongoDB from "./mongodb";

export const fetchQuizzes = async () => {
    try {
        connectMongoDB();
        const quizzes = await Quiz.find();
        return quizzes;

    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch Quizzes.")

    }
}

export const fetchQuestions = async () => {
    try {
        //const { id } = params;
        connectMongoDB();
        const answers = await Question.find({quiz_id: "655319ad648c5735c92b553b"});
        return answers;
    } catch (error) {
        console.log(error);
        throw new Error("Error while fetching answers");
    }
}