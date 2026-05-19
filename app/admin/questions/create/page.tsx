import { getAllQuizzes } from "@/lib/quizzes";
import QuestionForm from "./QuestionForm";

interface QuizOption {
  _id: string;
  title: string;
}

export const metadata = {
  title: "Create Question | Quiz App",
};

export default async function CreateQuestionPage() {
  const quizzes = await getAllQuizzes();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Question</h1>
      <QuestionForm quizzes={quizzes} />
    </div>
  );
}