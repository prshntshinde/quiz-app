import { Quiz } from "@/models/quiz";
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